# list all routes

Ember.keys(App.Router.router.recognizer.names)

# fetching the latest files

newest handlebars?
# wget -O source/javascripts/vendor/handlebars.js https://raw.github.com/wycats/handlebars.js/1.0.0/dist/handlebars.js

wget -O source/javascripts/vendor/fastclick.js https://raw.github.com/ftlabs/fastclick/master/lib/fastclick.js
wget -O source/javascripts/vendor/jquery.js http://code.jquery.com/jquery-2.0.0.js
wget -O source/javascripts/vendor/handlebars.js http://builds.emberjs.com.s3.amazonaws.com/handlebars-1.0.0-rc.4.js
wget -O source/javascripts/vendor/ember-latest.js http://builds.emberjs.com.s3.amazonaws.com/ember-latest.js
wget -O source/javascripts/vendor/ember-data-latest.js http://builds.emberjs.com.s3.amazonaws.com/ember-data-latest.js
wget -O source/javascripts/vendor/ember-console-utils.js https://raw.github.com/ebryn/ember-console-utils/master/ember-console-utils.js


# links

https://github.com/emberjs/data/pull/815

http://www.elasticsearch.org/tutorials/2012/08/22/javascript-web-applications-and-elasticsearch.html
https://gist.github.com/karmi/3369662

http://enable-cors.org/
http://enable-cors.org/client.html
http://www.html5rocks.com/en/tutorials/cors/


https://github.com/visionmedia/mocha/issues/753
http://robdodson.me/blog/2012/05/28/mocking-requests-with-mocha-chai-and-sinon/

https://github.com/domenic/sinon-chai
http://cjohansen.no/en/javascript/sinon_js_0_6_0_fake_xmlhttprequest_and_improved_test_framework_integration


https://github.com/nostalgiaz/bootstrap-switch
http://www.larentis.eu/switch/

region

  North America - US
  Eurpoe - DE, FR, SP

  http://www.iguildwars2.com/events.html


https://github.com/rpflorence/ember-localstorage-adapter/blob/master/localstorage_adapter.js
https://github.com/thomasboyt/data/commit/249f60adbb80ec24a3e7739ce3892711588f7de4

async router
https://gist.github.com/machty/5723945

integration testing ••••
http://ianpetzer.wordpress.com/2013/06/14/getting-started-with-integration-testing-ember-js-using-ember-testing-and-qunit-rails/

http://blog.mrloop.com/blog/2013/04/07/ember-data-and-the-meetup-api/


https://github.com/emberjs/ember.js/issues/1793
https://github.com/emberjs/ember.js/pull/2438


http://discuss.emberjs.com/t/ember-rc-5-is-not-working-properly-with-handlebars-1-0-0/1391/12

http://progfu.com/post/40016169330/how-to-find-a-model-by-any-attribute-in-ember-js

https://github.com/cjohansen/Sinon.JS/issues/284

gw2 map example
http://jsfiddle.net/cliff/CRRGC/

http://dragons.udba.org/
https://forum-en.guildwars2.com/forum/community/api/Dragon-event-chains

MULTIPLE MAP EXAMPLE
http://gw2.chillerlan.net/examples/gw2maps.html
http://gw2.chillerlan.net/examples/gw2maps-jquery.html

https://forum-en.guildwars2.com/forum/community/api/Event-Details-API-location-coordinates/first#post2355531


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

  // Required parameters:
  // continent_id: null,
  // floor_id: null,

  // region_id: null,
  // map_id: null,

  // continent, map, [event, poi, etc]


// http://jsfiddle.net/cliff/CRRGC/

// TODO move this somewhere
// L.Icon.Default.imagePath = 'stylesheets/app/leaflet-markers';


