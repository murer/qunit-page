(function(t) {

	t.module('FUnitWaitPace');

	t.pageTest("page ajax raw mode", function(page) {

		page.open('panel.html');

		page.step('clicking ajax', function() {
			var $ = page.global('jQuery');
			if (!$ || !$('.ajax').length) {
				return page.retry();
			}
			console.info('clicking');
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

})(QUnit);