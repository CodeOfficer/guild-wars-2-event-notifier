
App.JSONSerializer = DS.JSONSerializer.extend({

  // Our GW2 api does not sideload and returns some really shittastic up json
  extract: function(loader, json, type, record) {
    var root = this.rootForType(type);

    this.extractMeta(loader, type, json);

    if (json[root]) {
      if (record) { loader.updateId(record, json[root]); }
      this.extractRecordRepresentation(loader, type, json[root]);
    } else {
      // Ember.Logger.warn("Extract requested, but no data given for " + type + ". This may cause weird problems.");

      if (type === App.EventDetail) {
        var event_id = Ember.keys(json.events)[0];

        json = json.events[event_id];
        json.event_id = event_id;
      }

      if (record) { loader.updateId(record, json); }
      this.extractRecordRepresentation(loader, type, json);
    }
  },


  // Our GW2 api sometimes does not return a root node. In those cases we
  // remove calls to sideload and replace calls of 'json[root]'' with 'json'
  extractMany: function(loader, json, type, records) {
    var root = this.rootForType(type);
    root = this.pluralize(root);

    this.extractMeta(loader, type, json);

    if (json[root]) {
      var objects = json[root], references = [];
      if (records) { records = records.toArray(); }

      // Our GW2 api returns more shittastic json
      // {"continents": {"1": {"name": "Tyria"}, "2": {"name": "Tyria"}}}
      if (type === App.Continent) {
        var array = [];
        Ember.keys(objects).forEach(function(key) {
          var object = objects[key];
          object.id = key;
          array.push(object)
        });
        objects = array;
      }

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
    if (record === "map") {
      return this._super(record) + ".json?map_id=%@".fmt(suffix);
    }

    if (record === "event_detail") {
      return this._super(record) + ".json?event_id=%@".fmt(suffix);
    }

    return this._super(record, suffix) + ".json";
  }
});

App.RESTAdapter.registerTransform('raw', {
  serialize: function(value) {
    return value;
  },

  deserialize: function(value) {
    return value;
  }
});

App.RESTAdapter.map('App.Event', {
  eventName: {key: 'event_id'},
  eventDetail: {key: 'event_id'},
  mapName: {key: 'map_id'},
  worldName: {key: 'world_id'}
});

App.Store = DS.Store.extend({
  adapter: App.RESTAdapter.create()
});

App.Store.registerAdapter('App.Setting', DS.LSAdapter.extend());
