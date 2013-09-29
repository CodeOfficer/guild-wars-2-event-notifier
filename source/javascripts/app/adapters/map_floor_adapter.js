//= require ./application_adapter

App.MapFloorAdapter = App.ApplicationAdapter.extend({

  parseId: function(id) {
    var values = id.split('.');
    return {
      continent_id: values[0],
      floor_id: values[1]
    };
  },

  buildURL: function(type, id) {
      var parseId = this.parseId(id);
      var params = "?continent_id=%@&floor=%@".fmt(parseId['continent_id'], parseId['floor_id']);
    return this._super(type) + params;
  },

  find: function(store, type, id) {
    var parseId = this.parseId(id);
    return this.ajax(this.buildURL(type.typeKey, id), 'GET').then(function(json){
      json.id = id;
      json.continent_id = parseId['continent_id'];
      json.floor_id = parseId['floor_id'];
      return json;
    });
  },

  pathForType: function(type) {
    return type;
  }

});
