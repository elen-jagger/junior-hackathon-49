class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }
    preload() {
        console.log("BootScene.preload")
    }

    create() {
        console.log(this.scene);
        this.scene.start('Preload');
    }

    

}

export default BootScene;