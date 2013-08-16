(function(t) {

	t.module('QUnitPage Wait Test');

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
	
	t.test("test wait with array", 4, function() {
		var first = false;
		var second = false;
		setTimeout(function() {
			first = true;
			setTimeout(function() {
				second = true;
			}, 1);
		}, 1);
		t.ok(!first, 'first is false before waiting');
		t.ok(!second, 'second is false before waiting');
		t.waitFor([function() {
			return first;
		}, function() {
			return second;
		}]).done(function() {
			t.ok(first, 'first is true before waiting');
			t.ok(second, 'second is true before waiting');
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