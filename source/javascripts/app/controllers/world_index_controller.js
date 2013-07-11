
App.WorldIndexController = Ember.ObjectController.extend({

  needs: ['world'],

  breadcrumbs: Ember.computed.alias('controllers.world.breadcrumbs')

});
