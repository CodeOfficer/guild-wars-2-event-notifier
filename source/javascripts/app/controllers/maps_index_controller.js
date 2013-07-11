
App.MapsIndexController = Ember.ArrayController.extend({

  needs: ['maps'],

  sortProperties: ['name'],

  breadcrumbs: Ember.computed.alias('controllers.maps.breadcrumbs'),

  world: Ember.computed.alias('controllers.maps.world')

});
