
App.Event = DS.Model.extend({
  eventName: DS.belongsTo('App.EventName'),
  eventDetail: DS.belongsTo('App.EventDetail'),
  worldName: DS.belongsTo('App.WorldName'),
  mapName: DS.belongsTo('App.MapName'),

  state: DS.attr('string')
});
