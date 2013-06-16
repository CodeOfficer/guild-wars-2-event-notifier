
App.WorldsIndexController = Ember.ArrayController.extend({

  needs: ['worlds'],

  sortProperties: ['name'],

  breadcrumbsBinding: 'controllers.worlds.breadcrumbs'

});
