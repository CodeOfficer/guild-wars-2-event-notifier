
App.WorldsWorldRoute = Ember.Route.extend({

  model: function(params) {
    console.log('WorldsWorldRoute#model');
    return App.WorldName.find(params.world_id);
  },

  setupController: function(controller,model) {
    console.log('WorldsWorldRoute#setupController');
    controller.set('mapNames', App.MapName.find());
    return this._super(controller,model);
  }

});
