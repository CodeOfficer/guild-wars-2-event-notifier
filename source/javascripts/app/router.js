
App.Router.map(function() {
  this.resource('worlds', function() {
    this.resource('world', {path: ':world_id'}, function() {
      this.resource('maps', function() {
        this.resource('map', {path: ':map_id'}, function() {
          this.resource('events', function() {
            this.resource('event', {path: ':event_id'}, function() {});
          });
        });
      });
    });
  });

  this.resource('settings', function() {});
  this.route('api_status');
});
