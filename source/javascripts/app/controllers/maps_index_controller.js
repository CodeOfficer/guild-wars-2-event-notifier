
App.MapsIndexController = Ember.ArrayController.extend({

  needs: ['maps'],

  sortProperties: ['name'],

  // this needs to be here or ember tries to set 'breadcrumbs' on the
  // proxy's object, and not on the object proxy.
  breadcrumbs: null,

  breadcrumbsBinding: 'controllers.maps.breadcrumbs',

  worldBinding: 'controllers.maps.world'

});
