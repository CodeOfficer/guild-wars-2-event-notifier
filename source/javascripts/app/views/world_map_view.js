// // map within the worldmap with poi given - especially for wiki purposes - try this in a small container
// gw2map({map_container:"map1", language:1, region_id:4, map_id:50, poi_id:1057, poi_type:1, width:250, height: 250, disable_controls:1});
// // single floor outside the worldmap
// gw2map({map_container:"map2", floor_id:-2, region_id:2, map_id:33});
// // map within the worldmap
// gw2map({map_container:"map3", language:4, region_id:1, map_id:26});
// // specific floor within a region
// gw2map({map_container:"map4", language:3, continent_id:2, floor_id:3});
// // full world map
// gw2map({map_container:"map5", width:100, w_percent:1, height:600});


// http://jsfiddle.net/cliff/CRRGC/

// TODO move this somewhere
// L.Icon.Default.imagePath = 'stylesheets/app/leaflet-markers';

App.WorldMapView = Ember.View.extend({

  // Required parameters:
  // continent_id: null,
  // floor_id: null,

  // region_id: null,
  // map_id: null,

  // continent, map, [event, poi, etc]

  template: Ember.Handlebars.compile('<div id="map-{{unbound view.elementId}}" class="map"></div>'),

  continent_id: function() {
    var map = this.get('map');
    return map.get('continent_id');
  }.property('map.continent_id'),

  floor_id: function() {
    var map = this.get('map');
    return map.get('default_floor');
  }.property('map.default_floor'),

  minZoom: function(){
    return 0;
  }.property(),

  maxZoom: function(){
    return 7;
  }.property(),

  bounds: function() {
    var map = this.get('map');
    var mapFloor = this.get('mapFloor');
    var mapObject = this.get('mapObject');
    var topLeft, bottomRight, bounds, padding;

    if (mapFloor.get('clamped_view')) {
      bounds = mapFloor.get('clamped_view');
      padding = 0.2;
    } else if (map) {
      bounds = map.get('continent_rect');
      padding = 0.2;
    } else {
      bounds = mapFloor.get('texture_dims');
      padding = 0.1;
    }

    topLeft = mapObject.unproject(bounds[0], mapObject.getMaxZoom());
    bottomRight = mapObject.unproject(bounds[1], mapObject.getMaxZoom());

    return L.latLngBounds(topLeft, bottomRight).pad(padding);
  }.property('mapObject', 'map.continent_rect', 'mapFloor.clamped_view', 'mapFloor.texture_dims'),

  mapObject: function() {
    return L.map('map-' + this.get('elementId'), {
      minZoom: this.get('minZoom'),
      maxZoom: this.get('maxZoom'),
      crs: L.CRS.Simple
    }).setView([0, 0], 0);
  }.property('elementId', 'minZoom', 'maxZoom'),

  baseLayer: function() {
    return L.tileLayer('https://tiles.guildwars2.com/{continent_id}/{floor_id}/{z}/{x}/{y}.jpg', {
      // continuousWorld: true,
      continent_id: this.get('continent_id'),
      floor_id: this.get('floor_id'),
      minZoom : this.get('minZoom'),
      maxZoom: this.get('maxZoom')
    });
  }.property('continent_id', 'floor_id', 'minZoom', 'maxZoom'),

  layers: function() {
    return {
      'sectors': this.get('sectors'),
      'tasks': this.get('tasks'),
      'skill challenges': this.get('skillChallenges'),
      'points of interest': this.get('pointsOfInterest')
    }
  }.property('pointsOfInterest', 'skillChallenges', 'sectors', 'tasks'),

  sectors: function() {
    var self = this;
    var sectors =[];
    var records = this.get('mapFloor.sectors');

    if (this.get('map.id')) {
      records = records.filterProperty('map_id', this.get('map.id'));
    }

    records.forEach(function(sector) {
      var html = '<div><em>' + sector.name + '</em></div>';

      if (sector.level > 0) {
        html += '<div><em>(' + sector.level + ')</em></div>';
      }

      var mark = self.markerFor(sector.coord, {
        clickable: false,
        opacity: 0.7,
        zIndexOffset: -1000,
        icon: L.divIcon({
            html: html,
            iconSize: [200, 32]
        })
      });

      sectors.push(mark);
    });

    return L.layerGroup(sectors);
  }.property('mapFloor.sectors', 'map.id'),


  tasks: function() {
    var self = this;
    var tasks =[]
    var records = this.get('mapFloor.tasks');

    if (this.get('map.id')) {
      records = records.filterProperty('map_id', this.get('map.id'));
    }

    records.forEach(function(task) {
      var mark = self.markerFor(task.coord, {
        title: task.objective,
        icon: L.icon({
            iconUrl: 'images/leaflet-markers/task.png',
            shadowUrl: 'images/leaflet-markers/task.png',
            iconSize: [20, 20], // size of the icon
            shadowSize: [20, 20], // size of the shadow
            iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
            shadowAnchor: [10, 10],  // the same for the shadow
            popupAnchor: [-1, -1] // point from which the popup should open relative to the iconAnchor
        })
      });
      tasks.push(mark);
    });

    return L.layerGroup(tasks);
  }.property('mapFloor.tasks', 'map.id'),

  skillChallenges: function() {
    var self = this;
    var skillChallenges =[]
    var records = this.get('mapFloor.skillChallenges');

    if (this.get('map.id')) {
      records = records.filterProperty('map_id', this.get('map.id'));
    }

    records.forEach(function(skillChallenge) {
      var mark = self.markerFor(skillChallenge.coord, {
        title: 'Skill Challenge',
        icon: L.icon({
            iconUrl: 'images/leaflet-markers/skillchallenge.png',
            shadowUrl: 'images/leaflet-markers/skillchallenge.png',
            iconSize: [20, 20], // size of the icon
            shadowSize: [20, 20], // size of the shadow
            iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
            shadowAnchor: [10, 10],  // the same for the shadow
            popupAnchor: [-1, -1] // point from which the popup should open relative to the iconAnchor
        })
      });
      skillChallenges.push(mark);
    });

    return L.layerGroup(skillChallenges);
  }.property('mapFloor.skillChallenges', 'map.id'),

  pointsOfInterest: function() {
    var self = this;
    var pointsOfInterest =[]
    var records = this.get('mapFloor.pointsOfInterest');

    if (this.get('map.id')) {
      records = records.filterProperty('map_id', this.get('map.id'));
    }

    records.forEach(function(poi) {
      var type;

      if (poi.type === 'landmark') {
        type = 'pointofinterest';
      } else if (poi.type === 'unlock') {
        type = 'dungeon';
      } else {
        type = poi.type;
      }

      var mark = self.markerFor(poi.coord, {
        title: poi.name,
        icon: L.icon({
            iconUrl: 'images/leaflet-markers/%@.png'.fmt(type),
            shadowUrl: 'images/leaflet-markers/%@.png'.fmt(type),
            iconSize: [20, 20], // size of the icon
            shadowSize: [20, 20], // size of the shadow
            iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
            shadowAnchor: [10, 10],  // the same for the shadow
            popupAnchor: [-1, -1] // point from which the popup should open relative to the iconAnchor
        })
      });
      pointsOfInterest.push(mark);
    });

    return L.layerGroup(pointsOfInterest);
  }.property('mapFloor.pointsOfInterest', 'map.id'),

  markerFor: function(coordinates, markerOptions) {
    var mapObject = this.get('mapObject');

    return L.marker(mapObject.unproject(coordinates, this.get('maxZoom')), markerOptions);
  },

  didInsertElement: function() {
    var mapObject = this.get('mapObject');
    var mapFloor = this.get('mapFloor');
    var bounds = this.get('bounds');
    var baseLayer = this.get('baseLayer');
    var layers = this.get('layers');
    var sectors = this.get('sectors');
    var skillChallenges = this.get('skillChallenges');
    var pointsOfInterest = this.get('pointsOfInterest');
    var tasks = this.get('tasks');

    mapObject.setMaxBounds(bounds).fitBounds(bounds);
    baseLayer.addTo(mapObject);
    mapObject.addLayer(sectors);
    mapObject.addLayer(skillChallenges);
    mapObject.addLayer(pointsOfInterest);
    mapObject.addLayer(tasks);
    L.control.layers(null, layers).addTo(mapObject);
  },

  willDestroyElement: function() {

  }

});
