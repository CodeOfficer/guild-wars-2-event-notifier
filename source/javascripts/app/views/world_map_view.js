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
      console.log('•• [clamped_view]');
      bounds = mapFloor.get('clamped_view');
      padding = 0.2;
    } else if (map) {
      console.log('[map]');
      bounds = map.get('continent_rect');
      padding = 0.2;
    } else {
      console.log('[else]');
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
      'skill challenges': this.get('skillChallenges'),
      'points of interest': this.get('pointsOfInterest')
    }
  }.property('pointsOfInterest', 'skillChallenges', 'sectors'),

  sectors: function() {
    var self = this;
    var sectors =[]

    this.get('mapFloor.regions').forEach(function(region) {
      var mapDetails = region.get('mapDetails');

      mapDetails.forEach(function(mapDetail) {
        mapDetail.get('sectors').forEach(function(sector) {
          var html = '<div><em>' + sector.get('name') + '</em></div>';

          if (sector.get('level') > 0) {
            html += '<div><em>(' + sector.get('level') + ')</em></div>';
          }

          var mark = self.markerFor(sector.get('coord'), {
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
      });
    });

    return L.layerGroup(sectors);
  }.property('sectors'),

  skillChallenges: function() {
    var self = this;
    var skillChallenges =[]

    this.get('mapFloor.regions').forEach(function(region) {
      var mapDetails = region.get('mapDetails');

      mapDetails.forEach(function(mapDetail) {
        mapDetail.get('skill_challenges').forEach(function(skillChallenge) {
          var mark = self.markerFor(skillChallenge.coord, {
            title: 'Skill Challenge',
            icon: L.icon({
                iconUrl: 'images/leaflet-markers/skillchallenge.png',
                shadowUrl: 'images/leaflet-markers/skillchallenge.png',
                iconSize:     [20, 20], // size of the icon
                shadowSize:   [20, 20], // size of the shadow
                iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
                shadowAnchor: [10, 10],  // the same for the shadow
                popupAnchor:  [-1, -1] // point from which the popup should open relative to the iconAnchor
            })
          });

          skillChallenges.push(mark);
        });
      });
    });

    return L.layerGroup(skillChallenges);
  }.property('mapFloor'),

  pointsOfInterest: function() {
    var self = this;
    var pointsOfInterest =[]

    this.get('mapFloor.regions').forEach(function(region) {
      var mapDetails = region.get('mapDetails');

      mapDetails.forEach(function(mapDetail) {
        mapDetail.get('points_of_interest').forEach(function(poi) {
          var type;

          if (poi.get('type') === 'landmark') {
            type = 'pointofinterest';
          } else if (poi.get('type') === 'unlock') {
            type = 'dungeon';
          } else {
            type = poi.get('type');
          }

          var mark = self.markerFor(poi.get('coord'), {
            title: poi.get('name'),
            icon: L.icon({
                iconUrl: 'images/leaflet-markers/%@.png'.fmt(type),
                shadowUrl: 'images/leaflet-markers/%@.png'.fmt(type),
                iconSize:     [20, 20], // size of the icon
                shadowSize:   [20, 20], // size of the shadow
                iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
                shadowAnchor: [10, 10],  // the same for the shadow
                popupAnchor:  [-1, -1] // point from which the popup should open relative to the iconAnchor
            })
          });

          if (poi.get('name')) {
            mark.bindPopup(poi.get('name'));
          }

          pointsOfInterest.push(mark);
        });
      });
    });

    return L.layerGroup(pointsOfInterest);
  }.property('mapFloor'),

  markerFor: function(coordinates, markerOptions) {
    var mapObject = this.get('mapObject');

    return L.marker(mapObject.unproject(coordinates, this.get('maxZoom')), markerOptions);
  },

  didInsertElement: function() {
    var self = window.self = this;

    var mapObject = this.get('mapObject');
    var mapFloor = this.get('mapFloor');
    var bounds = this.get('bounds');
    var baseLayer = this.get('baseLayer');
    var layers = this.get('layers');
    var sectors = this.get('sectors');
    var skillChallenges = this.get('skillChallenges');
    var pointsOfInterest = this.get('pointsOfInterest');

    mapObject.setMaxBounds(bounds).fitBounds(bounds);
    baseLayer.addTo(mapObject);
    mapObject.addLayer(sectors);
    mapObject.addLayer(skillChallenges);
    mapObject.addLayer(pointsOfInterest);
    L.control.layers(null, layers).addTo(mapObject);
  },

  willDestroyElement: function() {

  }

});
