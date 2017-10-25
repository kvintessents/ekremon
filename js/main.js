var TopDownGame = TopDownGame || {};
 
TopDownGame.game = new Phaser.Game(320, 180, Phaser.AUTO, '', null, false, false);
 
TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('Game', TopDownGame.Game);
TopDownGame.game.state.add('Fight', Fight);
 
TopDownGame.game.state.start('Boot');