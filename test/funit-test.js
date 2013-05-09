(function(t) {
	
	t.module('FUnit');

	t.test("hello test", function() {
		t.ok(1 == "1", "Passed!");
	});
	
})(QUnit);