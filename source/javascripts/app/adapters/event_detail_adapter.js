//= require ./application_adapter

App.EventDetailAdapter = App.ApplicationAdapter.extend({

  buildURL: function(type, id) {
    return this._super(type.underscore().pluralize()) + "?event_id=%@".fmt(id);
  }

});
