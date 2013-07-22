
// http://jsfiddle.net/cliff/CRRGC/

// TODO move this somewhere
L.Icon.Default.imagePath = 'stylesheets/app/leaflet-markers';

App.WorldMapView = Ember.View.extend({

  // continent_id: null,
  // floor_id: null,

  template: Ember.Handlebars.compile('<div id="map"></div>'),

  northEast: function() {
    var map = this.get('map');
    return map.unproject([32768, 0], map.getMaxZoom());
  }.property('map'),

  southWest: function() {
    var map = this.get('map');
    return map.unproject([0, 32768], map.getMaxZoom());
  }.property('map'),

  map: function() {
    return new L.map('map', {
      minZoom: 0,
      maxZoom: 7,
      crs: L.CRS.Simple,
      layers: []
    }).setView([0, 0], 0);
  }.property(),

  didInsertElement: function() {
    var map = window.map = this.get('map');
    var tilesUrl = 'https://tiles.guildwars2.com/{continent_id}/{floor_id}/{z}/{x}/{y}.jpg';
    var continent_id = this.get('continent_id');
    var floor_id = this.get('floor_id');

    map.setMaxBounds(new L.latLngBounds(this.get('southWest'), this.get('northEast')));

    var layer = new L.tileLayer(tilesUrl, {
      // continuousWorld: true,
      continent_id: continent_id,
      floor_id: floor_id,
      minZoom : 0,
      maxZoom: 7
    }).addTo(map);

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
                        iconUrl: 'stylesheets/app/leaflet-markers/waypoint.png',
                        shadowUrl: 'stylesheets/app/leaflet-markers/waypoint.png',

                        iconSize:     [32, 32] // size of the icon
                        // shadowSize:   [50, 64], // size of the shadow
                        // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                        // shadowAnchor: [4, 62],  // the same for the shadow
                        // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                    });

                    // console.log(poi.coord)

                    L.marker(map.unproject(poi.coord), {
                        title: poi.name,
                        icon: icon
                    }).addTo(map);


                    // L.marker(unproject(poi.coord), {
                    //     title: poi.name
                    // }).addTo(map);
                }
            }
        }
    });

  }

});
