
App.Event = DS.Model.extend({

  eventName: DS.belongsTo('event_name'),
  eventDetail: DS.belongsTo('event_detail', {async: true}),
  worldName: DS.belongsTo('world_name'),
  mapName: DS.belongsTo('map_name'),
  map: DS.belongsTo('map', {async: true}),

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
