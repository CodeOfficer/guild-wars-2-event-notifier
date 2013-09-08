
App.EventSerializer = DS.RESTSerializer.extend({

  extractArray: function(store, type, payload, id, requestType) {
    // debugger;

    return this._super(store, type, payload, id, requestType);
  },

  normalize: function(type, hash, prop) {
    hash.eventName = hash.event_id;
    hash.eventDetail = hash.event_id;
    hash.worldName = hash.world_id;
    hash.mapName = hash.map_id;
    hash.map = hash.map_id;

    return this._super(type, hash, prop);
  },

  normalizeHash: {
    events: function(hash) {
      hash.id = [hash.world_id, hash.map_id, hash.event_id].join('.');

      return hash;
    }
  }



});
