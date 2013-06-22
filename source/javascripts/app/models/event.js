
// {"world_id":1001,"map_id":51,"event_id":"45B84A62-BE33-4371-B9FB-CC8490528276","state":"Inactive"},

App.Event = DS.Model.extend({
  eventName: DS.belongsTo('App.EventName'),
  worldName: DS.belongsTo('App.WorldName'),
  mapName: DS.belongsTo('App.MapName'),

  state: DS.attr('string')
});
