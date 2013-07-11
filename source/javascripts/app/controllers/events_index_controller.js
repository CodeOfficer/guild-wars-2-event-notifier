
App.EventsIndexController = Ember.ArrayController.extend({

  needs: ['events'],

  sortProperties: ['state'],

  breadcrumbs: Ember.computed.alias('controllers.events.breadcrumbs'),

  map: Ember.computed.alias('controllers.events.map'),
  world: Ember.computed.alias('controllers.events.world')

});
