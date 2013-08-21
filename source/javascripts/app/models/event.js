
App.Event = DS.Model.extend({

  eventName: DS.belongsTo('App.EventName'),
  eventDetail: DS.belongsTo('App.EventDetail'),
  worldName: DS.belongsTo('App.WorldName'),
  mapName: DS.belongsTo('App.MapName'),
  map: DS.belongsTo('App.Map'),

  state: DS.attr('string')

});

// we give Event a compisite primary key in the form of:
// world_id.map_id.event_id

// {
//   "events": [
//     {
//       "world_id": 1012,
//       "map_id": 34,
//       "event_id": "15141AB4-6090-41C0-A43A-9B339336B021",
//       "state": "Active"
//     }
//   ]
// }
