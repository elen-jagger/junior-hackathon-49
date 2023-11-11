
class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload');
    }
    preload() {
        console.log('PreloadScene.preload')
    }

    create() {
        console.log('PreloadScene.create')
        this.scene.start('Start');
    }
}


export default PreloadScene;