
App.EventsIndexController = Ember.ArrayController.extend({

  needs: ['events'],

  sortProperties: ['state'],

  breadcrumbs: Ember.computed.alias('controllers.events.breadcrumbs'),

  breadcrumbMap: Ember.computed.alias('controllers.events.breadcrumbMap'),
  breadcrumbWorld: Ember.computed.alias('controllers.events.breadcrumbWorld')

});
