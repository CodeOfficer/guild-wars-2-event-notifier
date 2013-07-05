
App.MapIndexRoute = Ember.Route.extend({

  model: function(params) {
    console.log('MapIndexRoute#model');
    return this.modelFor('map');
  },

  setupController: function(controller,model) {
    console.log('MapIndexRoute#setupController');
    var world = this.modelFor('world');
    var map = this.modelFor('map');
    controller.set('events', App.Event.find({world_id: world.get('id'), map_id: map.get('id')}));
    return this._super(controller,model);
  }

});
