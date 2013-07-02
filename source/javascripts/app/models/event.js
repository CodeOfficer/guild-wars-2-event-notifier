
App.Event = DS.Model.extend({
  eventName: DS.belongsTo('App.EventName'),
  worldName: DS.belongsTo('App.WorldName'),
  mapName: DS.belongsTo('App.MapName'),

  state: DS.attr('string')
});
