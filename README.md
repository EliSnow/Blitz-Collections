#Blitz-Collections

##Questions
###What is Blitz-Collections?
Blitz-Collections provides ECMAScript 6 (aka ECMAScript Harmony aka ECMAScript
Next) collections to ECMAScript 5 compliant environments. This includes `Map`,
`WeakMap` and `Set`.

###Are the WeakMaps really weak?
Mostly. Due to the way Blitz-Collections work and the limitations of
ECMAScript 5, `WeakMap`s do not keep any object references unless the object is
sealed or the `constructor` property is non-configurable. I suspect that objects
meeting one of these two criteria will be rare. Note that these references are
lost when a `WeakMap`'s `clear` method is called.

###There are other polyfills that do this. How is this one different?
I have come across two other attempts to provide these collections and, like
the motivation for starting so many projects, I was not completely satisfied.
One attempt entirely relied upon two sets of arrays to simulate `Map` and
`WeakMap` and consequently was slow and not even remotely weak. The other
attempt uses a similar approach to what I have taken by adding a non-enumerable
property to objects. What I found unfortunate was that it then tries to conceal
the new property by hijacking methods such as `Object.getOwnPropertyNames` among
others.

As far as I have been able to come up with there are only two ways to create a
`Map` in ECMAScript 5 (or older) environments:

1. Use two arrays, one for the keys and the other for the values. This works
just fine for `Map`s (though it will be slow, depending on the size extremely
slow) but it cannot be used for `WeakMap`s.
2. Add properties onto objects which hold their associated values. The issue
with this method is it adds "unnatural" properties on objects, it cannot be
done on sealed objects (you have to fall back to method one) and an object's
associated value could be modified outside the scope of the Map.
	
For the speed benefit and also to have a mostly functioning `WeakMap` I opted
for method two. To alleviate the issues with that method, Blitz-Collections uses
the `constructor` property and does not add values directly to the property but
adds them to the property's `get` descriptor. This "hides" any values the object
may be associated with, virtually eliminates accidental manipulation and
_almost_ seems "natural."

##API

This script exposes the three collection constructors under the `blitz` object:
`blitz.Map`, `blitz.WeakMap` and `blitz.Set`.

API coming soon. In the meantime check out the [current working draft for 
ES.Next](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts) to
see the draft API for `Map`, `WeakMap` and `Set` (it should be the same--if not
please create an issue).