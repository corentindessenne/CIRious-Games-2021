let TheGame = {
};

TheGame.Params = {
    baseWidth: 800,
    baseHeight: 200
};

TheGame.Boot = function (game) { };

TheGame.Boot.prototype =  {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },
    preload: function () {
        this.load.image("loading", "img.jpeg");
    },
    create: function () {
        this.state.start("Loading");
    }
};

TheGame.Loading = function (game) {
};

TheGame.Loading.prototype = {
    init: function () {
    },
    preload: function () {
        this.stage.backgroundColor = 0x222222;
        var loadingBar = this.add.sprite(this.world.centerX, this.world.centerY, "loading");
        loadingBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(loadingBar);

        this.load.script("BlurX", "BlurX.js");
        this.load.script("BlurY", "BlurY.js");
        this.load.spritesheet("dice", "../assets/img/dice.png", 100, 100);

    },
    create: function () {
        this.state.start("TheGame");
    }
};


TheGame.MyGame = function (game) {
};

TheGame.MyGame.prototype = {
    preload: function () {
    },
    create: function () {
        this.stage.backgroundColor = 0x222222;
        this.diceGroup = this.game.add.group();
        this.dice = [];
        this.text = this.game.add.text(this.world.centerX,10, "Total: ");
        this.text.fill = "#d3d3d3";

        for (var i=0; i < 5; i++) {
            var d = new Dice(i*150+100, 100);
            this.diceGroup.add(d);
        }

        // roll the dice when a mouse button is clicked
        this.game.input.onDown.add(this.rollDice, this);
    },
    rollDice: function () {
        this.text.setText("Total: ");
        this.diceGroup.callAll("roll", null);
        var timer = this.game.time.events.add(100, this.rollDiceComplete, this);
    },
    rollDiceComplete: function () {
        var rollComplete = true;
        this.diceGroup.forEach(function(item) {
            if(item.isAnimationRunning())
                rollComplete = false;
        }, this);
        if(rollComplete) {
            var total = 0;
            this.diceGroup.forEach(function(item) { total += item.value(); });
            this.text.setText("Total: "+total);
        } else {
            var timer = this.game.time.events.add(100, this.rollDiceComplete, this);
        }
    }
};

var mygame;
window.onload = function () {
    mygame = new Phaser.Game(TheGame.Params.baseWidth, TheGame.Params.baseHeight, Phaser.AUTO);
    mygame.state.add("Boot", TheGame.Boot);
    mygame.state.add("Loading", TheGame.Loading);
    mygame.state.add("TheGame", TheGame.MyGame);
    mygame.state.start("Boot");
}