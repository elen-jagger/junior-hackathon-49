import Phaser from 'phaser';
import Sprite from './sprite';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Sprite],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
};

export default new Phaser.Game(config);
