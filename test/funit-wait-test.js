(function(t) {

	t.module('FUnit Wait');

	t.test("test wait", 2, function() {
		var check = false;
		setTimeout(function() {
			check = true;
		}, 1);
		t.ok(!check, 'check is false before waiting');
		t.waitFor(function() {
			return check;
		}).done(function() {
			t.ok(check, 'check is true after waiting');
		});
	});
	
	t.test("test wait timeout with function and time", 2, function() {
		var check = false;
		setTimeout(function() {
			check = true;
		}, 100);
		t.ok(!check, 'check is false before waiting');
		t.waitFor(function() {
			return check;
		}).timeout(function() {
			t.ok(true, 'timeout is expected');
		}, 5).done(function() {
			t.ok(false, 'it should never be called');
		});
	});
	
})(QUnit);