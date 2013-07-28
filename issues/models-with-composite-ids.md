When i hit ...

api.guildwars2.com/v1/map_floor.json?continent_id=1&floor=2

... the json comes back without an id. I want to create a ED model for App.MapFloor which generates its own local id like '1.2' from the following requests:

var mapFloor = App.MapFloor.find({continent_id: 1, floor: 2});

var mapFloor = App.MapFloor.find('1.2');
