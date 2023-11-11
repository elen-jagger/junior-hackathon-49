import Phaser from 'phaser';
import Sprite from './sprite';
import EndScreen from './finish';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Sprite, EndScreen],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
};

export default new Phaser.Game(config);
