
App.MapIndexController = Ember.ArrayController.extend({

  needs: ['maps'],

  events: [],

  // this needs to be here or ember tries to set 'breadcrumbs' on the
  // proxy's object, and not on the object proxy.
  breadcrumbs: null,

  breadcrumbs: function() {
    var trail = this.get('controllers.maps.breadcrumbs');
    var breadcrumbs = Ember.A();

    breadcrumbs.pushObjects(trail);
    breadcrumbs.pushObject(Ember.Object.create({
      title: this.get('content.name'),
      path: 'map',
      args:[this.get('content')]
    }));

    return breadcrumbs;
  }.property('controllers.maps.breadcrumbs', 'content')

});
