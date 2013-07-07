
App.WorldsIndexController = Ember.ArrayController.extend({

  needs: ['worlds'],

  sortProperties: ['name'],

  // this needs to be here or ember tries to set 'breadcrumbs' on the
  // proxy's object, and not on the object proxy.
  breadcrumbs: null,
  breadcrumbsBinding: 'controllers.worlds.breadcrumbs',

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
