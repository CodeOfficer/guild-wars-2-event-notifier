(function() {
var Bootstrap = window.Bootstrap = Ember.Namespace.create();

})();



(function() {
var get = Ember.get;
var Bootstrap = window.Bootstrap;
var jQuery = window.jQuery;

var modalPaneTemplate = [
'{{#if view.heading}}',
'  <div class="modal-header">',
'  {{#if view.showCloseButton}}',
'    <a href="#" class="close" rel="close">&times;</a>',
'  {{/if}}',
'  {{view view.headerViewClass}}',
'  </div>',
'{{/if}}',
'<div class="modal-body">{{view view.bodyViewClass}}</div>',
'<div class="modal-footer">',
'  {{#if view.secondary}}',
'   <button class="btn btn-secondary" type="button" rel="secondary">',
'     {{#if view.secondaryIcon}}{{view view.secondaryIconViewClass}}{{/if}}',
'     {{view.secondary}}',
'  </button>',
'  {{/if}}',
'  {{#if view.primary}}',
'   <button class="btn btn-primary" type="button" rel="primary" {{bindAttr disabled="view.isNotValid"}}>',
'     {{#if view.primaryIcon}}{{view view.primaryIconViewClass}}{{/if}}',
'     {{view.primary}}',
'  </button>',
'  {{/if}}',
'</div>'].join("\n");
var modalPaneBackdrop = '<div class="modal-backdrop"></div>';

Bootstrap.ModalPane = Ember.View.extend({
  classNames: 'modal',
  defaultTemplate: Ember.Handlebars.compile(modalPaneTemplate),
  heading: null,
  message: null,
  primary: null,
  secondary: null,
  showBackdrop: true,
  showCloseButton: true,
  closeOnEscape: true,
  headerViewClass: Ember.View.extend({
    tagName: 'h3',
    template: Ember.Handlebars.compile('{{view.parentView.heading}}')
  }),
  bodyViewClass: Ember.View.extend({
    tagName: 'p',
    template: Ember.Handlebars.compile('{{{view.parentView.message}}}')
  }),

  isNotValid: function () {
    if (!Ember.isEmpty(this.get('context.content'))) {
      return !this.get('context.content.isValid');
    }
    return false;
  }.property('context.content.isValid'),

  primaryIcon: null,
  primaryIconViewClass: function() {
    var icon = this.get('primaryIcon');
    return Bootstrap.Icon.extend({ classNames:  icon});
  }.property('primaryIcon'),
  secondaryIcon: null,
  secondaryIconViewClass: function() {
    var icon = this.get('secondaryIcon');
    return Bootstrap.Icon.extend({ classNames:  icon});
  }.property('secondaryIcon'),

  didInsertElement: function() {
    if (get(this, 'showBackdrop')) this._appendBackdrop();
    this._setupDocumentKeyHandler();
  },

  willDestroyElement: function() {
    if (this._backdrop) this._backdrop.remove();
    this._removeDocumentKeyHandler();
  },

  keyPress: function(event) {
    if (get(this, 'closeOnEscape') && event.keyCode === 27) {
      this._triggerCallbackAndDestroy({ close: true }, event);
    }
  },

  click: function(event) {
    var target = event.target,
        targetRel = target.getAttribute('rel');

    if (targetRel === 'close') {
      this._triggerCallbackAndDestroy({ close: true }, event);
      return false;
    } else if (targetRel === 'primary' && !this.get('isNotValid')) {
      this._triggerCallbackAndDestroy({ primary: true }, event);
      return false;

    } else if (targetRel === 'secondary') {
      this._triggerCallbackAndDestroy({ secondary: true }, event);
      return false;
    }
  },

  _appendBackdrop: function() {
    var parentLayer = this.$().parent();
    this._backdrop = jQuery(modalPaneBackdrop).appendTo(parentLayer);
  },

  _setupDocumentKeyHandler: function() {
    var cc = this,
      handler = function(event) {
        cc.keyPress(event);
      };
    jQuery(window.document).bind('keyup', handler);
    this._keyUpHandler = handler;
  },

  _removeDocumentKeyHandler: function() {
    jQuery(window.document).unbind('keyup', this._keyUpHandler);
  },

  _triggerCallbackAndDestroy: function(options, event) {
    var destroy;
    if (this.callback) {
      destroy = this.callback(options, event);
    }
    if (destroy === undefined || destroy) this.destroy();
  }
});

Bootstrap.ModalPane.reopenClass({
  rootElement: ".ember-application",
  popup: function(options) {
    var modalPane, rootElement;
    if (!options) options = {};
    modalPane = this.create(options);
    rootElement = get(this, 'rootElement');
    modalPane.appendTo(rootElement);
    return modalPane;
  }
});

})();



(function() {
var get = Ember.get, set = Ember.set;
var Bootstrap = window.Bootstrap;

Bootstrap.TypeSupport = Ember.Mixin.create({
  baseClassName: Ember.required(String),
  classNameBindings: ['typeClass'],
  type: null, // success, warning, error, info || inverse
  typeClass: Ember.computed(function() {
    var type = get(this, 'type'),
        baseClassName = get(this, 'baseClassName');
    return type ? baseClassName + '-' + type : null;
  }).property('type').cacheable()
});

})();



(function() {
var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.AlertMessage = Ember.View.extend(Bootstrap.TypeSupport, {
  classNames: ['alert', 'alert-message'],
  baseClassName: 'alert',
  template: Ember.Handlebars.compile('<a class="close" rel="close" href="#">&times;</a>{{{view.message}}}'),
  message: null,
  removeAfter: null,

  didInsertElement: function() {
    var removeAfter = get(this, 'removeAfter');
    if (removeAfter > 0) {
      Ember.run.later(this, 'destroy', removeAfter);
    }
  },

  click: function(event) {
    var target = event.target,
        targetRel = target.getAttribute('rel');

    if (targetRel === 'close') {
      this.destroy();
      return false;
    }
  }
});

})();



(function() {
var Bootstrap = window.Bootstrap;

Bootstrap.BlockAlertMessage = Bootstrap.AlertMessage.extend({
  classNames: ['alert', 'alert-block']
});

})();



(function() {
var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.ItemViewValueSupport = Ember.Mixin.create({
  value: Ember.computed(function() {
    var parentView = get(this, 'parentView'),
        content, valueKey;
    if (!parentView) return null;
    content = get(this, 'content');
    valueKey = get(parentView, 'itemValueKey') || 'value';
    return get(content, valueKey) || content;
  }).property('content').cacheable()
});

})();



