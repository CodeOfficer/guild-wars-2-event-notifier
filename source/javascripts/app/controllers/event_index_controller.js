
App.EventIndexController = Ember.ObjectController.extend({

  needs: ['event'],

  breadcrumbs: Ember.computed.alias('controllers.event.breadcrumbs'),

  breadcrumbMapName: Ember.computed.alias('controllers.event.breadcrumbMapName'),
  breadcrumbWorldName: Ember.computed.alias('controllers.event.breadcrumbWorldName')

});
