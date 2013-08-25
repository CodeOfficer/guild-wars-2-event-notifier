
App.MapNamesIndexController = Ember.ArrayController.extend({

  needs: ['map_names'],

  sortProperties: ['name'],

  breadcrumbs: Ember.computed.alias('controllers.map_names.breadcrumbs'),

  breadcrumbWorldName: Ember.computed.alias('controllers.map_names.breadcrumbWorldName')

});
