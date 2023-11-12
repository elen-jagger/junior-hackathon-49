import Phaser from 'phaser';
import bg from '../assets/start-bg.jpg';
class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  preload() {
    this.load.image('bg', bg);
  }

  create() {
    this.add.image(0, 0, 'bg').setOrigin(0);
    console.log('StartScene loaded');
    this.setEvents();
  }

  setEvents() {
    this.input.on('pointerdown', () => {
      console.log('click');
      this.scene.start('Game');
    });
  }
}

export default StartScene;
