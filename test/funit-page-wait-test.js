(function(t) {

	t.module('FUnitWaitPace');

	t.pageTest("page ajax raw mode", function(page) {

		page.open('panel.html');

		page.step('clicking ajax', [ '.ajax' ], function(link) {
			link.click();
		});

		page.step('check count 1', [ '.result:contains("Count: 1")' ], function(result) {
			t.equal(result.text(), 'Count: 1');
		});

		page.step('clicking ajax again', [ '.ajax', '.result' ], function(link, result) {
			link.click();
			t.equal(result.text(), 'Loading');
		});

		page.step('checking count 2', [ '.result:not(:contains("Loading"))' ], function(result) {
			t.equal(result.text(), 'Count: 2');
		});

	});

})(QUnit);