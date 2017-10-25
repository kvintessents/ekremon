class Player extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'player');

        this.game = game;
        this.cursors = game.input.keyboard.createCursorKeys();
        this.catchTimer = null;
        this.onCatch = null;

        this.initAnimations();
        this.initBody();
    }

    initAnimations() {
        let sp = 10;
        this.animations.add('stop', [0], 0);
        this.animations.add('walk-s', [2, 1, 0], sp, true);
        this.animations.add('walk-w', [12*1+ 2, 12*1+ 1, 12*1+ 0], sp, true);
        this.animations.add('walk-e', [12*2+ 2, 12*2+ 1, 12*2+ 0], sp, true);
        this.animations.add('walk-n', [12*3+ 2, 12*3+ 1, 12*3+ 0], sp, true);

        this.animations.add('walk-sw', [3, 4, 5], sp, true);
        this.animations.add('walk-se', [12*2+ 5, 12*2+ 4, 12*2+ 3], sp, true);
        this.animations.add('walk-nw', [12*1+ 5, 12*1+ 4, 12*1+ 3], sp, true);
        this.animations.add('walk-ne', [12*3+ 5, 12*3+ 4, 12*3+ 3], sp, true);
    }

    initBody() {
        this.game.physics.p2.enable(this);
        this.body.setRectangle(24, 16, 0, 8);
        this.body.fixedRotation = true;
    }

    setPlayerAnimation() {
        let e = this.body.velocity.x > 0;
        let w = this.body.velocity.x < 0;
        let s = this.body.velocity.y > 0;
        let n = this.body.velocity.y < 0;

        if (!(e || w || s || n)) {
          return this.animations.play('stop');
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

        return this.animations.play(anim);
    }

    updatePosition() {
        this.body.velocity.y = 0;
        this.body.velocity.x = 0;

        if(this.cursors.up.isDown) {
          this.body.velocity.y -= 60;
        }
        if(this.cursors.down.isDown) {
          this.body.velocity.y += 60;
        }
        if(this.cursors.left.isDown) {
          this.body.velocity.x -= 60;
        }
        if(this.cursors.right.isDown) {
          this.body.velocity.x += 60;
        }

        this.setPlayerAnimation();

        if (!this.body.velocity.x && !this.body.velocity.y && !this.catchTimer) {
            this.catchTimer = setTimeout(this.checkCatch.bind(this), 2000);
        }

        if ((this.body.velocity.x || this.body.velocity.y) && this.catchTimer) {
            clearTimeout(this.catchTimer);
            this.catchTimer = null;
        }
    }

    checkCatch() {
        const fgTile = this.game.map.getTileWorldXY(this.centerX, this.centerY, undefined, undefined, 'bushLayer');

        if (!fgTile) {
            return false;
        }

        this.onCatch();
    }
}
