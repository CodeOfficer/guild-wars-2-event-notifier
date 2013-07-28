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


  tilesUrl: 'https://tiles.guildwars2.com/{continent_id}/{floor_id}/{z}/{x}/{y}.jpg',

  template: Ember.Handlebars.compile('<div id="map"></div>'),

  northEast: function() {
    var mapObject = this.get('mapObject');
    return mapObject.unproject([32768, 0], mapObject.getMaxZoom());
  }.property('mapObject'),

  southWest: function() {
    var mapObject = this.get('mapObject');
    return mapObject.unproject([0, 32768], mapObject.getMaxZoom());
  }.property('mapObject'),

  mapObject: function() {
    return new L.map('map', {
      minZoom: 0,
      maxZoom: 7,
      crs: L.CRS.Simple,
      layers: []
    }).setView([0, 0], 0);
  }.property(),

  didInsertElement: function() {
    var mapObject = window.mapObject = this.get('mapObject');
    var tilesUrl = this.get('tilesUrl');
    var continent_id = this.get('continent_id');
    var floor_id = this.get('floor_id');

    var bounds = new L.latLngBounds(this.get('southWest'), this.get('northEast'));

    mapObject.setMaxBounds(bounds).fitBounds(bounds);
    // mapObject.setMaxBounds(bounds);

    var layer = new L.tileLayer(tilesUrl, {
      // continuousWorld: true,
      continent_id: continent_id,
      floor_id: floor_id,
      minZoom : 0,
      maxZoom: 7
    }).addTo(mapObject);

    var mapFloorUrl = "https://api.guildwars2.com/v1/map_floor.json?continent_id=%@&floor=%@".fmt(continent_id, floor_id);

    $.getJSON(mapFloorUrl, function (data) {
        var region, gameMap, i, il, poi;

        for (region in data.regions) {
            region = data.regions[region];

            for (gameMap in region.maps) {
                gameMap = region.maps[gameMap];

                for (i = 0, il = gameMap.points_of_interest.length; i < il; i++) {
                    poi = gameMap.points_of_interest[i];

                    // if (poi.type != "waypoint") {
                    //     continue;
                    // }

                    var icon = L.icon({
                        // iconUrl: 'waypoint.png',
                        // shadowUrl: 'waypoint.png',

                        iconUrl: 'images/leaflet-markers/waypoint.png',
                        shadowUrl: 'images/leaflet-markers/waypoint.png',

                        iconSize:     [32, 32], // size of the icon
                        shadowSize:   [32, 32], // size of the shadow
                        iconAnchor:   [32, 32], // point of the icon which will correspond to marker's location
                        shadowAnchor: [32, 32],  // the same for the shadow
                        popupAnchor:  [-1, -1] // point from which the popup should open relative to the iconAnchor
                    });

                    // console.log(poi.coord)

                    L.marker(mapObject.unproject(poi.coord), {
                        // title: poi.name,
                        icon: icon
                    }).addTo(mapObject);


                    // L.marker(map.unproject(poi.coord), {
                    //     title: poi.name
                    // }).addTo(map);
                }
            }
        }
    });

  },

  willDestroyElement: function() {

  }

});
