
App.WorldsWorldRoute = Ember.Route.extend({

  model: function(params) {
    console.log('WorldsWorldRoute#model');
    return App.WorldName.find(params.world_id);
  },

  setupController: function(controller,model) {
    console.log('WorldsWorldRoute#setupController');
    this._super(controller,model);
    // debugger
    controller.set('events', App.Event.find({world_id: model.get('id')}));
  }

});
