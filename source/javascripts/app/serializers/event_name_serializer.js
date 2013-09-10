//= require ./application_serializer

App.EventNameSerializer = App.ApplicationSerializer.extend({

  extractArray: function(store, type, payload, id, requestType) {
    payload = {"event_names": payload};

    return this._super(store, type, payload, id, requestType);
  }

});