(function() {
var get = Ember.get,
    Bootstrap = window.Bootstrap;

Bootstrap.ItemViewTitleSupport = Ember.Mixin.create({
  title: Ember.computed(function() {
    var parentView = get(this, 'parentView'),
        content,
        titleKey;

    content = get(this, 'content');
    if (parentView) {
      titleKey = get(parentView, 'itemTitleKey') || 'title';

      return get(content, titleKey) || content;
    }

    return content;
  }).property('content').cacheable()
});

})();



(function() {
var get = Ember.get, set = Ember.set;
var Bootstrap = window.Bootstrap;

Bootstrap.ItemSelectionSupport = Ember.Mixin.create(Bootstrap.ItemViewValueSupport, Bootstrap.ItemViewTitleSupport, {
  classNameBindings: ["isActive:active"],
  allowsEmptySelection: false,

  isActive: Ember.computed(function() {
    var parentView = get(this, 'parentView'),
    selection, value;
    if (!parentView) return false;
    selection = get(parentView, 'selection');
    value = get(this, 'value');
    return selection === value;
  }).property('parentView.selection', 'value').cacheable(),

  click: function(event) {
    var value = get(this, 'value'),
    parentView = get(this, 'parentView'),
    allowsEmptySelection = get(parentView, 'allowsEmptySelection'),
    selection = get(parentView, 'selection');
    if (allowsEmptySelection === true && selection === value) {
      value = null;
    }
    set(parentView, 'selection', value);
    return true;
  }
});

})();



(function() {
var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.ItemViewHrefSupport = Ember.Mixin.create({
  href: Ember.computed(function() {
    var parentView = get(this, 'parentView'),
        content, hrefKey;
    content = get(this, 'content');
    if (parentView) {
      hrefKey = get(parentView, 'itemHrefKey') || 'link';
      return get(content, hrefKey) || '#';
    }
    return content;
  }).property('content').cacheable()
});

})();



(function() {
var Bootstrap = window.Bootstrap;
Bootstrap.PillItem = Ember.View.extend(Bootstrap.ItemSelectionSupport, Bootstrap.ItemViewHrefSupport, {
  template: Ember.Handlebars.compile('{{view view.item}}'),

  item: Ember.View.extend({
    tagName: 'a',
    template: Ember.Handlebars.compile('{{view.parentView.title}}'),
    attributeBindings: ['href'],
    hrefBinding: 'parentView.href'
  })
});

})();



(function() {
var Bootstrap = window.Bootstrap;
Bootstrap.Pills = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-pills'],
  classNameBindings: ['isStacked:nav-stacked'],
  tagName: 'ul',
  itemViewClass: Bootstrap.PillItem,
  selection: null
});

})();



(function() {
var get = Ember.get, set = Ember.set;
var Bootstrap = window.Bootstrap;

Bootstrap.TabContainerView = Ember.View.extend({
});

Bootstrap.TabView = Ember.View.extend({
  tagName: 'li',
  classNameBindings: ['isActive:active'],

  tabsContainer: Ember.computed(function () {
    return this.nearestOfType(Bootstrap.TabContainerView);
  }).property().volatile(),

  mouseUp: function () {
    set(this, 'tabsContainer.currentView', get(this, 'value'));
  },

  isActive: function() {
    return this.get('value') === this.get('tabsContainer.currentView');
  }.property('tabsContainer.currentView').cacheable()
});

Bootstrap.TabPaneView = Ember.View.extend({
  tabsContainer: Ember.computed(function () {
    return this.nearestOfType(Bootstrap.TabContainerView);
  }).property().volatile(),

  isVisible: Ember.computed(function () {
    return get(this, 'viewName') === get(this, 'tabsContainer.currentView');
  }).property('tabsContainer.currentView').volatile()
});



Bootstrap.Tabs = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-tabs'],
  classNameBindings: ['isStacked:nav-stacked'],
  tagName: 'ul',
  itemViewClass: Bootstrap.PillItem,
  selection: null
});

Bootstrap.TabItem = Ember.View.extend({
    tagName: 'li',
    classNameBindings: [/*'isActive:active'*/'active'],

    /*isActive: function() {
        return this.get('childViews.firstObject.active');
    }.property('item', 'controller.selectedTab').cacheable()*/

    activeChanged: function () {
      var self = this;
      Ember.run.next(this, function () { //delay
        if (!self.isDestroyed) {
          self.set('active', self.get('childViews.firstObject.active'));
        }
      });
    }.observes('childViews.firstObject.active') //get the active state from the linkTo helper
});

})();



(function() {
var Bootstrap = window.Bootstrap;
Bootstrap.NavList = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-list'],
  tagName: 'ul',
  itemViewClass: Bootstrap.PillItem,
  selection: null
});

})();



(function() {
var get = Ember.get;
var fmt = Ember.String.fmt;
var Bootstrap = window.Bootstrap;

Bootstrap.ProgressBar = Ember.View.extend({
  classNames: ['progress'],
  classNameBindings: ['isStriped:progress-striped', 'isAnimated:active'],
  template: Ember.Handlebars.compile('<div class="bar" {{bindAttr style="view.style"}}></div>'),
  isAnimated: false,
  isStriped: false,
  progress: 0,

  style: Ember.computed(function() {
    var progress = get(this, 'progress');

    return fmt('width:%@%;', [progress]);
  }).property('progress').cacheable()
});

})();



(function() {
var Bootstrap = window.Bootstrap;
Bootstrap.Badge = Ember.View.extend(Bootstrap.TypeSupport, {
  tagName: 'span',
  classNames: ['badge'],
  baseClassName: 'badge',
  template: Ember.Handlebars.compile('{{view.content}}')
});

})();



(function() {
var Bootstrap = window.Bootstrap;

Bootstrap.Label = Ember.View.extend(Bootstrap.TypeSupport, {
  tagName: 'span',
  classNames: ['label'],
  baseClassName: 'label',
  template: Ember.Handlebars.compile('{{view.content}}')
});

})();



(function() {
var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.Well = Ember.View.extend({
  template: Ember.Handlebars.compile('{{view.content}}'),
  classNames: 'well',
  content: null
});

})();



