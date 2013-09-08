
App.MapNameSerializer = DS.RESTSerializer.extend({

  extractArray: function(store, type, payload, id, requestType) {
    payload = {"map_names": payload};

    return this._super(store, type, payload, id, requestType);
  },

  normalize: function(type, hash, prop) {
    hash.map = hash.id;

    return this._super(type, hash, prop);
  }

});
