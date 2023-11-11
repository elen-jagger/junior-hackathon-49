class StartScene extends Phaser.Scene {
    constructor() {
        super('Start')
    }
 
    create() {
        console.log('StartScene loaded')
        this.createText();
        this.setEvents();
    }

    createText() {
        this.add.text(10, 10, 'Начало игры', {font: '100px', fill: '#FFFFFF'}); //.setOrigin(0, 5) выравнить по центру
    }

    setEvents() {
        this.input.on('pointerdown', () => {
            console.log('click');
            this.scene.start('Game');
        })
    }
}


export default StartScene;