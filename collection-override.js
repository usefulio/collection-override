function methodName(collection, operation) {
	return "/" + collection._name + "/" + operation;
}

CollectionOverride = function(collection, options) {
	var methods = Meteor.server.method_handlers;
	collection.originalMethods = {};

	_.each(['insert', 'update', 'remove'], function(operation){
		if(options[operation]){
			collection.originalMethods[operation] = methods[methodName(collection, operation)];
			methods[methodName(collection, operation)] = options[operation];
		}
	});
};