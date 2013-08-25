
App.Router.map(function() {
  this.resource('world_names', function() {
    this.resource('world_name', {path: ':world_name_id'}, function() {
      this.resource('map_names', function() {
        this.resource('map_name', {path: ':map_name_id'}, function() {
          this.resource('event_names', function() {
            this.resource('event_name', {path: ':event_name_id'}, function() {});
          });
        });
      });
    });
  });

  this.resource('settings', function() {});
  this.route('api_status');
});
