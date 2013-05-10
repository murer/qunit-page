(function(t) {

	t.module('FUnitFace');

	t.faceTest("face test raw mode", function(face) {

		face.step('open page').open('./panel.html');

		function selector(path) {
			return function(window, $) {
				var ret = $(path);
				return ret.length ? ret : false;
			}
		}

		face.step('go ajax').wait([ selector('.ajax'), selector('.result') ]).done(function(window, $, link) {
			t.equal($('.result').text(), 'Initial');
			link.click();
		});

		face.step().wait(selector('.result:contains("Count: 1")')).done(function(window, $, result) {
			t.equal(result.text(), 'Count: 1');
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