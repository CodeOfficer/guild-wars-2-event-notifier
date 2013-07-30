
App.Task = DS.Model.extend({
  objective: DS.attr('string'),
  level: DS.attr('number'),
  coord: DS.attr('raw')
});
