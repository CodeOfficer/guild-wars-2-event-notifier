
App.EventName = DS.Model.extend({
  event: DS.belongsTo('App.Event'),

  name: DS.attr('string')
});
