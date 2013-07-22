
App.EventIndexController = Ember.ObjectController.extend({

  needs: ['event'],

  breadcrumbs: Ember.computed.alias('controllers.event.breadcrumbs'),

  breadcrumbMap: Ember.computed.alias('controllers.event.breadcrumbMap'),
  breadcrumbWorld: Ember.computed.alias('controllers.event.breadcrumbWorld')

});
