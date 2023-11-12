import Phaser from 'phaser';

import StartScene from './scenes/StartScene';
import GameScene from './scenes/GameScene';
import EndScene from './scenes/EndScene';

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 700,
  backgroundColor: 'FFE0BC',
  scene: [StartScene, GameScene, EndScene],
  physics: {
    default: 'arcade',
  },
};

export default new Phaser.Game(config);
