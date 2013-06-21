
App.SettingsController = Ember.Controller.extend({

  needs: ['application'],

  breadcrumbs: function() {
    var trail = this.get('controllers.application.breadcrumbs');
    var breadcrumbs = Ember.A();

    breadcrumbs.pushObjects(trail);
    breadcrumbs.pushObject(Ember.Object.create({
      title: 'Settings',
      path: 'settings'
    }));

    return breadcrumbs;
  }.property('controllers.application.breadcrumbs')

});
