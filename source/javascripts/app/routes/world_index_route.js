
App.WorldIndexRoute = Ember.Route.extend({

  model: function(params) {
    console.log('WorldIndexRoute#model');
    return this.modelFor('world');
  },

  setupController: function(controller,model) {
    console.log('WorldIndexRoute#setupController');
    // controller.set('mapNames', App.MapName.find());
    return this._super(controller,model);
  }

});
