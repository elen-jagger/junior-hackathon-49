import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import StartScene from './scenes/StartScene';
import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 720,
  scene: [BootScene, PreloadScene, StartScene, GameScene],
};

export default new Phaser.Game(config);
