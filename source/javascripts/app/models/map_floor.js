
App.MapFloor = DS.Model.extend({
  clamped_view: DS.attr('raw'),
  continent_id: DS.attr('string'),
  floor_id: DS.attr('string'),
  regionData: DS.attr('raw'),
  texture_dims: DS.attr('raw'),

  didLoad: function(){
    debugger
    // this.parseRegionData();
  },

  // init: function() {
  //   this._super(arguments);
  //   debugger
  // },

  regions: function() {
    var regionData = this.get('regionData');
    var regions = [];

    Ember.keys(regionData).forEach(function(key) {
      var region = regionData[key];
      region.id = key;
      regions.push(region);
    });

    return regions;
  }.property('regionData'),

  maps: function() {
    var regions = this.get('regions');
    var maps = [];

    regions.forEach(function(region) {

      Ember.keys(region.maps).forEach(function(key) {
        var map = region.maps[key];
        map.id = key;
        map.region_id = region.id;
        maps.push(map);
      });

      region.maps.forEach(function(map) {
        map.region_id = regions.id;
        maps.push(map);
      });

      var region = regionData[key];
      region.id = key;
      regions.push(region);
    });

    return maps;
  }.property('regions')

});

// Required parameters:
// continent_id
// floor

// Optional parameter:
// lang

// {
//   "texture_dims": [
//     32768,
//     32768
//   ],
//   "regions": {
//     "1": {
//       "name": "Shiverpeak Mountains",
//       "label_coord": [
//         19840,
//         13568
//       ],
//       "maps": {
//         "26": {
//           "name": "Dredgehaunt Cliffs",
//           "min_level": 40,
//           "max_level": 50,
//           "default_floor": 1,
//           "map_rect": [
//             [
//               -27648,
//               -36864
//             ],
//             [
//               27648,
//               39936
//             ]
//           ],
//           "continent_rect": [
//             [
//               19456,
//               14976
//             ],
//             [
//               21760,
//               18176
//             ]
//           ],
//           "points_of_interest": [
//             {
//               "poi_id": 1486,
//               "name": "Falooaloo",
//               "type": "landmark",
//               "floor": 1,
//               "coord": [
//                 19760.9,
//                 15379.5
//               ]
//             }
//           ],
//           "tasks": [
//             {
//               "task_id": 7,
//               "objective": "Help Explorer Brokkar sabotage dredge munitions.",
//               "level": 49,
//               "coord": [
//                 20414.9,
//                 17761.3
//               ]
//             }
//           ],
//           "skill_challenges": [
//             {
//               "coord": [
//                 20381.6,
//                 16613.8
//               ]
//             }
//           ],
//           "sectors": [
//             {
//               "sector_id": 532,
//               "name": "Wyrmblood Lake",
//               "level": 42,
//               "coord": [
//                 19660.9,
//                 15333.9
//               ]
//             }
//           ]
//         }
//       }
//     }
//   }
// }
