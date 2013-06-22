
App.WorldsIndexController = Ember.ArrayController.extend({

  needs: ['worlds'],

  sortProperties: ['name'],

  // this needs to be here or ember tries to set 'breadcrmbs' on the
  // proxy's object, and not on the object proxy.
  breadcrumbs: null,

  breadcrumbsBinding: 'controllers.worlds.breadcrumbs'

});
