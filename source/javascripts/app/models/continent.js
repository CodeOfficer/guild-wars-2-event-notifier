
App.Continent = DS.Model.extend({
  name: DS.attr('string'),
  continent_dims: DS.attr('raw'),
  min_zoom: DS.attr('raw'),
  max_zoom: DS.attr('raw'),
  floors: DS.attr('raw')
});
