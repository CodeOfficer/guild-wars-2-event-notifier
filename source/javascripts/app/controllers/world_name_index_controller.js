
App.WorldNameIndexController = Ember.ObjectController.extend({

  needs: ['world_name'],

  breadcrumbs: Ember.computed.alias('controllers.world_name.breadcrumbs')

});
