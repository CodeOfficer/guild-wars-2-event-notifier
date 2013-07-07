
App.WorldName = DS.Model.extend({
  name: DS.attr('string'),

  isUS: function() {
    return this.get('region') === 'US';
  }.property('region'),

  isEU: function() {
    return this.get('region') === 'EU';
  }.property('region'),

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
