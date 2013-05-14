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

	t.pageTest("page ajax raw mode", function(page) {

		page.step('open url', function() {
			page.window().location = 'panel.html';
		});

		page.step('wait things', function() {
			var $ = page.global('jQuery');
			if (!$ || !$('.ajax').length) {
				return page.retry();
			}
		});

		page.step('clicking ajax', function() {
			var $ = page.global('jQuery');
			$('.ajax').click();
		});

		page.step('check count 1', function() {
			var $ = page.global('jQuery');
			var text = $('.result').text();
			if (text != 'Count: 1') {
				return page.retry();
			}
			t.equal(text, 'Count: 1');
		});

		page.step('clicking ajax again', function() {
			var $ = page.global('jQuery');
			$('.ajax').click();
			t.equal($('.result').text(), 'Loading');
		});

		page.step('checking count 2', function() {
			var $ = page.global('jQuery');
			var text = $('.result').text();
			if (text == 'Loading') {
				return page.retry();
			}
			t.equal(text, 'Count: 2');
		});

	});

	t.pageTest("page link test", function(page) {

		page.step('open url', function() {
			page.window().location = 'panel.html';
		});

		page.step('wait things', function() {
			var $ = page.global('jQuery');
			if (!$ || !$('.other').length) {
				return page.retry();
			}
		});

		page.step('clicking link', function() {
			var $ = page.global('jQuery');
			var document = page.global('document');
			page.click($('.other'));
		});
		
		page.step('checking other', function() {
			var $ = page.global('jQuery');
			if(!$ || $('h1').text() != 'Other') {
				return page.retry();
			}
			t.equal($('h1').text(), 'Other');
			page.click($('.panel'));
		});
		
		page.step('checking panel', function() {
			var $ = page.global('jQuery');
			if(!$ || $('h1').text() != 'Panel') {
				return page.retry();
			}
			t.equal($('h1').text(), 'Panel');
		});
		
	});

})(QUnit);