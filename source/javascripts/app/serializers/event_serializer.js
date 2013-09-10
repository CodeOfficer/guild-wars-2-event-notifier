//= require ./application_serializer

App.EventSerializer = App.ApplicationSerializer.extend({

  normalizeHash: {
    events: function(hash) {
      hash.id = [hash.world_id, hash.map_id, hash.event_id].join('.');
      hash.eventName = hash.event_id;
      hash.eventDetail = hash.event_id;
      hash.worldName = hash.world_id;
      hash.mapName = hash.map_id;
      hash.map = hash.map_id;
      delete hash.event_id;
      delete hash.world_id;
      delete hash.map_id;

      return hash;
    }
  }

});
