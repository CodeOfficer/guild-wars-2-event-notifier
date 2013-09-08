
App.MapSerializer = DS.RESTSerializer.extend({

  extractSingle: function(store, primaryType, payload, recordId, requestType) {
    var json = payload.maps[recordId];

    json.id = recordId;
    payload = {"map": json};

    return this._super(store, primaryType, payload, recordId, requestType);
  }

});
