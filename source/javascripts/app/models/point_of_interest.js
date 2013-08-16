
App.PointOfInterest = DS.Model.extend({
  mapDetail: DS.belongsTo('App.MapDetail', {inverse: 'points_of_interest'}),

  coord: DS.attr('raw'),
  floor: DS.attr('number'),
  name: DS.attr('string'),
  type: DS.attr('string')
});
