import Phaser from 'phaser';
import Maze from './maze';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: Maze,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 100 },
    },
  },
};

export default new Phaser.Game(config);
