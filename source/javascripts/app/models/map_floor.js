
App.MapFloor = DS.Model.extend({

  clamped_view: DS.attr('raw'),
  continent_id: DS.attr('string'),
  floor_id: DS.attr('string'),
  regionData: DS.attr('raw'),
  texture_dims: DS.attr('raw'),

  init: function() {
    this._super();
    this.set('regions', []);
    this.set('maps', []);
    this.set('pointsOfInterest', []);
    this.set('tasks', []);
    this.set('sectors', []);
    this.set('skillChallenges', []);
  },

  didLoad: function(){
    this.parseRegionData();
  },

  parseRegionData: function() {
    var regionData = this.get('regionData');
    var regions = [];
    var maps = [];
    var pointsOfInterest = [];
    var tasks = [];
    var sectors = [];
    var skillChallenges = [];

    Ember.keys(regionData).forEach(function(regionKey) {
      var region = regionData[regionKey];
      region.id = parseInt(regionKey, 10);
      regions.push(region);

      Ember.keys(region.maps).forEach(function(mapKey) {
        var map = region.maps[mapKey];
        map.id = parseInt(mapKey, 10);
        map.region_id = region.id;
        maps.push(map);

        if (map.points_of_interest) {
          map.points_of_interest.forEach(function(poi) {
            poi.id = poi.poi_id;
            delete poi.poi_id;
            poi.region_id = region.id;
            poi.map_id = map.id;
            pointsOfInterest.push(poi);
          });
        }

        if (map.tasks) {
          map.tasks.forEach(function(task) {
            task.id = task.task_id;
            delete task.task_id;
            task.region_id = region.id;
            task.map_id = map.id;
            tasks.push(task);
          });
        }

        if (map.sectors) {
          map.sectors.forEach(function(sector) {
            sector.id = sector.sector_id;
            delete sector.sector_id;
            sector.region_id = region.id;
            sector.map_id = map.id;
            sectors.push(sector);
          });
        }

        if (map.skill_challenges) {
          map.skill_challenges.forEach(function(skillChallenge) {
            skillChallenge.region_id = region.id;
            skillChallenge.map_id = map.id;
            skillChallenges.push(skillChallenge);
          });
        }

      });
    });

    this.set('regions', regions);
    this.set('maps', maps);
    this.set('pointsOfInterest', pointsOfInterest);
    this.set('tasks', tasks);
    this.set('sectors', sectors);
    this.set('skillChallenges', skillChallenges);
  }

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
