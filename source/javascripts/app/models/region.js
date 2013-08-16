
App.Region = DS.Model.extend({
  mapDetails: DS.hasMany('App.MapDetail'),
  mapFloor: DS.belongsTo('App.MapFloor', {inverse: 'regions'}),

  label_coord: DS.attr('raw'),
  name: DS.attr('string')
});
