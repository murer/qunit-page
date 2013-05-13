(function(t) {

	t.module('FUnitFace');

	t.pageTest("step flow", function(page) {

		var steps = [];

		page.step('step a', function() {
			steps.push('a');
			page.step('step c', function() {
				steps.push('c');
				t.deepEqual(steps, [ 'a', 'b', 'c' ]);
			})
		});

		page.step('step b', function() {
			steps.push('b');
		});

		page.step('step assert', function() {
			t.deepEqual(steps, [ 'a', 'b' ]);
		});

	});
	
	t.pageTest("step iframe prepare", function(page) {
		equal(page.fixture().find('iframe').length, 1);
		equal(page.frame().length, 1);
	});

	// t.pageTest("face test raw mode", function(face) {

	// function selector(path) {
	// return function() {
	// var ret = face.$(path);
	// return ret.length ? ret : false;
	// }
	// }

	// face.step('open url', function() {
	// face.window.location = 'panel.html';
	// });

	// face.step([ selector('.ajax'), selector('.result') ]).done(function(link)
	// {
	// t.equal(face.$('.result').text(), 'Initial');
	// link.click();
	// });
	//
	// face.step(selector('.result:contains("Count: 1")')).done(function(result)
	// {
	// t.equal(result.text(), 'Count: 1');
	// });

	// });

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