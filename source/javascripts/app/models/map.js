
App.Map = DS.Model.extend({
  map_name: DS.attr('string'),
  min_level: DS.attr('number'),
  max_level: DS.attr('number'),
  default_floor: DS.attr('number'),
  floors: DS.attr('raw'),
  region_id: DS.attr('number'),
  region_name: DS.attr('string'),
  continent_id: DS.attr('number'),
  continent_name: DS.attr('string'),
  map_rect: DS.attr('raw'),
  continent_rect: DS.attr('raw')
});
