
App.EventsController = Ember.ArrayController.extend({

  needs: ['world', 'map'],

  map: Ember.computed.alias('controllers.map.content'),
  world: Ember.computed.alias('controllers.world.content'),

  breadcrumbs: function() {
    var trail = this.get('controllers.map.breadcrumbs');
    var breadcrumbs = Ember.A();

    breadcrumbs.pushObjects(trail);
    breadcrumbs.pushObject(Ember.Object.create({
      title: 'Events',
      path: 'events',
      args:[this.get('controllers.world.content'), this.get('controllers.map.content')]
    }));

    return breadcrumbs;
  }.property('controllers.world.content', 'controllers.map.breadcrumbs', 'controllers.map.content')

});
