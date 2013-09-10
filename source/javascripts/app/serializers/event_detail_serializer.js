//= require ./application_serializer

App.EventDetailSerializer = App.ApplicationSerializer.extend({

  extractSingle: function(store, primaryType, payload, recordId, requestType) {
    payload = payload.events[recordId];
    payload.id = recordId;
    payload = {"event_detail": payload};

    return this._super(store, primaryType, payload, recordId, requestType);
  },

  normalizeHash: {
    event_detail: function(hash) {
      hash.map = hash.map_id;
      delete hash.map_id;

      return hash;
    }
  }

});
