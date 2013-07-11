
App.MapIndexController = Ember.ObjectController.extend({

  needs: ['map'],

  breadcrumbs: Ember.computed.alias('controllers.map.breadcrumbs'),

  world: Ember.computed.alias('controllers.map.world')

});
