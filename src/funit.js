(function(t, $) {

	function waitFor(wait) {
		
		if(typeof(wait) == 'function') {
			return waitFor([wait]);
		}
		
		function check(entry) {
			for(var i = 0; i < entry.wait.length; i++) {
				if(!entry.wait[i]()) {
					return false;
				}
			}
			return true;
		}

		function makeWait(entry) {
			var time = entry._time - (new Date().getTime() - entry.init);
			if (time >= 0 && !check(entry)) {
				if (!entry.stopped) {
					t.stop();
					entry.stopped = true;
				}
				setTimeout(function() {
					makeWait(entry);
				}, 1);
				return;
			}
			if (entry.stopped) {
				t.start();
			}
			if(time < 0) {
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
				if(typeof(callback) == 'number') {
					time = callback;
					callback = null;
				}
				this._timeout = callback;
				this._time = time;
				return this;
			}
		};
	}

//	function toArray(array) {
//		var ret = [];
//		for ( var i = 0; i < array.length; i++) {
//			ret[i] = array[i];
//		}
//		return ret;
//	}
//
//	function prepareOpen(url) {
//		return function(finish) {
//			$('#frame').attr('src', url);
//			waitFor(function() {
//				var frame = $('#frame');
//				return frame.length && frame[0].contentWindow
//						&& frame[0].contentWindow.jQuery;
//			}, function() {
//				makeCall(function(w, $) {
//					$(w.document).click(function(evt) {
//						var target = $(evt.target);
//						if (target.is('a[href]')) {
//							var href = target.attr('href');
//							w.location = '' + w.location.pathname + href;
//						}
//					});
//					finish();
//				});
//			});
//		}
//	}
//
//	function convertWait(p) {
//		if (typeof (p) == 'string') {
//			return function() {
//				var frame = $('#frame');
//				return frame.length && frame[0].contentWindow
//						&& frame[0].contentWindow.jQuery
//						&& frame[0].contentWindow.jQuery(p).length;
//			}
//		}
//		return p;
//	}
//
//	function makeCall(f) {
//		var _window = $("#frame")[0].contentWindow;
//		var _$ = _window.jQuery;
//		f.call(_window, _window, _$);
//	}
//
//	function prepareStep(args) {
//		return function(finish) {
//			var w = null;
//			var f = null;
//			if (args.length == 1 && args[0].call) {
//				f = args[0];
//			}
//			if (args.length == 2) {
//				w = args[0];
//				f = args[1];
//			}
//			if (!w) {
//				makeCall(f);
//				finish();
//				return;
//			}
//			w = convertWait(w);
//			waitFor(w, function() {
//				makeCall(f);
//				finish();
//			});
//		}
//	}
//
//	function prepareSteps(steps, fn) {
//		fn(function(url) {
//			steps.push(prepareOpen(url));
//		}, function() {
//			steps.push(prepareStep(toArray(arguments)));
//		});
//		return steps;
//	}
//
//	function consume(steps) {
//		if (!steps.length) {
//			return;
//		}
//		var step = steps.shift();
//		step(function() {
//			consume(steps);
//		});
//	}
//
//	function createTest(steps) {
//		$('#qunit-fixture').html('<iframe id="frame"></iframe>');
//		consume(steps);
//	}
//
//	function pageTest(name, fn) {
//		var steps = prepareSteps([], fn);
//		test(name, function() {
//			createTest(steps)
//		});
//	}
//
//	t.pageTest = pageTest;
	t.waitFor = waitFor;

	return t;
	
})(QUnit, jQuery);
