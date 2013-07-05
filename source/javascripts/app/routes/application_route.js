
App.ApplicationRoute = Ember.Route.extend({

  // redirect: function() {
  //   this.transitionTo('worlds');
  // }

});

App.LoadingRoute = Ember.Route.extend({
    enter: function () {
        console.log(">>> Starting loading.");
    },
    setup: Ember.K,
    exit: function () {
        console.log("<<< Finished loading.");
    }
});
