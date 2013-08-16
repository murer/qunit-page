(function(t, $) {

	t.module('QUnitPage POC');

	t.test("simple", function() {
		t.equal(1, 1);
	});

	t.test("ajax", function() {
		var called = false;
		t.stop();
		$.get('test.html', function() {
			t.start();
			var called = true;
			t.ok(called);
		});
	});

	t.test("setTimeout", function() {
		var called = false;
		t.stop();
		setTimeout(function() {
			t.start();
			var called = true;
			t.ok(called);
		}, 1);
	});

})(QUnit, jQuery);