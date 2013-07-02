
App.WorldIndexController = Ember.ObjectController.extend({

  needs: ['worlds'],

  mapNames: [],

  // this needs to be here or ember tries to set 'breadcrmbs' on the
  // proxy's object, and not on the object proxy.
  breadcrumbs: null,

  breadcrumbs: function() {
    var trail = this.get('controllers.worlds.breadcrumbs');
    var breadcrumbs = Ember.A();

    breadcrumbs.pushObjects(trail);
    breadcrumbs.pushObject(Ember.Object.create({
      title: this.get('content.name'),
      path: 'world',
      args:[this.get('content')]
    }));

    return breadcrumbs;
  }.property('controllers.worlds.breadcrumbs', 'content')

});
