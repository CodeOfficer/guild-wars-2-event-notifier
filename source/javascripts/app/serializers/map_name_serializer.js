//= require ./application_serializer

App.MapNameSerializer = App.ApplicationSerializer.extend({

  extractArray: function(store, type, payload, id, requestType) {
    payload = {"map_names": payload};

    return this._super(store, type, payload, id, requestType);
  },

  normalizeHash: {
    map_names: function(hash) {
      hash.map = hash.id;

      return hash;
    }
  }

});
