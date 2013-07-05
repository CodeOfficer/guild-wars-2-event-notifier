
App.WorldController = Ember.ObjectController.extend({

  needs: ['worlds'],

  breadcrumbs: function() {
    var trail = this.get('controllers.worlds.breadcrumbs');
    var breadcrumbs = Ember.A();

    breadcrumbs.pushObjects(trail);
    breadcrumbs.pushObject(Ember.Object.create({
      title: this.get('name'),
      path: 'world',
      args:[this.get('content')]
    }));

    return breadcrumbs;
  }.property('controllers.worlds.breadcrumbs', 'content')

});