(function() {
var get = Ember.get, set = Ember.set, A = Ember.A;
var Bootstrap = window.Bootstrap;

Bootstrap.Pagination = Ember.CollectionView.extend({
  tagName: 'ul',
  classNames: ['pagination'],
  itemTitleKey: 'title',
  itemHrefKey: 'href',
  init: function() {
    this._super();
    if (!this.get('content')) {
      this.set('content', new A([]));
    }
  },
  itemViewClass: Ember.View.extend(Bootstrap.ItemSelectionSupport, Bootstrap.ItemViewHrefSupport, {
    classNameBindings: ['content.disabled'],
    template: Ember.Handlebars.compile('<a {{bindAttr href="view.href"}}>{{view.title}}</a>')
  })
});

})();



(function() {
var Bootstrap = window.Bootstrap;
Bootstrap.Pager = Ember.CollectionView.extend({
  tagName: 'ul',
  classNames: ['pager'],
  itemTitleKey: 'title',
  itemHrefKey: 'href',
  init: function() {
    this._super();
    if (!this.get('content')) {
      this.set('content', Ember.A([
                                  Ember.Object.create({ title: '&larr;' }),
                                  Ember.Object.create({ title: '&rarr;' })
      ]));
    }
  },
  itemViewClass: Ember.View.extend(Bootstrap.ItemViewTitleSupport, Bootstrap.ItemViewHrefSupport, {
    classNameBindings: ['content.next', 'content.previous', 'content.disabled'],
    template: Ember.Handlebars.compile('<a {{bindAttr href="view.href"}}>{{{view.title}}}</a>')
  }),
  arrayDidChange: function(content, start, removed, added) {
    if (content) {
      Ember.assert('content must always has at the most 2 elements', content.get('length') <= 2);
    }
    return this._super(content, start, removed, added);
  }
});

})();



(function() {
var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.FirstLastViewSupport = Ember.Mixin.create({
  createChildView: function(view, attrs) {
    var content;

    if (attrs) {
      content = get(this, 'content');

      if (attrs.contentIndex === 0) {
        view = get(this, 'firstItemViewClass') || view;
      }
      if (attrs.contentIndex === (get(content, 'length') - 1)) {
        view = get(this, 'lastItemViewClass') || view;
      }
    }
    return this._super(view, attrs);
  }
});

})();



(function() {
var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.Breadcrumb = Ember.CollectionView.extend(Bootstrap.FirstLastViewSupport, {
  tagName: 'ul',
  classNames: ['breadcrumb'],
  divider: '/',
  arrayDidChange: function(content, start, removed, added) {
    var view,
        index,
        length,
        item,
        lastItemViewClass = get(this, 'lastItemViewClass'),
        itemViewClass = get(this, 'itemViewClass'),
        lastView;

    this._super.apply(this, arguments);

    if (!content)
      return;

    length = get(content, 'length');

    if (removed) {
      lastView = get(this, 'childViews.lastObject');

      if (lastItemViewClass.detectInstance(lastView))
        return;

      index = length - 1;

      view = this.createChildView(lastItemViewClass, {
        content: content[index],
        contentIndex: index
      });

      this.replace(index, 1, [view]);
    }

    if (added) {
      get(this, 'childViews').forEach(function(childView, index) {
        if (lastItemViewClass.detectInstance(childView) && index !== length - 1) {
          view = this.createChildView(itemViewClass, {
            content: content[index],
            contentIndex: index
          });

          this.replace(index, 1, [view]);
        }
      }, this);

    }

  },
  itemViewClass: Ember.View.extend(Bootstrap.ItemViewTitleSupport, {
    template: Ember.Handlebars.compile('<a href="#">{{view.title}}</a><span class="divider">{{view.parentView.divider}}</span>')
  }),
  lastItemViewClass: Ember.View.extend(Bootstrap.ItemViewTitleSupport, {
    classNames: ['active'],
    template: Ember.Handlebars.compile('{{view.title}}')
  })
});

// 1 2 3
// 1 2 3 4 5 6
// [] 3 0 3

// 1 2 3
// 1 2 3 4
// [] 3 0 1





})();



(function() {
var Bootstrap = window.Bootstrap;

Bootstrap.AlertBox = Bootstrap.ModalPane.extend({
  primary: 'OK',
  primaryIcon: ['icon-ok', 'icon-white'],
  closeOnEscape: false,
  showCloseButton: false,

  bodyViewClass: Ember.View.extend({
    tagName: 'p',
    template: Ember.Handlebars.compile([
      '{{#if view.parentView.icon}}',
      '<div class="span2">',
      ' {{view view.parentView.iconViewClass}}',
      '</div>',
      '{{/if}}',
      '<div>{{{view.parentView.message}}}</div>'
      ].join("\n"))
  }),

  icon: null,
  iconViewClass: function() {
    var icon = this.get('icon');
    return Bootstrap.Icon.extend({ classNames: [icon, "icon-thumbnail"], styleBinding: "parentView.parentView.iconStyle" });
  }.property('icon')
});

})();



(function() {
var Bootstrap = window.Bootstrap;

Bootstrap.ConfirmBox = Bootstrap.AlertBox.extend({
  primary: 'Ja',
  secondary: 'Nee',
  secondaryIcon: ['icon-remove']
});

})();



(function() {
var Bootstrap = window.Bootstrap;

Bootstrap.FocusSupport = Ember.Mixin.create({
  attributeBindings: ['autofocus'], //HTML5 autofocus see http://diveintohtml5.info/forms.html#autofocus

  didInsertElement: function() {
    this._super();
    if (this.get('autofocus')) {
      Ember.run.schedule('actions', this, function() {
        this.$().focus();
      });
    }
  }
});

})();



(function() {
var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.TextSupport = Ember.Mixin.create({
  valueBinding: 'parentView.value',
  placeholderBinding: 'parentView.placeholder',
  disabledBinding: 'parentView.disabled',
  maxlengthBinding: 'parentView.maxlength',
  classNameBindings: 'parentView.inputClassNames',
  attributeBindings: ['name', 'readonly', 'placeholder'],

  name: Ember.computed(function() {
    return get(this, 'parentView.name') || get(this, 'parentView.label');
  }).property('parentView.name', 'parentView.label').cacheable(),

  didInsertElement: function() {
    this._super();
    Ember.run.schedule('actions', this, function() {
      //this.$().placeholder();
    });
  }
});

})();



