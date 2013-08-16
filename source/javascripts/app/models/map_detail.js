
App.MapDetail = DS.Model.extend({
  points_of_interest: DS.hasMany('App.PointOfInterest'),
  sectors: DS.hasMany('App.Sector'),
  tasks: DS.hasMany('App.Task'),

  continent_rect: DS.attr('raw'),
  default_floor: DS.attr('number'),
  map_rect: DS.attr('raw'),
  max_level: DS.attr('number'),
  min_level: DS.attr('number'),
  name: DS.attr('string'),
  skill_challenges: DS.attr('raw')
});

// {
//   "maps": {
//     "26": {
//       "name": "Dredgehaunt Cliffs",
//       "min_level": 40,
//       "max_level": 50,
//       "default_floor": 1,
//       "map_rect": [
//         [
//           -27648,
//           -36864
//         ],
//         [
//           27648,
//           39936
//         ]
//       ],
//       "continent_rect": [
//         [
//           19456,
//           14976
//         ],
//         [
//           21760,
//           18176
//         ]
//       ],
//       "points_of_interest": [
//         {
//           "poi_id": 1486,
//           "name": "Falooaloo",
//           "type": "landmark",
//           "floor": 1,
//           "coord": [
//             19760.9,
//             15379.5
//           ]
//         }
//       ],
//       "tasks": [
//         {
//           "task_id": 7,
//           "objective": "Help Explorer Brokkar sabotage dredge munitions.",
//           "level": 49,
//           "coord": [
//             20414.9,
//             17761.3
//           ]
//         }
//       ],
//       "skill_challenges": [
//         {
//           "coord": [
//             20381.6,
//             16613.8
//           ]
//         }
//       ],
//       "sectors": [
//         {
//           "sector_id": 532,
//           "name": "Wyrmblood Lake",
//           "level": 42,
//           "coord": [
//             19660.9,
//             15333.9
//           ]
//         }
//       ]
//     }
//   }
// }
