
App.EventNameController = Ember.ObjectController.extend({

  needs: ['world_name', 'map_name', 'event_names'],

  breadcrumbMapName: Ember.computed.alias('controllers.map_name.content'),
  breadcrumbWorldName: Ember.computed.alias('controllers.world_name.content'),

  breadcrumbs: function() {
    var trail = this.get('controllers.event_names.breadcrumbs');
    var breadcrumbs = Ember.A();

    breadcrumbs.pushObjects(trail);
    breadcrumbs.pushObject(Ember.Object.create({
      title: '...',
      path: 'event_name',
      args:[this.get('controllers.world_name.content'), this.get('controllers.map_name.content'), this.get('content')]
    }));

    return breadcrumbs;
  }.property('controllers.world_name.content', 'controllers.map_name.content', 'controllers.event_names.breadcrumbs', 'content')

});
