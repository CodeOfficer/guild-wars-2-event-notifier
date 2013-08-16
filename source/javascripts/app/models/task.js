
App.Task = DS.Model.extend({
  mapDetail: DS.belongsTo('App.MapDetail', {inverse: 'tasks'}),

  coord: DS.attr('raw'),
  level: DS.attr('number'),
  objective: DS.attr('string')
});
