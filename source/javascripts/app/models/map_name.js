
App.MapName = DS.Model.extend({

  map: DS.belongsTo('App.Map'),

  name: DS.attr('string')

});
