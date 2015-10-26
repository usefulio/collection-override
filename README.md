# Override the Default Server-Side Collection Operations

__Installation__ 

`meteor add useful:collection-override`

__Usage__

```js
Foods = new Mongo.Collection('foods');

if(Meteor.isServer){
	// only available on the server
	CollectionOverride(Foods, {
		insert: function(doc) {
		  // perform some manipulation or do auth checking
		  return Foods.insert(doc);
		}
		, update: function(selector, modifier, options) {
		  // perform some manipulation or do auth checking
		  return Foods.update(selector, modifier, options);
		}
		, remove: function(selector) {
		  // perform some manipulation or do auth checking
		  return Foods.remove(selector);
		}
	})

}
```

In case you need/want to run the original, official meteor generated methods, they
are available to you on the collection you overrode via the `originalMethods` property.

E.g.

```
// if I do...
Animals = new Mongo.Collection('animals');

CollectionOverride(Animals, {
	insert: function(doc) {
		// the original "/animals/insert" method is available to me via
		// `Animals.originalMethods.insert`, so I can do whatever I'd like
		// ... and then if I need to
		return Animals.originalMethods.insert.apply(this, arguments);
	}
});

```

### Why you might care.

The main purpose of this package is to allow the use of custom validation
or document creation logic on your server, where you can trust it,
while still keeping the same simple `Collection.insert/update/remove` interface
on the client-side, or if you're using something like `jagi:astronomy`, the ability 
to call `model.save()` and have all hooks/validation run...

in both cases, without needing to create new `Meteor.methods` and call them explicitly.