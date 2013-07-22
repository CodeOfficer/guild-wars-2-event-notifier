
App.MapIndexController = Ember.ObjectController.extend({

  needs: ['map'],

  breadcrumbs: Ember.computed.alias('controllers.map.breadcrumbs'),

  breadcrumbWorld: Ember.computed.alias('controllers.map.breadcrumbWorld')

});
