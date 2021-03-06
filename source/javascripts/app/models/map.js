
App.Map = DS.Model.extend({

  continent_id: DS.attr('number'),
  continent_name: DS.attr('string'),
  continent_rect: DS.attr('raw'),
  default_floor: DS.attr('number'),
  floors: DS.attr('raw'),
  map_name: DS.attr('string'),
  map_rect: DS.attr('raw'),
  max_level: DS.attr('number'),
  min_level: DS.attr('number'),
  region_id: DS.attr('number'),
  region_name: DS.attr('string'),
  skill_challenges: DS.attr('raw')

});

// {
//   "maps": {
//     "34": {
//       "map_name": "Caledon Forest",
//       "min_level": 1,
//       "max_level": 15,
//       "default_floor": 1,
//       "floors": [
//         0,
//         1,
//         2
//       ],
//       "region_id": 5,
//       "region_name": "Tarnished Coast",
//       "continent_id": 1,
//       "continent_name": "Tyria",
//       "map_rect": [
//         [
//           -21504,
//           -46080
//         ],
//         [
//           24576,
//           49152
//         ]
//       ],
//       "continent_rect": [
//         [
//           9344,
//           16128
//         ],
//         [
//           11264,
//           20096
//         ]
//       ]
//     }
//   }
// }
