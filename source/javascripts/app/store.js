
// App.ApplicationSerializer = DS.JSONSerializer.extend({

  // // Our GW2 api sometimes does not return a root node. In those cases we
  // // remove calls to sideload and replace calls of 'json[root]'' with 'json'
  // extractMany: function(loader, json, type, records) {
  //   var root = this.rootForType(type);
  //   root = this.pluralize(root);

  //   this.extractMeta(loader, type, json);

  //   if (json[root]) {
  //     var objects = json[root], references = [];
  //     if (records) { records = records.toArray(); }

  //     for (var i = 0; i < objects.length; i++) {
  //       if (records) { loader.updateId(records[i], objects[i]); }
  //       var reference = this.extractRecordRepresentation(loader, type, objects[i]);
  //       references.push(reference);
  //     }

  //     loader.populateArray(references);
  //   } else {
  //     var objects = json, references = [];
  //     if (records) { records = records.toArray(); }

  //     if (type === App.MapFloor) {
  //       objects = [json];
  //     }

  //     for (var i = 0; i < objects.length; i++) {
  //       if (records) { loader.updateId(records[i], objects[i]); }
  //       var reference = this.extractRecordRepresentation(loader, type, objects[i]);
  //       references.push(reference);
  //     }

  //     loader.populateArray(references);
  //   }
  // }
// });

// App.ApplicationAdapter = DS.RESTAdapter.extend({

  // find: function(store, type, id) {
  //   var root = this.rootForType(type), adapter = this;
  //   var params = '',
  //         continent_id, floor_id;

  //   // store.find('map_floor', '1.2')
  //   if (type === App.MapFloor) {
  //     values = id.split('.');
  //     continent_id = values[0];
  //     floor_id = values[1];
  //     params = "continent_id=%@&floor=%@".fmt(continent_id, floor_id);
  //   }

  //   return this.ajax(this.buildURL(root, id) + params, "GET").
  //     then(function(json){

  //       if (type === App.MapFloor) {
  //         json.id = id;
  //         json.continent_id = continent_id;
  //         json.floor_id = floor_id;
  //       }

  //       adapter.didFindRecord(store, type, json, id);
  //   }).then(null, DS.rejectionHandler);
  // },

  // findQuery: function(store, type, query, recordArray) {
  //   var root = this.rootForType(type),
  //   adapter = this;
  //   var params = '',
  //         continent_id, floor_id;

  //   // store.find({continent_id: 1, floor_id: 3})
  //   if (type === App.MapFloor) {
  //     continent_id = query['continent_id'];
  //     floor_id = query['floor_id'];
  //     params = "continent_id=%@&floor=%@".fmt(continent_id, floor_id);
  //     delete query['continent_id'];
  //     delete query['floor_id'];
  //   }

  //   return this.ajax(this.buildURL(root) + params, "GET", {
  //     data: query
  //   }).then(function(json){

  //     if (type === App.MapFloor) {
  //       json.id = continent_id + '.' + floor_id;
  //       json.continent_id = continent_id;
  //       json.floor_id = floor_id;
  //     }

  //     adapter.didFindQuery(store, type, json, recordArray);
  //   }).then(null, DS.rejectionHandler);
  // },

  // buildURL: function(record, suffix) {
  //   if (record === "map_floor") {
  //     return this._super(record) + ".json?";
  //   }

  //   return this._super(record, suffix) + ".json";
  // }
// });

// App.ApplicationAdapter.map('App.MapFloor', {
//   regionData: {key: 'regions'}
// });

// App.ApplicationAdapter.configure('plurals', {
//   map_floor: 'map_floor'
// });
