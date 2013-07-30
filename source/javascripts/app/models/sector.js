
App.Sector = DS.Model.extend({
  name: DS.attr('string'),
  level: DS.attr('number'),
  coord: DS.attr('raw')
});
