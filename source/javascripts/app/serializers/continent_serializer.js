//= require ./application_serializer

App.ContinentSerializer = App.ApplicationSerializer.extend({

  // Our GW2 api returns more shittastic json
  // {"continents": {"1": {"name": "Tyria"}, "2": {"name": "Tyria"}}}
  // change it to ...
  // {"continents": [{"id": 1", name": "Tyria"}, {"id": 2, "name": "Tyria"}]
  extractArray: function(store, type, payload, id, requestType) {
    var array = [];

    Ember.keys(payload.continents).forEach(function(key) {
      var object = payload.continents[key];
      object.id = key;
      array.push(object);
    });

    payload = {"continents": array};

    return this._super(store, type, payload, id, requestType);
  }

});
