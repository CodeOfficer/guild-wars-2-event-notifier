//= require_self
//= require_tree ./app/

// FastClick is a simple, easy-to-use library for eliminating the 300ms delay between a physical
// tap and the firing of a click event on mobile browsers. The aim is to make your application
// feel less laggy and more responsive while avoiding any interference with your current logic.
window.addEventListener('load', function() {
  new FastClick(document.body);
}, false);


App = Ember.Application.create({
  LOG_TRANSITIONS: true,

  rootElement: '#app'
});


App.Router.map(function(){
  this.resource('worlds', function() {
    this.route('world', {path: ':world_id'});
  });
});


App.JSONSerializer = DS.JSONSerializer.extend({
  // Our GW2 api does not return a root node.
  // Removed calls to sideload and replace calls of 'json[root]'' with 'json'
  extractMany: function(loader, json, type, records) {
    var root = this.rootForType(type);
    root = this.pluralize(root);

    this.extractMeta(loader, type, json);

    if (json) {
      var objects = json, references = [];
      if (records) { records = records.toArray(); }

      for (var i = 0; i < objects.length; i++) {
        if (records) { loader.updateId(records[i], objects[i]); }
        var reference = this.extractRecordRepresentation(loader, type, objects[i]);
        references.push(reference);
      }

      loader.populateArray(references);
    }
  }
});


App.RESTAdapter = DS.RESTAdapter.extend({
  serializer: App.JSONSerializer.create(),

  url: 'https://api.guildwars2.com',

  namespace: 'v1',

  buildURL: function(record, suffix) {
    return this._super(record, suffix) + ".json";
  }
});


App.RESTAdapter.configure('plurals', {
  world: 'world_names'
});


App.Store = DS.Store.extend({
  revision: 13,

  adapter: App.RESTAdapter.create()
});

