
App.EventsIndexController = Ember.ArrayController.extend({

  needs: ['events'],

  sortProperties: ['state'],

  breadcrumbs: Ember.computed.alias('controllers.events.breadcrumbs'),

  breadcrumbMapName: Ember.computed.alias('controllers.events.breadcrumbMapName'),
  breadcrumbWorldName: Ember.computed.alias('controllers.events.breadcrumbWorldName')

});
