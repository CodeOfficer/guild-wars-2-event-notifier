//= require ./application_adapter

App.MapAdapter = App.ApplicationAdapter.extend({

  buildURL: function(type, id) {
    return this._super(type) + "?map_id=%@".fmt(id);
  }

});
