
App.WorldIndexController = Ember.ObjectController.extend({

  needs: ['world'],

  // mapNames: [],

  // this needs to be here or ember tries to set 'breadcrumbs' on the
  // proxy's object, and not on the object proxy.
  breadcrumbs: null,

  breadcrumbsBinding: 'controllers.world.breadcrumbs'

});
