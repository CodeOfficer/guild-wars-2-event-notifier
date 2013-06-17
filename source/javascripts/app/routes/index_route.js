
App.IndexRoute = Ember.Route.extend({

  redirect: function() {
    console.log('IndexRoute#redirect');
    this.transitionTo('worlds');
  }

});
