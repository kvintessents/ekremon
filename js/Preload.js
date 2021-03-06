var TopDownGame = TopDownGame || {};
 
//loading the game assets
TopDownGame.Preload = function(){};
 
TopDownGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
 
    this.load.setPreloadSprite(this.preloadBar);
 
    //load game assets
    this.load.tilemap('level1', 'assets/tilemaps/Level01.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', 'assets/images/tiles.png');
    this.load.image('cityTiles', 'assets/images/city.png');
    this.load.image('lineTiles', 'assets/images/lines.png');
    this.load.image('garageTiles', 'assets/images/Garages.png');
    this.load.spritesheet('player', 'assets/images/player.png', 32, 32);
  },

  create: function() {
    this.state.start('Game');
  }
};