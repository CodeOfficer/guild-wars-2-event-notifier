
App.BreadcrumbsView =  Bootstrap.Breadcrumb.extend({

  gotoRoute: function(content) {
    var path = content.get('path');
    var args = content.get('args');

    if (Ember.isArray(args)) {
      this.get('parentView.controller').transitionToRoute(path, args);
    } else {
      this.get('parentView.controller').transitionToRoute(path);
    }
  },

  itemViewClass: Ember.View.extend(Bootstrap.ItemViewTitleSupport, {
    template: Ember.Handlebars.compile('<a href="#" {{action gotoRoute view.content target="view.parentView"}}>{{view.content.title}}</a><span class="divider">{{view.parentView.divider}}</span>')
  }),

  lastItemViewClass: Ember.View.extend(Bootstrap.ItemViewTitleSupport, {
    classNames: ['active'],
    template: Ember.Handlebars.compile('{{view.content.title}}')
  })

});
