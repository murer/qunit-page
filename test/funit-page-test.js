(function(t) {

	t.module('FUnitFace');

	t.pageTest("step flow", function(page) {

		var steps = [];

		page.step('step a', function() {
			steps.push('a');
			page.step('step c', function() {
				steps.push('c');
				t.deepEqual(steps, [ 'a', 'b', 'c' ]);
			});
		});

		page.step('step b', function() {
			steps.push('b');
		});

		page.step('step assert', function() {
			t.deepEqual(steps, [ 'a', 'b' ]);
		});

	});

	t.pageTest("step retry", function(page) {

		var steps = [];

		page.step('step a', function() {
			steps.push('a');
		});

		var count = 0;
		page.step('step b', function() {
			steps.push('b' + count);
			if (count++ < 2) {
				page.retry();
			}
		});

		page.step('step c', function() {
			steps.push('c');
		});

		page.step('step assert', function() {
			t.deepEqual(steps, [ 'a', 'b0', 'b1', 'b2', 'c' ]);
		});

	});

	t.pageTest("step iframe prepare", function(page) {
		equal(page.fixture().find('iframe').length, 1);
		equal(page.frame().length, 1);
	});

	t.pageTest("face test raw mode", function(page) {
		function selector(path) {
			var ret = page.$(path);
			return ret.length ? ret : false;
		}

		function global(name) {
			var window = page.window();
			if (name == 'window') {
				return window;
			}
			return window[name];
		}

		page.step('open url', function() {
			page.window().location = 'panel.html';
		});

		page.step('wait things', function() {
			var $ = global('jQuery');
			if (!$) {
				return page.retry();
			}
			if (!$('.ajax').length) {
				return page.retry();
			}
		});

		page.step('click', function() {
			var $ = global('jQuery');
			$('.ajax').click();
			t.equal($('.result').text(), 'Loading');
		});

		page.step('click', function() {
			var $ = global('jQuery');
			var text = $('.result').text();
			if(text == 'Loading') {
				return page.retry();
			}
			t.equal(text, 'Count: 1');
		});

		page.step('click', function() {
			var $ = global('jQuery');
			$('.ajax').click();
			t.equal($('.result').text(), 'Loading');
		});

		page.step('click', function() {
			var $ = global('jQuery');
			var text = $('.result').text();
			if(text == 'Loading') {
				return page.retry();
			}
			t.equal(text, 'Count: 2');
		});

	});

	// t.faceTest("face test soft mode", function(face) {
	//
	// face.step('open page').open('./panel.html');
	//
	// face.step('go ajax').wait([ '.ajax', '.result' ]).done(function(window,
	// $, link, result) {
	// t.equal(result.text(), 'Initial');
	// link.click();
	// });
	//
	// face.step().wait('.result:contains("Count: 1")').done(function(window, $,
	// result) {
	// t.equal(result.text(), 'Count: 1');
	// });
	//
	// });

})(QUnit);