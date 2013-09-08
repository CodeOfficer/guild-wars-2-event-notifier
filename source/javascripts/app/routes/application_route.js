
App.ApplicationRoute = Ember.Route.extend({

  beforeModel: function() {
    var promises = [
      this.store.find('world_name', {}),
      this.store.find('event_name', {}),
      this.store.find('map_name', {}),
      this.store.find('continent', {})
    ];

    return Ember.RSVP.all(promises);
  }

});
