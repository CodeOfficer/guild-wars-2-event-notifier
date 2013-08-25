
// EventName model
// the endpoint for /event_names is just a cacheable list

App.EventName = DS.Model.extend({
  event: DS.belongsTo('App.Event'),

  name: DS.attr('string')
});

[
  {"id":"D1323424-379E-4FED-9DF0-1D7763329BC7","name":"Stop the skritt burglar before it escapes with the treasure."},
  {"id":"3DF95F5A-0E39-4F34-A7ED-982141F07B64","name":"Collapse the destroyer fissure."},
  {"id":"875D1BA9-D023-47C1-BB55-3AD2E15B316A","name":"Slay Gravekeeper Hammon and the fleshreavers."},
]

// Event model
// the endpoint for /events is just a bunch of foreign keys and a state field
// events objects themselves do not have id's

App.Event = DS.Model.extend({
  eventName: DS.belongsTo('App.EventName'),
  worldName: DS.belongsTo('App.WorldName'),
  mapName: DS.belongsTo('App.MapName'),

  state: DS.attr('string')
});

{"events":[
  {"world_id":1001,"map_id":51,"event_id":"A8D1A2B7-1F1B-413D-8E64-06CA0D26712D","state":"Inactive"},
  {"world_id":1001,"map_id":51,"event_id":"E9C6DFE8-DAC6-4810-9CB2-F71CF4D648C7","state":"Active"},
  {"world_id":1001,"map_id":51,"event_id":"45B84A62-BE33-4371-B9FB-CC8490528276","state":"Inactive"}
]}

When I do

{{#linkTo "event" world map event}}{{event.eventName.name}}{{/linkTo}}

I can link to an event, but the url ends up

http://localhost:4567/#/worlds/1019/maps/73/events/null

where what i want in the url is

http://localhost:4567/#/worlds/1019/maps/73/events/8504F3E7-EB1B-43EC-AA5D-6258D48C8481

which i get to by doing

{{#linkTo "event" world map event.eventName}}{{event.eventName.name}}{{/linkTo}}

but then

.... *see models with composite ids* fix
