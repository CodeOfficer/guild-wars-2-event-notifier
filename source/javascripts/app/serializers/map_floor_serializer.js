//= require ./application_serializer

App.MapFloorSerializer = App.ApplicationSerializer.extend({

  extractSingle: function(store, type, payload, id, requestType) {
    // move regions to regionData so we can reference our own mapFloor.regions CP
    payload.region_data = payload.regions;
    delete payload.regions;

    payload = {"map_floor": payload};

    return this._super(store, type, payload, id, requestType);
  },

});
