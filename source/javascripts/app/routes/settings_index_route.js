
App.SettingsIndexRoute = Ember.Route.extend({

  model: function() {
    return App.Setting.all().get('firstObject');
  }

});
