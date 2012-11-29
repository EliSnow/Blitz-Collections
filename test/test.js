(function () {
	test("WeakMap API", 18, function () {
		var key = {},
			key2 = Object.create(null),
			key3 = Object.seal({}),
			key4 = Object.freeze({}),
			key5 = {},
			value = "",
			value2 = 42,
			value3 = {},
			value4 = /./,
			value5 = new XMLHttpRequest,
			value3_2 = new Error,
			wm = blitz.WeakMap();
			
		Object.defineProperty(key5, "constructor", {
			value : undefined
		});
		
		wm.set(key, value);
		wm.set(key2, value2);
		wm.set(key3, value3);
		wm.set(key4, value4);
		wm.set(key5, value5);
		
		strictEqual(wm.get(key), value, "Can retrieve the set value - 1");
		strictEqual(wm.get(key2), value2, "Can retrieve the set value - 2");
		strictEqual(wm.get(key3), value3, "Can retrieve the set value - 3");
		strictEqual(wm.get(key4), value4, "Can retrieve the set value - 4");
		strictEqual(wm.get(key5), value5, "Can retrieve the set value - 5");
		
		ok(wm.has(key), "'has' returns true for the set value - 1");
		ok(wm.has(key2), "'has' returns true for the set value - 2");
		ok(wm.has(key3), "'has' returns true for the set value - 3");
		ok(wm.has(key4), "'has' returns true for the set value - 4");
		ok(wm.has(key5), "'has' returns true for the set value - 5");
		
		wm.delete(key4);
		
		ok(!wm.has(key4), "'has' returns false for the deleted value");
		strictEqual(wm.get(key4), undefined, "Deleted key no longer has a value");
		strictEqual(wm.get(value3), undefined, "Unbound object does not have a value");
		
		wm.set(key3, value3_2);
		
		strictEqual(wm.get(key3), value3_2, "Overwritten key has new value" );
		
		wm.clear();
		
		ok(!wm.has(key), "'has' returns false after 'clear' - 1");
		ok(!wm.has(key2), "'has' returns false after 'clear' - 2");
		ok(!wm.has(key3), "'has' returns false after 'clear' - 3");
		ok(!wm.has(key5), "'has' returns false after 'clear' - 4");
	});
	
	test("Map API", 42, function () {
		var key = {},
			key2 = Object.create(null),
			key3 = Object.seal({}),
			key4 = Object.freeze({}),
			key5 = {},
			value = "",
			value2 = 42,
			value3 = {},
			value4 = /./,
			value5 = new XMLHttpRequest,
			value6 = "primitive key works",
			value3_2 = new Error,
			map = blitz.Map();
			
		Object.defineProperty(key5, "constructor", {
			value : undefined
		});
		
		map.set(key, value);
		map.set(key2, value2);
		map.set(key3, value3);
		map.set(key4, value4);
		map.set(key5, value5);
		map.set(undefined, value6);
		map.set(456, value6);
		
		strictEqual(map.size, 7, "'size' returns correct number - 1");
		
		strictEqual(map.get(key), value, "Can retrieve the set value - 1");
		strictEqual(map.get(key2), value2, "Can retrieve the set value - 2");
		strictEqual(map.get(key3), value3, "Can retrieve the set value - 3");
		strictEqual(map.get(key4), value4, "Can retrieve the set value - 4");
		strictEqual(map.get(key5), value5, "Can retrieve the set value - 5");
		strictEqual(map.get(undefined), value6, "Can retrieve the set value (primimtive) - 1");
		strictEqual(map.get(456), value6, "Can retrieve the set value (primimtive) - 2");
		
		ok(map.has(key), "'has' returns true for the set value - 1");
		ok(map.has(key2), "'has' returns true for the set value - 2");
		ok(map.has(key3), "'has' returns true for the set value - 3");
		ok(map.has(key4), "'has' returns true for the set value - 4");
		ok(map.has(key5), "'has' returns true for the set value - 5");
		ok(map.has(undefined), "'has' returns true for the set value (primimtive) - 1");
		ok(map.has(456), "'has' returns true for the set value (primimtive) - 2");
		
		map.delete(key4);
		
		strictEqual(map.size, 6, "'size' returns correct number - 2");
		
		ok(!map.has(key4), "'has' returns false for the deleted value");
		strictEqual(map.get(key4), undefined, "Deleted key no longer has a value");
		
		var i = 0;
		map.forEach(function (v, k, m) {
			strictEqual(m, map, "Third parameter in 'forEach' callback is equal to the map");
			switch (i++) {
				case 0 :
					strictEqual(v, value, "First parameter in 'forEach' callback matches the proper value");
					strictEqual(k, key, "Second parameter in 'forEach' callback matches the proper key");
					break;
				case 1 : 
					strictEqual(v, value2, "First parameter in 'forEach' callback matches the proper value");
					strictEqual(k, key2, "Second parameter in 'forEach' callback matches the proper key");
					break;
				case 2 : 
					strictEqual(v, value3, "First parameter in 'forEach' callback matches the proper value");
					strictEqual(k, key3, "Second parameter in 'forEach' callback matches the proper key");
					break;
				case 3 : 
					strictEqual(v, value5, "First parameter in 'forEach' callback matches the proper value");
					strictEqual(k, key5, "Second parameter in 'forEach' callback matches the proper key");
					break;
				case 4 :
					strictEqual(v, value6, "First parameter in 'forEach' callback matches the proper value");
					strictEqual(k, undefined, "Second parameter in 'forEach' callback matches the proper key");
					break;
				case 5 :
					strictEqual(v, value6, "First parameter in 'forEach' callback matches the proper value");
					strictEqual(k, 456, "Second parameter in 'forEach' callback matches the proper key");
					break;
				default : 
					ok(false, "'forEach' should only iterate through 4 entries");
			}
		});
		
		strictEqual(map.get(value3), undefined, "Unbound object does not have a value");
		
		map.set(key3, value3_2);
		
		strictEqual(map.get(key3), value3_2, "Overwritten key has new value" );
		
		map.clear();
		
		ok(!map.has(key), "'has' returns false after 'clear' - 1");
		ok(!map.has(key2), "'has' returns false after 'clear' - 2");
		ok(!map.has(key3), "'has' returns false after 'clear' - 3");
		ok(!map.has(key5), "'has' returns false after 'clear' - 4");
	});
	
	test("Set API", 25, function () {
		var i = 0,
			set = blitz.Set(),
			item1 = "hi",
			item2 = "bye",
			item3 = {},
			item4 = {},
			item5 = Object.freeze({}),
			item6 = -0,
			item7 = 0,
			item8 = NaN;
			
		set.add(item1);
		set.add(item2);
		set.add(item3);
		set.add(item4);
		set.add(item5);
		set.add(item6);
		set.add(item7);
		set.add(item8);
		
		equal(set.size, 8, "Set 'size' is correct");
		
		set.add(item1);
		set.add(item2);
		set.add(item3);
		set.add(item4);
		set.add(item5);
		set.add(item6);
		set.add(item7);
		set.add(item8);
		
		equal(set.size, 8, "Set 'size' is correct. Repeats are not stored.");
		
		ok(set.has(item1), "Set has item - 1");
		ok(set.has(item2), "Set has item - 2");
		ok(set.has(item3), "Set has item - 3");
		ok(set.has(item4), "Set has item - 4");
		ok(set.has(item5), "Set has item - 5");
		
		ok(!set.has(undefined), "Set does not have item");
		
		set.forEach(function(item, s) {
			strictEqual(set, s, "'forEach' first argument is correct");
			switch (i++) {
				case 0 :
					strictEqual(item1, item, "'forEach' second argument is correct - 1");
					break;
				case 1 :
					strictEqual(item2, item, "'forEach' second argument is correct - 2");
					break;
				case 2 :
					strictEqual(item3, item, "'forEach' second argument is correct - 3");
					break;
				case 3 :
					strictEqual(item4, item, "'forEach' second argument is correct - 4");
					break;
				case 4 :
					strictEqual(item5, item, "'forEach' second argument is correct - 5");
					break;
				case 5 :
					strictEqual(-Infinity, 1 / item, "'forEach' second argument is correct - 6");
					break;
				case 6 :
					strictEqual(Infinity, 1 / item, "'forEach' second argument is correct - 7");
					break;
				case 7 :
					ok(item != item, "'forEach' second argument is correct - 8");
					break;
				default :
					ok(false, "'forEach' called too many times");
			}
		});
		
		set.clear();
		
		equal(set.size, 0, "Set 'size' is correct after clear");		
		
	});
}());