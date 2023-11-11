import Phaser from 'phaser';
// import { getDimensions } from '../Game/gameSettings';

export default class EndScreen extends Phaser.Scene {
  constructor() {
    super('EndScreen');
  }

  preload() {
    this.load.image('hug', 'assets/hug.jpg');
  }

  create() {
    this.physics.add.image(500, 500, 'hug');
  }

  // create() {
  // }

  // update() {
  // }
}
