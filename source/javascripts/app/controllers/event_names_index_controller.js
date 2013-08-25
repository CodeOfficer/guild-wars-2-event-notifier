
App.EventNamesIndexController = Ember.ArrayController.extend({

  needs: ['event_names'],

  sortProperties: ['state'],

  breadcrumbs: Ember.computed.alias('controllers.event_names.breadcrumbs'),

  breadcrumbMapName: Ember.computed.alias('controllers.event_names.breadcrumbMapName'),
  breadcrumbWorldName: Ember.computed.alias('controllers.event_names.breadcrumbWorldName')

});
