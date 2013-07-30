
App.Region = DS.Model.extend({
  name: DS.attr('string'),
  label_coord: DS.attr('raw'),

  maps: DS.hasMany('App.Map')
});
