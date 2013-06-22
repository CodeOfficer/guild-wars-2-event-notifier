
App.Router.map(function(){
  this.resource('worlds', function() {
    this.route('world', {path: ':world_id'});
  });
  this.resource('settings', function() {})
});
