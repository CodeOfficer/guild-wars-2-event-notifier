
App.WorldNamesIndexController = Ember.ArrayController.extend({

  needs: ['world_names'],

  sortProperties: ['name'],

  breadcrumbs: Ember.computed.alias('controllers.world_names.breadcrumbs'),

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
