let config = {
    type: Phaser.AUTO,
    width: 1585,
    height: 750,
    scene: {
        preload: preload,
        create: create
    },
    scale: {
        mode: Phaser.Scenes.FIT,
        autoCenter: Phaser.CENTER_HORIZONTALLY,
        parent: 'welcomeAnimation'
    },
    backgroundColor : '#89D1D9'
    };

game = new Phaser.Game(config);

function preload() {

    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x000000, 0.7);
    progressBox.fillRect(612, 350, 360, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Chargement...',
        style: {
            font: '20px monospace',
            fill: '#000000'
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#000000'
        }
    });
    percentText.setOrigin(0.5, -2.5);

    this.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0x000000, 1);
        progressBar.fillRect(622, 360, 340 * value, 30);
    });

    this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();

    });

    this.load.image('logo', '../assets/img/monopalim.png');
    for (let i = 0; i < 1000; i++) { //change here if you want to run the code
        this.load.image('logo', '../assets/img/monopalim.png');
    }
}

function create() {
    window.location.href = '/connection';
}
