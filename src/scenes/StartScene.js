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
    this.createText();
    this.setEvents();
  }

  createText() {
    this.add.text(
      560,
      40,
      'The aim of the game\nis to help Mother-Cat\nto find her Kitten.\n\nUse keyboard arrows\nto move',
      {
        fontFamily: 'Roboto',
        fontSize: '60px',
        align: 'right',
        color: '#29c09f',
      }
    );
  }

  setEvents() {
    this.input.on('pointerdown', () => {
      console.log('click');
      this.scene.start('Game');
    });
  }
}

export default StartScene;
