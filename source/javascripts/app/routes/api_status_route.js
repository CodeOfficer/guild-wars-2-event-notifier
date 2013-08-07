
App.ApiStatusRoute = Ember.Route.extend({

  model: function(params) {
    return $.getJSON('http://gw2stats.net/api/status.json?callback=?').then(function(json) {
      return Ember.keys(json.api).map(function(key, i) {
        var data = json.api[key];
        data.url = key;
        return data;
      });
    });
  }

});
