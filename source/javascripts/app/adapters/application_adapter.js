
App.ApplicationAdapter = DS.RESTAdapter.extend({

  host: 'https://api.guildwars2.com',

  namespace: 'v1',

  buildURL: function(type, id) {
    if (type === "map") {
      return this._super(type) + ".json?map_id=%@".fmt(id);
    }

    if (type === "eventDetail") {
      return this._super('event_details') + ".json?event_id=%@".fmt(id);
    }

    return this._super(type, id) + ".json";
  },

});
