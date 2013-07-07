
App.EventsController = Ember.ArrayController.extend({

  needs: ['world', 'map'],

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
  }.property('controllers.world.content', 'controllers.map.breadcrumbs', 'controllers.map.content'),

  worldBinding: 'controllers.world.content',
  mapBinding: 'controllers.map.content'

});
