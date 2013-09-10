//= require ./application_serializer

App.MapSerializer = App.ApplicationSerializer.extend({

  extractSingle: function(store, primaryType, payload, recordId, requestType) {

    payload = payload.maps[recordId];
    payload.id = recordId;
    payload = {"map": payload};

    return this._super(store, primaryType, payload, recordId, requestType);
  }

});
