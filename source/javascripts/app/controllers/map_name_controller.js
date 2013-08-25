
App.MapNameController = Ember.ObjectController.extend({

  needs: ['world_name', 'map_names'],

  breadcrumbWorldName: Ember.computed.alias('controllers.world_name.content'),

  breadcrumbs: function() {
    var trail = this.get('controllers.map_names.breadcrumbs');
    var breadcrumbs = Ember.A();

    breadcrumbs.pushObjects(trail);
    breadcrumbs.pushObject(Ember.Object.create({
      title: this.get('content.name'),
      path: 'map_name',
      args:[this.get('controllers.world_name.content'), this.get('content')]
    }));

    return breadcrumbs;
  }.property('controllers.world_name.content', 'controllers.map_names.breadcrumbs', 'content')

});
