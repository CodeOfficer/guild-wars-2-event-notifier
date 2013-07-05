
App.SettingsIndexController = Ember.ObjectController.extend({

  needs: ['settings'],

  // this needs to be here or ember tries to set 'breadcrumbs' on the
  // proxy's object, and not on the object proxy.
  breadcrumbs: null,

  breadcrumbsBinding: 'controllers.settings.breadcrumbs',

  // saveRecord: function(){
  //   var content = this.get('content');

  //   content.set('region', this.selectedRegion);
  //   content.set('region', this.selectedInterval);
  //   content.save();
  // },

  regions: function() {
    return Ember.A([
      Ember.Object.create({id: 'NA', description: 'North America'}),
      Ember.Object.create({id: 'EU', description: 'Europe'})
    ]);
  }.property(),

  selectedRegion: function() {
    return this.get('content.region');
  }.property('content.region'),

  intervals: function() {
    return Ember.A([
      Ember.Object.create({id: 1, description: '1 Minute'}),
      Ember.Object.create({id: 2, description: '2 MInutes'}),
      Ember.Object.create({id: 3, description: '3 MInutes'}),
      Ember.Object.create({id: 4, description: '4 MInutes'}),
      Ember.Object.create({id: 5, description: '5 MInutes'}),
      Ember.Object.create({id: 6, description: '6 MInutes'}),
      Ember.Object.create({id: 7, description: '7 MInutes'}),
      Ember.Object.create({id: 8, description: '8 MInutes'}),
      Ember.Object.create({id: 9, description: '9 MInutes'}),
      Ember.Object.create({id: 10, description: '10 MInutes'}),
    ]);
  }.property(),

  selectedInterval: function() {
    return this.get('content.interval');
  }.property('content.interval'),

});
