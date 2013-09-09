
App.EventDetailSerializer = DS.RESTSerializer.extend({

  extractSingle: function(store, primaryType, payload, recordId, requestType) {
    var payload = payload.events[recordId];

    payload.id = recordId;
    payload = {"event_detail": payload};

    return this._super(store, primaryType, payload, recordId, requestType);
  },

  normalize: function(type, hash, prop) {
    hash.map = hash.map_id;
    delete hash.map_id;

    return this._super(type, hash, prop);
  }

});
