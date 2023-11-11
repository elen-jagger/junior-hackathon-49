import Phaser from 'phaser';

class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }
  preload() {
    this.load.image('popup', 'assets/win-popup.png');
  }

  create() {
    const popup = this.add.image(600, 350, 'popup');
    popup.setInteractive();
    popup.on('pointerdown', () => this.scene.start('Preload'));
  }
}

export default EndScene;
