
App.MapsIndexController = Ember.ArrayController.extend({

  needs: ['maps'],

  sortProperties: ['name'],

  breadcrumbs: Ember.computed.alias('controllers.maps.breadcrumbs'),

  breadcrumbWorldName: Ember.computed.alias('controllers.maps.breadcrumbWorldName')

});
