import Phaser from 'phaser';
import bg from '../assets/start-bg.jpg';

import grass from '../assets/grassPix.png';
import route from '../assets/pathPix.png';
import ground from '../assets/textures/groundTile.png';
import kitten from '../assets/kitten.png';
import back from '../assets/back.png';
import newGame from '../assets/new.png';
import tutorial from '../assets/tutorial.png';
class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  preload() {
    this.load.image('bg', bg);

    this.load.image('ground', ground);
    this.load.image('grass', grass);
    this.load.image('kitten', kitten);
    this.load.image('route', route);
    this.load.image('back', back);
    this.load.image('new', newGame);
    this.load.image('tutorial', tutorial);

    this.load.spritesheet('cat', 'assets/cat.png', {
      frameWidth: 29.2,
      frameHeight: 23,
    });
  }

  create() {
    this.tutorial = this.add.image(0, 0, 'bg').setOrigin(0);
    this.tutorial.setScale(0.8);
    this.tutorial.setX(this.game.config.width / 10);

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
