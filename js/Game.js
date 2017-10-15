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
 
    // create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.foregroundLayer = this.map.createLayer('foregroundLayer');

    this.createPlayer();

    console.log(this.game);
    this.foregroundLayerTop = this.map.createLayer('foregroundLayerTop');

    this.collisionObjects = this.game.physics.p2.convertCollisionObjects(this.map,"collisionLayer");

    console.log(this.game.physics.p2);
 
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
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');

    let sp = 10;
    this.player.animations.add('stop', [0], 0);
    this.player.animations.add('walk-s', [0, 1, 2], sp, true);
    this.player.animations.add('walk-w', [12*1+ 0, 12*1+ 1, 12*1+ 2], sp, true);
    this.player.animations.add('walk-e', [12*2+ 0, 12*2+ 1, 12*2+ 2], sp, true);
    this.player.animations.add('walk-n', [12*3+ 0, 12*3+ 1, 12*3+ 2], sp, true);

    this.player.animations.add('walk-sw', [3, 4, 5], sp, true);
    this.player.animations.add('walk-se', [12*2+ 3, 12*2+ 4, 12*2+ 5], sp, true);
    this.player.animations.add('walk-nw', [12*1+ 3, 12*1+ 4, 12*1+ 5], sp, true);
    this.player.animations.add('walk-ne', [12*3+ 3, 12*3+ 4, 12*3+ 5], sp, true);
    


    this.game.physics.p2.enable(this.player);

    this.player.body.setRectangle(24, 16, 0, 8);
    this.player.body.fixedRotation = true;
     
    //the camera will follow the player in the world
    this.game.camera.follow(this.player);
     
    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

    console.log(this.player.body);
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

  setPlayerAnimation: function() {
    let e = this.player.body.velocity.x > 0;
    let w = this.player.body.velocity.x < 0;
    let s = this.player.body.velocity.y > 0;
    let n = this.player.body.velocity.y < 0;

    if (!(e || w || s || n)) {
      return this.player.animations.play('stop');
    }

    let anim = 'walk-';

    if (s) {
      anim += 's';
    } else if (n) {
      anim += 'n'
    }

    if (e) {
      anim += 'e';
    } else if (w) {
      anim += 'w';
    }

    return this.player.animations.play(anim);
  },

  update: function() {
    //player movement
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      this.player.body.velocity.y -= 60;
    }
    if(this.cursors.down.isDown) {
      this.player.body.velocity.y += 60;
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= 60;
    }
    if(this.cursors.right.isDown) {
      this.player.body.velocity.x += 60;
    }

    this.setPlayerAnimation();

    
    //this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
    //this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);
  }
}