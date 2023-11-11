import Phaser from 'phaser';
import HelloWorld from './hello-world';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: HelloWorld,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 100 },
    },
  },
};

export default new Phaser.Game(config);
