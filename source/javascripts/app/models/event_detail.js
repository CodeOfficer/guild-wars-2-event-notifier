
App.EventDetail = DS.Model.extend({
  event: DS.belongsTo('App.Event'),

  name: DS.attr('string'),
  level: DS.attr('number')
});
