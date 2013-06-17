
App.ApplicationRoute = Ember.Route.extend({

  model: function() {
    console.log('ApplicationRoute#model');
    return App.World.find({}).then(function() { console.log('complete'); });
  }

});
