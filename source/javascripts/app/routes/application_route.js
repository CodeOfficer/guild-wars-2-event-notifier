
App.ApplicationRoute = Ember.Route.extend({

  beforeModel: function() {
    var promises = [
      this.store.find('worldName', {}),
      this.store.find('eventName', {}),
      this.store.find('mapName', {}),
      this.store.find('continent', {})
    ];

    return Ember.RSVP.all(promises);
  }

});
