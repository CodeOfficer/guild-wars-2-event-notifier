
App.JSONSerializer = DS.JSONSerializer.extend({

  // Our GW2 api sometimes does not return a root node. In those cases we
  // remove calls to sideload and replace calls of 'json[root]'' with 'json'
  extractMany: function(loader, json, type, records) {
    var root = this.rootForType(type);
    root = this.pluralize(root);

    this.extractMeta(loader, type, json);

    if (json[root]) {
      var objects = json[root], references = [];
      if (records) { records = records.toArray(); }

      for (var i = 0; i < objects.length; i++) {
        if (records) { loader.updateId(records[i], objects[i]); }
        var reference = this.extractRecordRepresentation(loader, type, objects[i]);
        references.push(reference);
      }

      loader.populateArray(references);
    } else {
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

App.RESTAdapter.map('App.Event', {
  eventName: {key: 'event_id'},
  mapName: {key: 'map_id'},
  worldName: {key: 'world_id'}
});

App.Store = DS.Store.extend({
  adapter: App.RESTAdapter.create()
});

App.Store.registerAdapter('App.Setting', DS.LSAdapter.extend());
