import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    console.log('GameScene loaded');
  }
}

export default GameScene;
