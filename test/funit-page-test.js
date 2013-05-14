(function(t) {

	t.module('FUnitPage');

	t.pageTest("page ajax raw mode", function(page) {

		page.open('panel.html');

		page.step('wait things', function() {
			var $ = page.global('jQuery');
			if (!$ || !$('.ajax').length) {
				return page.retry();
			}
		});

		page.step('clicking ajax', function() {
			var $ = page.global('jQuery');
			if (!$ || !$('.ajax').length) {
				return page.retry();
			}
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
			if (!$ || $('h1').text() != 'Other') {
				return page.retry();
			}
			t.equal($('h1').text(), 'Other');
			page.click($('.panel'));
		});

		page.step('checking panel', function() {
			var $ = page.global('jQuery');
			if (!$ || $('h1').text() != 'Panel') {
				return page.retry();
			}
			t.equal($('h1').text(), 'Panel');
		});

	});

})(QUnit);