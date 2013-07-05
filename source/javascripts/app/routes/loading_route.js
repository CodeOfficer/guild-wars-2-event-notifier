
App.LoadingRoute = Ember.Route.extend({
    enter: function () {
        console.log(">>> Starting loading.");
    },
    setup: Ember.K,
    exit: function () {
        console.log("<<< Finished loading.");
    }
});
