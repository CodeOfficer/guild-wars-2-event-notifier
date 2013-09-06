
App.ApplicationSerializer = DS.JSONSerializer.extend({

  // Our GW2 api does not sideload and returns some really shittastic  json
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
        json.id = event_id;
      }

      if (type === App.Map) {
        var map_id = Ember.keys(json.maps)[0];

        json = json.maps[map_id];
        json.id = map_id;
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

      // give Event a composite primary key
      if (type === App.Event) {
        json.events.forEach(function(event, i, events) {
          events[i].id = [event.world_id, event.map_id, event.event_id].join('.');
        });
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

      if (type === App.MapFloor) {
        objects = [json];
      }

      for (var i = 0; i < objects.length; i++) {
        if (records) { loader.updateId(records[i], objects[i]); }
        var reference = this.extractRecordRepresentation(loader, type, objects[i]);
        references.push(reference);
      }

      loader.populateArray(references);
    }
  }
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  // serializer: App.JSONSerializer.create(),

  url: 'https://api.guildwars2.com',

  namespace: 'v1',

  find: function(store, type, id) {
    var root = this.rootForType(type), adapter = this;
    var params = '',
          continent_id, floor_id;

    // store.find('map_floor', '1.2')
    if (type === App.MapFloor) {
      values = id.split('.');
      continent_id = values[0];
      floor_id = values[1];
      params = "continent_id=%@&floor=%@".fmt(continent_id, floor_id);
    }

    return this.ajax(this.buildURL(root, id) + params, "GET").
      then(function(json){

        if (type === App.MapFloor) {
          json.id = id;
          json.continent_id = continent_id;
          json.floor_id = floor_id;
        }

        adapter.didFindRecord(store, type, json, id);
    }).then(null, DS.rejectionHandler);
  },

  findQuery: function(store, type, query, recordArray) {
    var root = this.rootForType(type),
    adapter = this;
    var params = '',
          continent_id, floor_id;

    // store.find({continent_id: 1, floor_id: 3})
    if (type === App.MapFloor) {
      continent_id = query['continent_id'];
      floor_id = query['floor_id'];
      params = "continent_id=%@&floor=%@".fmt(continent_id, floor_id);
      delete query['continent_id'];
      delete query['floor_id'];
    }

    return this.ajax(this.buildURL(root) + params, "GET", {
      data: query
    }).then(function(json){

      if (type === App.MapFloor) {
        json.id = continent_id + '.' + floor_id;
        json.continent_id = continent_id;
        json.floor_id = floor_id;
      }

      adapter.didFindQuery(store, type, json, recordArray);
    }).then(null, DS.rejectionHandler);
  },

  buildURL: function(record, suffix) {
    if (record === "map_floor") {
      return this._super(record) + ".json?";
    }

    if (record === "map") {
      return this._super(record) + ".json?map_id=%@".fmt(suffix);
    }

    if (record === "event_detail") {
      return this._super(record) + ".json?event_id=%@".fmt(suffix);
    }

    return this._super(record, suffix) + ".json";
  }
});

App.RawTransform = DS.Transform.extend({
  serialize: function(serialized) {
    return serialized;
  },

  deserialize: function(deserialized) {
    return deserialized;
  }
});

App.RESTAdapter.map('App.Event', {
  eventName: {key: 'event_id'},
  eventDetail: {key: 'event_id'},
  mapName: {key: 'map_id'},
  map: {key: 'map_id'},
  worldName: {key: 'world_id'}
});

App.RESTAdapter.map('App.EventDetail', {
  map: {key: 'map_id'}
});

App.RESTAdapter.map('App.MapName', {
  map: {key: 'id'}
});

App.RESTAdapter.map('App.MapFloor', {
  regionData: {key: 'regions'}
});


App.RESTAdapter.configure('plurals', {
  map_floor: 'map_floor'
});

App.SettingAdapter = DS.LSAdapter.extend();
