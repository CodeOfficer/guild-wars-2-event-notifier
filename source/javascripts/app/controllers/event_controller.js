
App.EventController = Ember.ObjectController.extend({

  needs: ['world', 'map', 'events'],

  breadcrumbMapName: Ember.computed.alias('controllers.map.content'),
  breadcrumbWorldName: Ember.computed.alias('controllers.world.content'),

  breadcrumbs: function() {
    var trail = this.get('controllers.events.breadcrumbs');
    var breadcrumbs = Ember.A();

    breadcrumbs.pushObjects(trail);
    breadcrumbs.pushObject(Ember.Object.create({
      title: '...',
      path: 'event',
      args:[this.get('controllers.world.content'), this.get('controllers.map.content'), this.get('content')]
    }));

    return breadcrumbs;
  }.property('controllers.world.content', 'controllers.map.content', 'controllers.events.breadcrumbs', 'content')

});
