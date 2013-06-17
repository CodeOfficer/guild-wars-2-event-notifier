
App.SettingsIndexController = Ember.ArrayController.extend({

  needs: ['settings'],

  breadcrumbsBinding: 'controllers.settings.breadcrumbs'

});