(function() {
var get = Ember.get;
var Bootstrap = window.Bootstrap;

//requires Date Format http://stevenlevithan.com/assets/misc/date.format.js

Bootstrap.DatePicker = Ember.TextField.extend(Bootstrap.TextSupport, Bootstrap.FocusSupport, {
  format: 'dd-mm-yyyy',
  weekStart: 1,
  calendarWeeks: false,
  startDate: -Infinity,
  endDate: Infinity,
  daysOfWeekDisabled: [],
  autoclose: true,
  startView: 'month',
  minViewMode: 'days',
  todayBtn: false,
  todayHighlight: false,
  keyboardNavigation: true,
  language: 'nl',
  forceParse: true,
  //inputs: [],
  beforeShowDay: $.noop,

  _value: null,

  attributeBindings: ['name', 'type', /*'value',*/ 'readonly'],

  init: function() {
    this._super();
    this.get('attributeBindings').removeObject('value');
  },

  value: function (key, value) {
    var datepicker = (this.state === 'inDOM') && this.$() ? this.$().data('datepicker') : undefined;
    if (arguments.length === 1) { // getter
      //if (!Ember.isEmpty(datepicker)) {
      //  return new ISO8601Date(datepicker.getDate());
      //}
      return this.get('_value');
    } else { // setter
      if (!Ember.isEmpty(value)) {
        var date = null,
          format = this.get('format'),
          language = this.get('language')
        if (Ember.typeOf(value) === 'date' && !isNaN(value)) {
          date = value;
          if (!Ember.isEmpty(datepicker)) {
            datepicker.update(date);
          }
        } else if (Ember.typeOf(value) === 'string') {
          if (format.length === value.length) { //assume datepicker has set the date
            date = $.fn.datepicker.DPGlobal.parseDate(
              value,
              $.fn.datepicker.DPGlobal.parseFormat(format),
              language);
          } else if (value.match(/^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/)) {
            date = new ISO8601Date(value);
            if (!Ember.isEmpty(datepicker)) {
              datepicker.update(date);
            }
          }
        }
        if (Ember.typeOf(date) === 'date' && !isNaN(date)) {
          this.set('_value', date);
          return date;
        }
      }
      this.set('_value', null);
      if (!Ember.isEmpty(datepicker)) {
        //datepicker.update(''); //doesn't work
        if (!datepicker.isInput) {
          if (datepicker.component) {
            datepicker.element.find('input').val(null);
          }
        } else {
          datepicker.element.val(null);
        }
      }
      return null;
    }
  }.property(),

  didInsertElement: function () {
    this._super();
    var self = this;
    Ember.run.schedule('actions', this, function () {
      var value = this.get('_value');
      self.$().datepicker({
        format: self.get('format'),
        weekStart: self.get('weekStart'),
        startDate: self.get('startDate'),
        endDate: self.get('endDate'),
        daysOfWeekDisabled: self.get('daysOfWeekDisabled'),
        autoclose: self.get('autoclose'),
        startView: self.get('startView'),
        minViewMode: self.get('minViewMode'),
        todayBtn: self.get('todayBtn'),
        todayHighlight: self.get('todayHighlight'),
        keyboardNavigation: self.get('keyboardNavigation'),
        language: self.get('language'),
        forceParse: self.get('forceParse'),
        //inputs: self.get('inputs'),
        beforeShowDay: self.get('beforeShowDay')
      }).on('changeDate', function (ev) {
        //self.set('_value', ev.date);
      });
      if (!Ember.isEmpty(value)) {
        var datepicker = self.$().data('datepicker');
        datepicker.update(value);
      }
    });
  },

  willDestroyElement: function() {
    this._super();
    var picker = this.$().data('datepicker').picker;
    Ember.run.schedule('actions', this, function() {
      //cleanup
      picker.remove();
    });
  }
});

})();



(function() {
var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.TimePicker = Ember.View.extend({
  //template: 'dropdown',
  minuteStep: 1,
  showSeconds: false,
  secondStep: 15,
  defaultTime: 'value',
  showMeridian: false,
  showInputs: true,
  //disableFocus: false,
  //modalBackdrop: false,

  classNames: 'input-append bootstrap-timepicker-component',
  attributeBindings: ['name'],
  template: Ember.Handlebars.compile([
    '{{view view.inputField}}',
    '<span class="add-on">',
    '  <i class="icon-time"></i>',
    '</span>'].join("\n")),

  inputField: Ember.TextField.extend(/*Bootstrap.FocusSupport,*/ {
    classNames: 'timepicker-default',
    attributeBindings: ['name', 'type', 'value', 'readonly'],
    valueBinding: 'parentView.value',
    disabledBinding: 'parentView.disabled'
  }),

  didInsertElement: function() {
    this._super();
    var self = this;
    Ember.run.schedule('actions', this, function() {
      $(self.$().children()[0]).timepicker({
        //template: self.get('template'),
        minuteStep: self.get('minuteStep'),
        showSeconds: self.get('showSeconds'),
        secondStep: self.get('secondStep'),
        defaultTime: self.get('defaultTime'),
        showMeridian: self.get('showMeridian'),
        showInputs: self.get('showInputs')/*,
        disableFocus: self.get('disableFocus'),
        modalBackdrop: self.get('modalBackdrop')*/
      });
    });
  },

  willDestroyElement: function() {
    var widget = $(this.$().children()[0]).data('timepicker').$widget;
    Ember.run.schedule('actions', this, function() {
      //cleanup
      widget.remove();
    });
  }
});

})();



(function() {
var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.ColorPicker = Ember.View.extend({
  format: 'rgb',

  classNames: 'input-append color',
  attributeBindings: ['name', 'data-color', 'data-color-format'],
  template: Ember.Handlebars.compile([
    '{{view view.inputField}}',
    '<span class="add-on">',
    '  <i {{bindAttr style="view.iStyle"}}></i>',
    '</span>'].join("\n")),

  iStyle: function() {
    return 'background-color:' + this.get('value');
  }.property('value'),

  'data-colorBinding': 'value',

  inputField: Ember.TextField.extend(/*Bootstrap.FocusSupport,*/ {
    attributeBindings: ['name', 'type', 'value', 'readonly'],
    valueBinding: 'parentView.value',
    disabledBinding: 'parentView.disabled'
  }),

  didInsertElement: function() {
    var self = this;
    Ember.run.next(/*schedule('actions', this,*/ function() {
      self.$().colorpicker({format: self.get('format')});
    });
  },

  willDestroyElement: function() {
    var picker = this.$().data('colorpicker').picker;
    Ember.run.schedule('actions', this, function() {
      //cleanup
      picker.remove();
    });
  }
});


})();



(function() {
var Bootstrap = window.Bootstrap;

Bootstrap.Icon = Ember.View.extend({
    tagName: 'i',
    attributeBindings: ['style'],
    classNames: ['icon']
});

})();



