
App.MapIndexController = Ember.ObjectController.extend({

  needs: ['map'],

  breadcrumbs: Ember.computed.alias('controllers.map.breadcrumbs'),

  breadcrumbWorldName: Ember.computed.alias('controllers.map.breadcrumbWorldName')

});
