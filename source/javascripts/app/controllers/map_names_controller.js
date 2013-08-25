
App.MapNamesController = Ember.ArrayController.extend({

  needs: ['world_name'],

  breadcrumbWorldName: Ember.computed.alias('controllers.world_name.content'),

  breadcrumbs: function() {
    var trail = this.get('controllers.world_name.breadcrumbs');
    var breadcrumbs = Ember.A();

    breadcrumbs.pushObjects(trail);
    breadcrumbs.pushObject(Ember.Object.create({
      title: 'Maps',
      path: 'map_names',
      args:[this.get('controllers.world_name.content')]
    }));

    return breadcrumbs;
  }.property('controllers.world_name.breadcrumbs', 'controllers.world_name.content')

});
