
App.MapController = Ember.ObjectController.extend({

  needs: ['world', 'maps'],

  breadcrumbWorld: Ember.computed.alias('controllers.world.content'),

  breadcrumbs: function() {
    var trail = this.get('controllers.maps.breadcrumbs');
    var breadcrumbs = Ember.A();

    breadcrumbs.pushObjects(trail);
    breadcrumbs.pushObject(Ember.Object.create({
      title: this.get('content.name'),
      path: 'map',
      args:[this.get('controllers.world.content'), this.get('content')]
    }));

    return breadcrumbs;
  }.property('controllers.world.content', 'controllers.maps.breadcrumbs', 'content')

});
