
App.BreadcrumbsView =  Bootstrap.Breadcrumb.extend({

  gotoRoute: function(content) {
    var path = content.get('path');
    var args = content.get('args');
    var controller = this.get('parentView.controller');
    var transitionToRoute = controller.transitionToRoute;

    if (Ember.isArray(args)) {
      // TODO huh? wtfbbq? investigate
      if (args[0] !== path) {
        args.unshift(path);
      }
      transitionToRoute.apply(controller, args);
    } else {
      transitionToRoute.call(controller, path);
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
