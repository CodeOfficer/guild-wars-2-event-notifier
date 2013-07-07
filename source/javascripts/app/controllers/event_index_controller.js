
App.EventIndexController = Ember.ObjectController.extend({

  needs: ['event'],

  // this needs to be here or ember tries to set 'breadcrumbs' on the
  // proxy's object, and not on the object proxy.
  breadcrumbs: null,
  breadcrumbsBinding: 'controllers.event.breadcrumbs',

  world: null,
  worldBinding: 'controllers.event.world',

  map: null,
  mapBinding: 'controllers.event.map'

});
