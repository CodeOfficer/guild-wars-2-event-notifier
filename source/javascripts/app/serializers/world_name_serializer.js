
App.WorldNameSerializer = DS.RESTSerializer.extend({

  extractArray: function(store, type, payload, id, requestType) {
    payload = {"world_names": payload};

    return this._super(store, type, payload, id, requestType);
  }

});
