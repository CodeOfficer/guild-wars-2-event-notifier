
App.EventsIndexController = Ember.ArrayController.extend({

  needs: ['events'],

  sortProperties: ['state'],

  // this needs to be here or ember tries to set 'breadcrumbs' on the
  // proxy's object, and not on the object proxy.
  breadcrumbs: null,

  breadcrumbsBinding: 'controllers.events.breadcrumbs',

  worldBinding: 'controllers.events.world',
  mapBinding: 'controllers.events.map'

});
