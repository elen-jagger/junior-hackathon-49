import Phaser from 'phaser';

class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }
  preload() {
    console.log('EndScene.preload');
  }

  create() {
    console.log(this.scene);
    this.scene.start('Preload');
  }
}

export default EndScene;
