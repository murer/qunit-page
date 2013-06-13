(function(QUnit, $) {

	function FUnit() {

	}

	function extend(target) {
		if (arguments.length >= 2) {
			for ( var i = 1; i < arguments.length; i++) {
				var arg = arguments[i];
				if (arg) {
					for ( var k in arg) {
						target[k] = arg[k];
					}
				}
			}
		}
		return target;
	}

	function waitFor(wait) {

		if (typeof (wait) == 'function') {
			return waitFor([ wait ]);
		}

		function check(entry) {
			for ( var i = 0; i < entry.wait.length; i++) {
				if (!entry.wait[i]()) {
					return false;
				}
			}
			return true;
		}

		function makeWait(entry) {
			var time = entry._time - (new Date().getTime() - entry.init);
			if (time >= 0 && !check(entry)) {
				if (!entry.stopped) {
					QUnit.stop();
					entry.stopped = true;
				}
				setTimeout(function() {
					makeWait(entry);
				}, 1);
				return;
			}
			if (entry.stopped) {
				QUnit.start();
			}
			if (time < 0) {
				entry._timeout();
				return;
			}
			entry._done();
		}

		return {
			wait : wait,
			done : function(callback) {
				this._done = callback;
				this.init = new Date().getTime();
				this._timeout = this._timeout || function() {
					throw 'timeout';
				}
				this._time = this._time || 5000;
				makeWait(this);
				return this;
			},
			timeout : function(callback, time) {
				if (typeof (callback) == 'number') {
					time = callback;
					callback = null;
				}
				this._timeout = callback;
				this._time = time;
				return this;
			}
		};
	}

	function getAllDeps(page, deps) {
		function prepareDep(dep) {
			if (typeof (dep) == 'string') {
				return function() {
					var $ = page.global('jQuery');
					if (!$) {
						return null;
					}
					var ret = $(dep);
					return !ret.length ? null : ret;
				};
			}
			return dep;
		}
		var ret = [];
		for ( var i = 0; i < deps.length; i++) {
			var dep = deps[i];
			dep = prepareDep(dep);
			ret[i] = dep();
			if (!ret[i]) {
				return ret;
			}
		}
		return ret;
	}

	function prepareStep(page, name, deps, func) {
		if (!func) {
			if (!deps) {
				throw 'step function is required';
			}
			return prepareStep(page, name, [], deps);
		}
		return {
			name : name,
			func : function() {
				var objs = [];
				if (deps.length) {
					var objs = getAllDeps(page, deps);
					for ( var i = 0; i < objs.length; i++) {
						if (!objs[i]) {
							return page.retry();
						}
					}
				}
				func.apply(this, objs);
			}
		}
	}

	function waitReady(page) {
		return function() {
			if (!page.loaded) {
				return page.retry();
			}
			var $ = page.global('jQuery');
			if (!$) {
				return page.retry();
			}
			if (!$.isReady) {
				return page.retry();
			}
			if (!page.window().ready) {
				return page.retry();
			}
		}
	}

	function Page() {
		this.steps = [];
	}

	Page.befores = [];
	Page.before = function(before) {
		Page.befores.push(function() {
			before(QUnit.page);
		});
	}

	Page.fn = Page.prototype;
	extend(Page.prototype, {
		step : function(name, deps, func) {
			this.steps.push(prepareStep(this, name, deps, func));
		},
		stop : function() {
			this._stop = true;
		},
		start : function() {
			this._stop = false;
			QUnit.start();
			executeTest(this);
		},
		intervane : function(step) {
			this.steps.unshift({
				func : step
			});
		},
		fixture : function() {
			return $('#qunit-fixture');
		},
		frame : function() {
			return this.fixture().find('iframe');
		},
		window : function() {
			return this.frame()[0].contentWindow;
		},
		retry : function() {
			this._retry = true;
		},
		global : function(name) {
			var window = this.window();
			if (name == 'window') {
				return window;
			}
			return window[name];
		},
		open : function(url) {
			(function(page) {
				page.step('open', function() {
					page.loaded = false;
					page.window().location = url;
					page.intervane(waitReady(page));
				});
			})(this);
		},
		click : function(element) {
			element = $(element)
			if (!element.length) {
				throw 'no element to click';
			}
			element = element[0];
			var document = element.ownerDocument;
			if (document.dispatchEvent) { // W3C
				var oEvent = document.createEvent("MouseEvents");
				oEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, element);
				element.dispatchEvent(oEvent);
			} else if (document.fireEvent) { // IE
				element.click();
			}
		}
	});

	function executeTest(page) {
		if (!page.steps.length) {
			return;
		}
		var step = page.steps.shift();
		page._retry = false;
		step.func(page);
		if (page._stop) {
			QUnit.stop();
			return;
		}
		if (page._retry) {
			page.steps.unshift(step);
		}
		setTimeout(function() {
			QUnit.start();
			executeTest(page);
		}, 1);
		QUnit.stop();
	}

	function prepareFrame(page) {
		page.fixture().html('<iframe />');
		page.frame().bind('load', function() {
			page.loaded = true;
			$(page.window()).bind('unload', function() {
				page.loaded = false;
				page.intervane(waitReady(page));
			});
		});
	}

	function prepareBefore(page) {
		for ( var i = 0; i < Page.befores.length; i++) {
			page.step('before', Page.befores[i]);
		}
	}

	function pageTest(name, func) {
		QUnit.test(name, function() {
			var page = new Page();
			QUnit.page = page;
			page.name = name;
			prepareFrame(page);
			prepareBefore(page);
			func(page);
			executeTest(page);
		});
	}

	QUnit.pageTest = pageTest;
	QUnit.waitFor = waitFor;
	QUnit.Page = Page;

	return QUnit;

})(QUnit, jQuery);