(function() {
var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.TypeAhead = Ember.TextField.extend(Bootstrap.FocusSupport, {
  minLength: 1, //The max number of items to display in the dropdown.
  items: 8, //The minimum character length needed before triggering autocomplete suggestions

  url: '/autocomplete',
  labelProperty: 'label',
  idProperty: 'id',

  didInsertElement: function() {
    this._super();
    var self = this;
    Ember.run.schedule('actions', this, function() {
      var labels, mapped;
      self.$().typeahead({
        //https://github.com/twitter/bootstrap/pull/3682
        source: function (query, process) {
          if (self.source) {
            self.source(query, process);
          } else {
            self.getQueryPromise(query)
            .done(function (data) {
              labels = [];
              mapped = {};

              $.each(data, function (i, item) {
                var label = self.getLabel(item);
                mapped[label] = self.getId(item);
                labels.push(label);
              });

              process(labels);
            });
          }
        },
        updater: function (item) {
          return self.updater(mapped[item], item);
        },
        minLength: self.get('minLength'),
        items: self.get('items')
      });
      self.valueIdChanged();
    });
  },

  updater: function(id, label) {
    this.set('valueId', id);
    return label;
  },

  getLabel: function(item) {
    return Ember.get(item, this.get('labelProperty'));
  },

  getLabelById: function(id) {
    return id;
  },

  getId: function(item) {
    return Ember.get(item, this.get('idProperty'));
  },

  getQueryPromise: function (query) {
    return $.get(this.get('url'), { q: query });
  },

  valueIdChanged: function() {
    var id = this.get('valueId');
    var label = this.$().val();

    if (Ember.isEmpty(label) && !Ember.isEmpty(id)) {
      label = this.getLabelById(id);
      this.$()
        .val(label)
        .change();
    }
  }.observes('valueId')
});

})();



(function() {
var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.Wysihtml5 = Ember.TextArea.extend(Bootstrap.FocusSupport, {
  fontStyles: true,
  emphasis: true,
  lists: true,
  html: false,
  link: false,
  image: false,
  color: true,
  stylesheets: false,

  didInsertElement: function() {
        this._super();
        var self = this;
        Ember.run.schedule('actions', this, function() {
            self.$().wysihtml5({
        "font-styles": self.get('fontStyles'), //Font styling, e.g. h1, h2, etc. Default true
        "emphasis": self.get('emphasis'), //Italics, bold, etc. Default true
        "lists": self.get('lists'), //(Un)ordered lists, e.g. Bullets, Numbers. Default true
        "html": self.get('html'), //Button which allows you to edit the generated HTML. Default false
        "link": self.get('link'), //Button to insert a link. Default true
        "image": self.get('image'), //Button to insert an image. Default true
        "color": self.get('color'), //Button to change color of font
        "stylesheets": self.get('stylesheets'),
                "events": {
                    "change": function( ) {
                        var value = self.$().val();
                        self.set('value', value);
                    }
                }
            });
        });
    },

    valueChanged: function() {
      var value = this.get('value');
      //Ember.logger.log('Wysihtml: %s', value);
      //var wysihtml5Editor = this.$().wysihtml5().data("wysihtml5").editor;
      //var editorValue = wysihtml5Editor.getValue(); //DOESN'T WORK
      var iframes = this.get('parentView').$().find('iframe').contents().find('.wysihtml5-editor');
      var editorValue = iframes.html();

      if (!Ember.isEqual(value, editorValue)) {
        //wysihtml5Editor.setValue(value, true); //DOESN'T WORK
      iframes.html(value);
      }
    }.observes('value')
});

})();



(function() {
var Bootstrap = window.Bootstrap;

Bootstrap.ButtonGroup = Ember.CollectionView.extend({
  classNames: ['btn-group'],

  itemViewClass: Ember.View.extend({
    tagName: 'a',
    template: Ember.Handlebars.compile('{{view.content}}')
  })
});

})();



(function() {
var get = Ember.get, set = Ember.set;
var Bootstrap = window.Bootstrap;

Bootstrap.RadioButtonGroup = Bootstrap.ButtonGroup.extend({
  selection: null,

  init: function() {
    this._super();
    var content = get(this, 'content');
    if (content && get(this, 'allowsEmptySelection') === false) {
      set(this, 'selection', content.get('firstObject'));
    }
  },

  itemViewClass: Ember.View.extend(Bootstrap.ItemSelectionSupport, {
    classNames: 'btn',
    tagName: 'a',
    template: Ember.Handlebars.compile('{{view.title}}')
  })
});

Bootstrap.Radio = Ember.View.extend(Bootstrap.ItemViewTitleSupport, {
    classNames: ['radio'],
    tagName: 'label',
    attributeBindings: ['title'],

    init: function () {
        this._super();
        this.on("change", this, this._updateElementValue);
    },

    destroy: function() {
        this._super();
        this.off("change", this, this._updateElementValue);
    },

    _updateElementValue: function () {
        this.set('parentView.value', this.get('radioValue'));
    },

    checked: function () {
        return Ember.isEqual(this.get('parentView.value'), this.get('radioValue'));
    }.property('parentView.value', 'radioValue'),

    radioName: function () {
        return '%@_%@'.fmt(Ember.guidFor(this.get('parentView')), this.get('radioValue'));
    }.property('parentView', 'radioValue'),

    radioLabel: function() {
        var labelProp = this.get('parentView.itemLabelProperty');
        return this.get('content.%@'.fmt(labelProp));
    }.property('content', 'parentView.itemLabelProperty'),

    radioValue: function () {
        var valueProp = this.get('parentView.itemValueProperty');
        return this.get('content.%@'.fmt(valueProp));
    }.property('content', 'parentView.itemValueProperty'),

    template: Ember.Handlebars.compile('<input type="radio" {{bindAttr name="view.radioName" value="view.radioValue" checked="view.checked"}}> {{view.radioLabel}}')
});

//usage: {{view Bootstrap.RadiosGroup contentBinding="controller.questions" valueBinding="controller.checkedQuestionId"}}
Bootstrap.RadioGroup = Ember.CollectionView.extend({
    itemViewClass: Bootstrap.Radio,
    valueBinding: null,
    contentBinding: null,
    itemLabelProperty: 'description',
    itemValueProperty: 'id'
});


})();



