
App.MapsController = Ember.ArrayController.extend({

  needs: ['world'],

  breadcrumbs: function() {
    var trail = this.get('controllers.world.breadcrumbs');
    var breadcrumbs = Ember.A();

    breadcrumbs.pushObjects(trail);
    breadcrumbs.pushObject(Ember.Object.create({
      title: 'Maps',
      path: 'maps',
      args:[this.get('controllers.world.content')]
    }));

    return breadcrumbs;
  }.property('controllers.world.breadcrumbs', 'controllers.world.content'),

  worldBinding: 'controllers.world.content'

});
