
App.Sector = DS.Model.extend({
  mapDetail: DS.belongsTo('App.MapDetail', {inverse: 'sectors'}),

  coord: DS.attr('raw'),
  level: DS.attr('number'),
  name: DS.attr('string')
});
