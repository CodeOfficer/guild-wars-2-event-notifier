
App.WorldNamesRoute = Ember.Route.extend({

  model: function() {
    return this.store.all('worldName');
  }

});
