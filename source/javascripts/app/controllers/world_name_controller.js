
App.WorldNameController = Ember.ObjectController.extend({

  needs: ['world_names'],

  breadcrumbs: function() {
    var trail = this.get('controllers.world_names.breadcrumbs');
    var breadcrumbs = Ember.A();

    breadcrumbs.pushObjects(trail);
    breadcrumbs.pushObject(Ember.Object.create({
      title: this.get('name'),
      path: 'world_name',
      args:[this.get('content')]
    }));

    return breadcrumbs;
  }.property('controllers.world_names.breadcrumbs', 'content')

});
