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
					if(!$) {
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

	function Page() {
		this.steps = [];
	}
	extend(Page.prototype, {
	    step : function(name, deps, func) {
		    this.steps.push(prepareStep(this, name, deps, func));
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
		    this.loaded = false;
		    this.window().location = url;
		    (function(page) {
			    page.steps.unshift({
				    func : function() {
					    if (!page.loaded) {
						    return page.retry();
					    }
					    var $ = page.global('jQuery');
					    if (!$) {
						    return page.retry();
					    }
				    }
			    })
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
		});
	}

	function pageTest(name, func) {
		QUnit.test(name, function() {
			var page = new Page();
			page.name = name;
			prepareFrame(page);
			func(page);
			executeTest(page);
		});
	}

	// function toArray(array) {
	// var ret = [];
	// for ( var i = 0; i < array.length; i++) {
	// ret[i] = array[i];
	// }
	// return ret;
	// }
	//
	// function prepareOpen(url) {
	// return function(finish) {
	// $('#frame').attr('src', url);
	// waitFor(function() {
	// var frame = $('#frame');
	// return frame.length && frame[0].contentWindow
	// && frame[0].contentWindow.jQuery;
	// }, function() {
	// makeCall(function(w, $) {
	// $(w.document).click(function(evt) {
	// var target = $(evt.target);
	// if (target.is('a[href]')) {
	// var href = target.attr('href');
	// w.location = '' + w.location.pathname + href;
	// }
	// });
	// finish();
	// });
	// });
	// }
	// }
	//
	// function convertWait(p) {
	// if (typeof (p) == 'string') {
	// return function() {
	// var frame = $('#frame');
	// return frame.length && frame[0].contentWindow
	// && frame[0].contentWindow.jQuery
	// && frame[0].contentWindow.jQuery(p).length;
	// }
	// }
	// return p;
	// }
	//
	// function makeCall(f) {
	// var _window = $("#frame")[0].contentWindow;
	// var _$ = _window.jQuery;
	// f.call(_window, _window, _$);
	// }
	//
	// function prepareStep(args) {
	// return function(finish) {
	// var w = null;
	// var f = null;
	// if (args.length == 1 && args[0].call) {
	// f = args[0];
	// }
	// if (args.length == 2) {
	// w = args[0];
	// f = args[1];
	// }
	// if (!w) {
	// makeCall(f);
	// finish();
	// return;
	// }
	// w = convertWait(w);
	// waitFor(w, function() {
	// makeCall(f);
	// finish();
	// });
	// }
	// }
	//
	// function prepareSteps(steps, fn) {
	// fn(function(url) {
	// steps.push(prepareOpen(url));
	// }, function() {
	// steps.push(prepareStep(toArray(arguments)));
	// });
	// return steps;
	// }
	//
	// function consume(steps) {
	// if (!steps.length) {
	// return;
	// }
	// var step = steps.shift();
	// step(function() {
	// consume(steps);
	// });
	// }
	//
	// function createTest(steps) {
	// $('#qunit-fixture').html('<iframe id="frame"></iframe>');
	// consume(steps);
	// }
	//
	// function pageTest(name, fn) {
	// var steps = prepareSteps([], fn);
	// test(name, function() {
	// createTest(steps)
	// });
	// }
	//
	QUnit.pageTest = pageTest;
	QUnit.waitFor = waitFor;
	QUnit.Page = Page;

	return QUnit;

})(QUnit, jQuery);
