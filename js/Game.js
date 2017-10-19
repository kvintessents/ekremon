var TopDownGame = TopDownGame || {};

console.log('asd');
 
//title screen
TopDownGame.Game = function(){};
 
TopDownGame.Game.prototype = {
  create: function() {
    this.game.stage.smoothed = false;
    this.game.antialias = false;
    this.game.renderer.renderSession.roundPixels = true;

    this.map = this.game.add.tilemap('level1');
 
    // the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'gameTiles');
    this.map.addTilesetImage('city', 'cityTiles');
    this.map.addTilesetImage('lines', 'lineTiles');
 
    // create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.foregroundLayer = this.map.createLayer('foregroundLayer');

    this.createPlayer();

    this.foregroundLayerTop = this.map.createLayer('foregroundLayerTop');
    this.linesLayerTop = this.map.createLayer('linesLayerTop');

    this.collisionObjects = this.game.physics.p2.convertCollisionObjects(this.map,"collisionLayer");

 
    // collision on blockedLayer
    //this.map.setCollisionBetween(1, 1000, true, 'collisionLayer');
 
    // resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    // Init level items
    this.createItems();
  },

  createPlayer: function() {
    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');

    //we know there is just one result
    this.player = new Player(this.game, result[0].x, result[0].y);
    this.game.add.existing(this.player);

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);
  },

  createItems: function() {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;
    var item;    
    result = this.findObjectsByType('item', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);
  },

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust the y position
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact pixel position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },

  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);
 
      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  },

  collect: function(player, collectable) {
    console.log('yummy!');
 
    //remove sprite
    collectable.destroy();
  },

  enterDoor: function(player, door) {
    console.log('entering door that will take you to '+ door.targetTilemap + ' on x:' + door.targetX + ' and y:' + door.targetY);
  },

  update: function() {
    this.player.updatePosition();
    //player movement

    //this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
    //this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);
  }
}