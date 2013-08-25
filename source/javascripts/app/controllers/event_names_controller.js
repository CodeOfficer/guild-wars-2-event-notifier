
App.EventNamesController = Ember.ArrayController.extend({

  needs: ['world_name', 'map_name'],

  breadcrumbMapName: Ember.computed.alias('controllers.map_name.content'),
  breadcrumbWorldName: Ember.computed.alias('controllers.world_name.content'),

  breadcrumbs: function() {
    var trail = this.get('controllers.map_name.breadcrumbs');
    var breadcrumbs = Ember.A();

    breadcrumbs.pushObjects(trail);
    breadcrumbs.pushObject(Ember.Object.create({
      title: 'Events',
      path: 'event_names',
      args:[this.get('controllers.world_name.content'), this.get('controllers.map_name.content')]
    }));

    return breadcrumbs;
  }.property('controllers.world_name.content', 'controllers.map_name.breadcrumbs', 'controllers.map_name.content')

});
