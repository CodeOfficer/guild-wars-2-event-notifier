
App.WorldsIndexController = Ember.ArrayController.extend({

  needs: ['worlds'],

  sortProperties: ['name'],

  breadcrumbs: Ember.computed.alias('controllers.worlds.breadcrumbs'),

  europeanWorldNames: function() {
    var content = this.get('arrangedContent');
    return content.filter(function(worldName) {
      return worldName.get('isEU');
    });
  }.property('arrangedContent'),

  americanWorldNames: function() {
    var content = this.get('arrangedContent');
    return content.filter(function(worldName) {
      return worldName.get('isUS');
    });
  }.property('arrangedContent')

});
