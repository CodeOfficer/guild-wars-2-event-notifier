
App.EventDetail = DS.Model.extend({
  event: DS.belongsTo('App.Event'),
  map: DS.belongsTo('App.Map'),

  name: DS.attr('string'),
  level: DS.attr('number'),
  flags: DS.attr('raw'),
  location: DS.attr('raw')
});

// {
//   "events": {
//     "15141AB4-6090-41C0-A43A-9B339336B021": {
//       "name": "Help the Wyld Hunt valiants clear undead from Treemarch Estuary.",
//       "level": 14,
//       "map_id": 34,
//       "flags": [],
//       "location": {
//         "type": "sphere",
//         "center": [
//           7525,
//           33757.5,
//           -367.797
//         ],
//         "radius": 1863,
//         "rotation": 0
//       }
//     }
//   }
// }