(function() {
var get = Ember.get, set = Ember.set;
var Bootstrap = window.Bootstrap;

Bootstrap.InlineCheckbox = Ember.View.extend(Bootstrap.ItemViewTitleSupport, {
    classNames: ['checkbox inline'],
    tagName: 'label',
    attributeBindings: ['title'],

    init: function () {
        this._super();
        this.on("change", this, this._updateElementValue);
    },

    destroy: function () {
        this._super();
        this.off("change", this, this._updateElementValue);
    },

    _updateElementValue: function (evt) {
        if (evt.target.checked) {
            this.get('parentView.value').pushObject(this.get('radioValue'));
        } else {
            this.get('parentView.value').removeObject(this.get('radioValue'));
        }
    },

    checked: function () {
        return this.get('parentView.value').contains(this.get('radioValue'));
    }.property('parentView.value', 'radioValue'),

    radioLabel: function () {
        var labelProp = this.get('parentView.itemLabelProperty');
        return this.get('content.%@'.fmt(labelProp));
    }.property('content', 'parentView.itemLabelProperty'),

    radioValue: function () {
        var valueProp = this.get('parentView.itemValueProperty');
        return this.get('content.%@'.fmt(valueProp));
    }.property('content', 'parentView.itemValueProperty'),

    template: Ember.Handlebars.compile('<input type="checkbox" {{bindAttr value="view.radioValue" checked="view.checked"}}> {{view.radioLabel}}')
});

Bootstrap.CheckboxGroup = Ember.CollectionView.extend({
    itemViewClass: Bootstrap.InlineCheckbox,
    valueBinding: null,
    contentBinding: null,
    itemLabelProperty: 'description',
    itemValueProperty: 'id'
});

})();



(function() {
var Bootstrap = window.Bootstrap;
Bootstrap.SortingTableHeader = Ember.View.extend({
  tagName: 'th',

  template: Ember.Handlebars.compile('{{view.text}} <i {{bindAttr class="view.icon :noPrint"}}></i>'),

  classNames: ['pointerCursor'],

  sortableArrayBinding: 'controller', //default the controller //'bindingContext.content'

  icon: function () {
    var sortableArray = this.get('sortableArray');
    if (!Ember.isEmpty(sortableArray)) {
      var sortProps = sortableArray.get('sortProperties');
      if (Ember.isArray(sortProps) && sortProps.contains(this.get('property'))) {
        if (sortableArray.get('sortAscending')) {
          return 'icon-sort-up';
        } else {
          return 'icon-sort-down';
        }
      }
    }
    return 'icon-sort';
  } .property('sortableArray.sortProperties', 'sortableArray.sortAscending'),

  click: function (evt) {
    var sortableArray = this.get('sortableArray');
    var sortProps = sortableArray.get('sortProperties');
    if (Ember.isArray(sortProps) && sortProps.contains(this.get('property'))) {
      sortableArray.toggleProperty('sortAscending');
    }
    sortableArray.set('sortProperties', Ember.makeArray(this.get('property'))); //sortProperties triggers the sort
  }
});

})();



(function() {
var get = Ember.get;
var Bootstrap = window.Bootstrap;

Bootstrap.Tooltip = Ember.View.extend({
  tagName: 'a',
  attributeBindings: ['data-toggle', 'title', 'data-animation', 'data-html', 'data-placement', 'data-selector', 'data-trigger', 'data-title', 'data-trigger', 'data-delay', 'data-container'],

  'data-toggle': 'tooltip',
  'data-animation': true, //apply a css fade transition to the tooltip
  'data-html': false, //Insert html into the popover. If false, jquery's text method will be used to insert content into the dom. Use text if you're worried about XSS attacks.
  'data-placement': 'right', //how to position the popover - top | bottom | left | right
  'data-selector': false, //if a selector is provided, tooltip objects will be delegated to the specified targets
  'data-trigger': 'click', //how popover is triggered - click | hover | focus | manual
  'data-title': '', //default title value if `title` attribute isn't present
  'data-trigger': 'hover focus', //how tooltip is triggered - click | hover | focus | manual. Note you case pass trigger mutliple, space seperated, trigger types.
  'data-delay': 0, //delay showing and hiding the tooltip (ms) - does not apply to manual trigger type If a number is supplied, delay is applied to both hide/show Object structure is: delay: { show: 500, hide: 100 }
  'data-container': false, //Appends the tooltip to a specific element container: 'body'

  didInsertElement: function () {
    var self = this;
    Ember.run.schedule('actions', this, function () {
      self.$().tooltip();
    });
  },

  willDestroyElement: function () {
    this.$().tooltip('hide');
  }
});

})();



(function() {
window.Bootstrap.Forms = Ember.Namespace.create({

  human: function(value) {
    if (value === undefined || value === false)
      return;

    // Underscore string
    value = Ember.String.decamelize(value);
    // Replace all _ with spaces
    value = value.replace(/_/g, " ");
    // Capitalize the first letter of every word
    value = value.replace(/(^|\s)([a-z])/g, function(m,p1,p2){ return p1+p2.toUpperCase(); });
    return value;
  }
});

})();



