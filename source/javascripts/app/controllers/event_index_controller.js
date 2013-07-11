
App.EventIndexController = Ember.ObjectController.extend({

  needs: ['event'],

  breadcrumbs: Ember.computed.alias('controllers.event.breadcrumbs'),

  map: Ember.computed.alias('controllers.event.map'),
  world: Ember.computed.alias('controllers.event.world')

});
