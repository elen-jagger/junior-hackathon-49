import Phaser from 'phaser';

import BootScene from './scenes/BootScene';
import StartScene from './scenes/StartScene';
import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';
import EndScene from './scenes/EndScene';

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 720,
  backgroundColor: 'fddcbb',
  scene: [BootScene, PreloadScene, StartScene, GameScene, EndScene],
  physics: {
    default: 'arcade',
  },
};

export default new Phaser.Game(config);
