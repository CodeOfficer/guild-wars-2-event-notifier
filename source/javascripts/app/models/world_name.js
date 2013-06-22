
App.WorldName = DS.Model.extend({
  name: DS.attr('string'),

  region: function() {
    var id = this.get('id');

    switch(id.substring(0,1)) {
      case '1':
        return 'US';
      case '2':
        return 'EU';
      default:
        return 'unknown';
    }
  }.property('id')
});
