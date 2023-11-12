import Phaser from 'phaser';

class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }
  preload() {
    this.load.image('popup', 'assets/win-popup.png');
  }

  create() {
    this.popup = this.add.image(0, 0, 'popup').setOrigin(0);
    this.popup.setScale(0.8);
    this.popup.setX(this.game.config.width / 10);
    this.popup.setInteractive();
    this.popup.on('pointerdown', () => this.scene.start('Start'));
  }
}

export default EndScene;
