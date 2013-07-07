
App.MapIndexController = Ember.ObjectController.extend({

  needs: ['map'],

  breadcrumbs: null,
  breadcrumbsBinding: 'controllers.map.breadcrumbs',

  world: null,
  worldBinding: 'controllers.map.world'

});
