
App.Continent = DS.Model.extend({

  continent_dims: DS.attr('raw'),
  floors: DS.attr('raw'),
  max_zoom: DS.attr('raw'),
  min_zoom: DS.attr('raw'),
  name: DS.attr('string')

});
