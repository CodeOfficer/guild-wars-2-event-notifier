
App.SettingsIndexRoute = Ember.Route.extend({

  model: function() {
    console.log('SettingsIndexRoute#model');
    return App.Setting.all().get('firstObject');
  }

});
