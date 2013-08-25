
App.MapNameIndexController = Ember.ObjectController.extend({

  needs: ['map_name'],

  breadcrumbs: Ember.computed.alias('controllers.map_name.breadcrumbs'),

  breadcrumbWorldName: Ember.computed.alias('controllers.map_name.breadcrumbWorldName')

});