(function() {
var Bootstrap = window.Bootstrap;

Bootstrap.Forms.Field = Ember.View.extend({
  tagName: 'div',
  classNames: ['control-group'],
  labelCache: undefined,
  help: undefined,
  template: Ember.Handlebars.compile([
    '{{#if view.label}}{{view view.labelView viewName="labelView"}}{{/if}}',
    '<div {{bindAttr class="view.label:controls view.iconSpanView:input-append"}}>',
    '  {{view view.inputField viewName="inputField"}}',
    '  {{view view.errorsView}}',
    '  {{view view.helpView}}',
    '</div>'].join("\n")),

  label: Ember.computed(function(key, value) {
    if(arguments.length === 1){
      if(this.get('labelCache') === undefined){
        var path = this.get('valueBinding._from');
        if (path) {
          path = path.split(".");
          return path[path.length - 1];
        }
      } else {
        return this.get('labelCache');
      }
    } else {
      this.set('labelCache', value);
      return value;
    }
  }).property(),

  labelView: Ember.View.extend({
    tagName: 'label',
    classNameBindings: ['parentView.labelFieldClassNames'],
    classNames: ['control-label'],
    template: Ember.Handlebars.compile('{{view.value}}'),

    value: Ember.computed(function(key, value) {
      var parent = this.get('parentView');

      if (value && value !== parent.get('label')) {
        parent.set('label', value);
      } else {
        value = parent.get('label');
      }

      // If the labelCache property is present on parent, then the
      // label was set manually, and there's no need to humanise it.
      // Otherwise, it comes from the binding and needs to be
      // humanised.
      return parent.get('labelCache') === undefined || parent.get('labelCache') === false ?
        Bootstrap.Forms.human(value) : value;
    }).property('parentView.label'),

    inputElementId: 'for',
    forBinding: 'inputElementId', //'parentView.name'
    attributeBindings: ['for']
  }),

  inputField: Ember.View.extend({
    classNames: ['ember-bootstrap-extend'],
    tagName: 'div',
    template: Ember.Handlebars.compile('') //'This class is not meant to be used directly, but extended.'
  }),

  valueChanged: function () {
    var binding = this.get('valueBinding._from'),
      fieldName = null,
      object = null;

    if (binding) {
      binding = binding.split(".");
      fieldName = binding[binding.length - 1];
      object = this.get(binding.slice(0, binding.length - 1).join('.'));
    } else {
      fieldName = this.get('label');
      object = this.get('context');
    }

    Ember.run.schedule('actions', this, function () { //so bindings are flushed
      var errors = Em.get(object, 'errors');
      if (!Ember.isEmpty(errors)) {
        errors.clear();
      }
      if (object != null && object.validate) {
        object.validate();
      }
    });
  }.observes('value'),

  errorsView: Ember.View.extend({
    tagName: 'div',
    classNames: ['errors', 'help-inline'],

    _updateContent: Ember.observer(function() {
      var parent = this.get('parentView');

      if (parent !== null) {
        var binding = parent.get('valueBinding._from');
        var fieldName = null;
        var object = null;

        if (binding) {
          binding = binding.replace("_parentView.", "").split(".");
          fieldName = binding[binding.length - 1];
          object = parent.get(binding.slice(0, binding.length-1).join('.'));
        } else {
          fieldName = parent.get('label');
          object = parent.get('context');
        }

        if (object && !object.get('isValid')) {
          //var errors = object.get('errors');
          var errors = object.get('errors.' + fieldName  + '.messages');

          //if (errors && fieldName in errors && !Ember.isEmpty(errors[fieldName])) {
          //    parent.$().addClass('error');
          //    this.$().html(errors[fieldName].join(', '));
          if (!Ember.isEmpty(errors)) {
            parent.$().addClass('error');
            this.$().html(errors.join(', '));
          } else {
            parent.$().removeClass('error');
            this.$().html('');
          }
        } else {
          parent.$().removeClass('error');
          this.$().html('');
        }
      }
    }, 'parentView.context.isValid', 'parentView.label', 'parentView.context.errors.length')
  }),

  helpView: Ember.View.extend({
    tagName: 'div',
    classNames: ['help-block'],
    template: Ember.Handlebars.compile('{{view.content}}'),
    contentBinding: 'parentView.help'
  }),

  didInsertElement: function() {
    this.set('labelView.inputElementId', this.get('inputField.elementId'));
  }
});

})();



(function() {
var Bootstrap = window.Bootstrap,
  get = Ember.get;

Bootstrap.Forms.Select = Bootstrap.Forms.Field.extend({
  optionLabelPath: 'content',
  optionValuePath: 'content',

  inputField: Ember.Select.extend(Bootstrap.FocusSupport, {
    contentBinding:         'parentView.content',

    optionLabelPathBinding: 'parentView.optionLabelPath',
    optionValuePathBinding: 'parentView.optionValuePath',

    valueBinding:           'parentView.value',
    selectionBinding:       'parentView.selection',
    promptBinding:          'parentView.prompt',
    multipleBinding:        'parentView.multiple',
    autofocusBinding:       'parentView.autofocus',
    disabledBinding:        'parentView.disabled',
    classNameBindings:      ['parentView.inputClassNames'],
    name: Ember.computed(function() {
      return this.get('parentView.name') || this.get('parentView.label');
    }).property('parentView.name', 'parentView.label')
  })
});

})();



(function() {
var Bootstrap = window.Bootstrap;

Bootstrap.StyleSupport = Ember.Mixin.create({
  attributeBindings: ['style']
});

})();



(function() {
var Bootstrap = window.Bootstrap;
Bootstrap.Forms.TextArea = Bootstrap.Forms.Field.extend({

  inputField: Ember.TextArea.extend(Bootstrap.TextSupport, Bootstrap.FocusSupport, Bootstrap.StyleSupport,{
    rowsBinding: 'parentView.rows',
    colsBinding: 'parentView.cols',
    autofocusBinding: 'parentView.autofocus',
    styleBinding: 'parentView.style'
  })
});

})();



(function() {
var Bootstrap = window.Bootstrap;
Bootstrap.Forms.TextField = Bootstrap.Forms.Field.extend({
  type: 'text',

  inputField: Ember.TextField.extend(Bootstrap.TextSupport, Bootstrap.FocusSupport, {
    typeBinding: 'parentView.type',
    sizeBinding: 'parentView.size',
    autofocusBinding: 'parentView.autofocus',
    classNameBindings: ['parentView.inputFieldClassNames'],

    insertNewline: function(event) {
      var parentView = this.get('parentView');
      if (parentView.insertNewline) {
        return parentView.insertNewline(event);
      }
    },

    cancel: function(event) {
      var parentView = this.get('parentView');
      if (parentView.cancel) {
        return parentView.cancel(event);
      }
    }
  })
});

})();



(function() {
var Bootstrap = window.Bootstrap;
Bootstrap.Forms.Checkbox = Bootstrap.Forms.Field.extend(Bootstrap.FocusSupport, {

  inputField: Ember.Checkbox.extend({
    attributeBindings: ['name', 'type', 'checked', 'disabled', 'tabindex'],
    checkedBinding:   'parentView.value',
    disabledBinding: 'parentView.disabled',
    autofocusBinding: 'parentView.autofocus',
    classNameBindings: ['parentView.inputFieldClassNames'],
    name: Ember.computed(function() {
      return this.get('parentView.name') || this.get('parentView.label');
    }).property('parentView.name', 'parentView.label')
  })
});

})();



