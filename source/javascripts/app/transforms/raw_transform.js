
App.RawTransform = DS.Transform.extend({
  serialize: function(deserialized) {
    return deserialized;
  },

  deserialize: function(serialized) {
    return serialized;
  }
});
