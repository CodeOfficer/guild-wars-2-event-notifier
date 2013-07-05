
App.ApplicationController = Ember.Controller.extend({

  breadcrumbs: function() {
    return Ember.A([
      Ember.Object.create({
        title: 'Home',
        path: 'index'
      })
    ]);
  }.property()

});
