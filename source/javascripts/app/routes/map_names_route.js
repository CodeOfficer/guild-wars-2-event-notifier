
App.MapNamesRoute = Ember.Route.extend({

  model: function() {
    return this.store.all('mapName');
  }

});
