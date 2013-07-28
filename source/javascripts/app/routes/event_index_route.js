
App.EventIndexRoute = Ember.Route.extend({

  model: function(params) {
    return this.modelFor('event');
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    window.e = model;

    // TODO - defer render until all data is fetched
    model.get('map');
    model.get('eventDetail');
    model.get('eventDetail.map');
  }

});
