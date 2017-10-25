class Fight {
    preload() {
        this.game.load.image('player-fighting', 'assets/images/player-fighting.png');

        const monster = ekremons.getRandom();
        this.game.load.image(monster.name, ekremons.getAssetUrl(monster));

        this.currentMonster = monster;
    }

    create() {
        this.game.stage.backgroundColor = "#c7d5d7";

        this.createMon();
        this.createPlayer();
    }

    createPlayer() {
        this.player = this.game.add.sprite(-180, 0, 'player-fighting');
        let playerIntro = this.game.add.tween(this.player);

        playerIntro.to({x: 0}, 500);
        playerIntro.start();
    }

    createMon() {        
        this.monster = this.game.add.sprite(320, 0, this.currentMonster.name);

        let monsterIntro = this.game.add.tween(this.monster);
        monsterIntro.to({x: 180}, 500);
        monsterIntro.start();
    }
}