(function() {
var Bootstrap = window.Bootstrap;

Bootstrap.Forms.DatePicker = Bootstrap.Forms.Field.extend({
  format: 'dd-mm-yyyy',
  weekStart: 1,
  calendarWeeks: false,
  startDate: -Infinity,
  endDate: Infinity,
  daysOfWeekDisabled: [],
  autoclose: true,
  startView: 'month',
  minViewMode: 'days',
  todayBtn: false,
  todayHighlight: false,
  keyboardNavigation: true,
  language: 'nl',
  forceParse: true,
  //inputs: [],
  beforeShowDay: $.noop,

  inputField: Bootstrap.DatePicker.extend({
    formatBinding: 'parentView.format',
    weekStartBinding: 'parentView.weekStart',
    calendarWeeksBinding: 'parentView.calendarWeeks',
    startDateBinding: 'parentView.startDate',
    endDateBinding: 'parentView.endDate',
    daysOfWeekDisabledBinding: 'parentView.daysOfWeekDisabled',
    formatBinding: 'parentView.format',
    autocloseBinding: 'parentView.autoclose',
    startViewBinding: 'parentView.startView',
    minViewModeBinding: 'parentView.minViewMode',
    todayBtnBinding: 'parentView.todayBtn',
    todayHighlightBinding: 'parentView.todayHighlight',
    keyboardNavigationBinding: 'parentView.keyboardNavigation',
    languageBinding: 'parentView.language',
    forceParseBinding: 'parentView.forceParse',
    inputsBinding: 'parentView.inputs',
    beforeShowDayBinding: 'parentView.beforeShowDay',

    disabledBinding: 'parentView.disabled',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    valueBinding: 'parentView.value',
    autofocusBinding: 'parentView.autofocus'
  })
});



})();



(function() {
var Bootstrap = window.Bootstrap;

Bootstrap.Forms.TimePicker = Bootstrap.Forms.Field.extend({
  //template: 'dropdown',
  minuteStep: 1,
  showSeconds: false,
  secondStep: 15,
  defaultTime: 'value',
  showMeridian: false,
  showInputs: true,
  //disableFocus: false,
  //modalBackdrop: false,

  inputField: Bootstrap.TimePicker.extend({
    //templateBinding: 'parentView.template',
    minuteStepBinding: 'parentView.minuteStep',
    showSecondsBinding: 'parentView.showSeconds',
    secondStepBinding: 'parentView.secondStep',
    defaultTimeBinding: 'parentView.defaultTime',
    showMeridianBinding: 'parentView.showMeridian',
    showInputsBinding: 'parentView.showInputs',
    //disableFocusBinding: 'parentView.disableFocus',
    //modalBackdropBinding: 'parentView.modalBackdrop',

    disabledBinding: 'parentView.disabled',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    valueBinding: 'parentView.value'
  })
});



})();



(function() {
var Bootstrap = window.Bootstrap;

Bootstrap.Forms.ColorPicker = Bootstrap.Forms.Field.extend({
  format: 'rgb',

  inputField: Bootstrap.ColorPicker.extend({
    formatBinding: 'parentView.format',

    disabledBinding: 'parentView.disabled',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    valueBinding: 'parentView.value'
  })
});



})();



(function() {
Bootstrap.Forms.Label = Bootstrap.Forms.Field.extend({

  inputField: Bootstrap.Label.extend({
    contentBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    attributeBindings: ['name']
  })
});

})();



(function() {
var Bootstrap = window.Bootstrap;

Bootstrap.Forms.TypeAhead = Bootstrap.Forms.Field.extend({
  minLength: 1, //The max number of items to display in the dropdown.
  items: 8, //The minimum character length needed before triggering autocomplete suggestions

  url: '/autocomplete',
  labelProperty: 'label',
  idProperty: 'id',

  inputField: Bootstrap.TypeAhead.extend(Bootstrap.StyleSupport, {
    minLengthBinding: 'parentView.minLengthBinding',
    itemsBinding: 'parentView.items',

    valueIdBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    classNameBindings: ['parentView.inputFieldClassNames'],
    attributeBindings: ['name'],
    autofocusBinding: 'parentView.autofocus',
    urlBinding: 'parentView.url',
    idPropertyBinding: 'parentView.idProperty',
    labelPropertyBinding: 'parentView.labelProperty',
    disabledBinding: 'parentView.disabled',
    styleBinding: 'parentView.style',

    updater: function(id, label) {
      var parent = this.get('parentView');
      if (parent.updater) {
        return parent.updater(id, label);
      } else {
        return this._super.apply(this, arguments);
      }
    },

    getLabel: function(item) {
      var parent = this.get('parentView');
      if (!Ember.isEmpty(parent) && parent.getLabel) {
        return parent.getLabel(item);
      } else {
        return this._super.apply(this, arguments);
      }
    },

    getLabelById: function(id) {
      var parent = this.get('parentView');
      if (!Ember.isEmpty(parent) && parent.getLabelById) {
        return parent.getLabelById(id);
      } else {
        return this._super.apply(this, arguments);
      }
    },

    getId: function(item) {
      var parent = this.get('parentView');
      if (!Ember.isEmpty(parent) && parent.getId) {
        return parent.getId(item);
      } else {
        return this._super.apply(this, arguments);
      }
    },

    getQueryPromise: function (query) {
      var parent = this.get('parentView');
      if (!Ember.isEmpty(parent) && parent.getQueryPromise) {
        return parent.getQueryPromise(query);
      } else {
        return this._super.apply(this, arguments);
      }
    }
  })
});

})();



(function() {
var Bootstrap = window.Bootstrap;

Bootstrap.Forms.Wysihtml5 = Bootstrap.Forms.Field.extend({
  fontStyles: true,
  emphasis: true,
  lists: true,
  html: false,
  link: false,
  image: false,
  color: true,
  stylesheets: false,

  inputField: Bootstrap.Wysihtml5.extend({
    valueBinding: 'parentView.value',
    nameBinding: 'parentView.label',
    styleBinding: 'parentView.style',
    classNameBindings: ['parentView.inputFieldClassNames'],
    attributeBindings: ['name', 'style'],
    autofocusBinding: 'parentView.autofocus',
    disabledBinding: 'parentView.disabled',

    fontStylesBinding: 'parentView.fontStyles',
    emphasisBinding: 'parentView.emphasis',
    listsBinding: 'parentView.lists',
    htmlBinding: 'parentView.html',
    linkBinding: 'parentView.link',
    imageBinding: 'parentView.image',
    colorBinding: 'parentView.color',
    stylesheetsBinding: 'parentView.stylesheets'
  })
});

})();



(function() {
var Bootstrap = window.Bootstrap;
Bootstrap.Forms.UneditableInput = Bootstrap.Forms.Field.extend({

  inputField: Ember.View.extend({
    tagName: 'span',
    classNames: ['uneditable-input'],
    attributeBindings: ['name'],
    template: Ember.Handlebars.compile('{{view.value}}'),

    valueBinding:   'parentView.value',
    classNameBindings: ['parentView.inputClassNames'],
    name: Ember.computed(function() {
      return this.get('parentView.name') || this.get('parentView.label');
    }).property('parentView.name', 'parentView.label')
  })
});
})();



(function() {

})();

