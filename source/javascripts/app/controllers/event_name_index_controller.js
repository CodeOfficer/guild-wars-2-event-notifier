
App.EventNameIndexController = Ember.ObjectController.extend({

  needs: ['event_name'],

  breadcrumbs: Ember.computed.alias('controllers.event_name.breadcrumbs'),

  breadcrumbMapName: Ember.computed.alias('controllers.event_name.breadcrumbMapName'),
  breadcrumbWorldName: Ember.computed.alias('controllers.event_name.breadcrumbWorldName')

});
