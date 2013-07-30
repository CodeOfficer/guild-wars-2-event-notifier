
App.PointOfInterest = DS.Model.extend({
  name: DS.attr('string'),
  type: DS.attr('string'),
  floor: DS.attr('number'),
  coord: DS.attr('raw')
});
