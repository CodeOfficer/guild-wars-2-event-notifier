
App.EventIndexRoute = Ember.Route.extend({

  model: function(params) {
    return this.modelFor('event');
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    model.get('eventDetail');
  }

});
