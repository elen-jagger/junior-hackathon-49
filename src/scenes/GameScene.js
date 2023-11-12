import Phaser from 'phaser';
import findShortestRoute from '../helpers/find-route';
import { Pair } from '../helpers/pair';
import generateMaze from '../helpers/generate-maze';
import grass from '../assets/textures/grassTile.png';
import route from '../assets/textures/grassTile2.png';
import ground from '../assets/textures/groundTile.png';
import kitten from '../assets/kitten.png';
import { cellsToTiles, routeToTiles, swapTiles } from '../helpers/tiles';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.initialPositionX = 135;
    this.initialPositionY = 200;
  }

  preload() {
    this.load.image('ground', ground);
    this.load.image('grass', grass);
    this.load.image('kitten', kitten);
    this.load.image('route', route);

    this.load.spritesheet('cat', 'assets/cat.png', {
      frameWidth: 29.2,
      frameHeight: 23,
    });
  }

  addPlayer() {
    const player = this.physics.add.sprite(
      this.initialPositionX,
      this.initialPositionY,
      'cat'
    );
    player.setCollideWorldBounds(true);

    this.player = player;
    this.player.setDepth(1);

    this.player.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });

    this.player.anims.create({
      key: 'turn',
      frames: [{ key: 'cat', frame: 5 }],
      frameRate: 20,
    });

    this.player.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('cat', { start: 6, end: 9 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  addFinish() {
    const finish = this.physics.add.image(1065, 800, 'kitten');
    this.finish = finish;
  }

  update() {
    let cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.player.setVelocityX(-250);

      this.player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(250);

      this.player.anims.play('right', true);
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(250);
    } else if (cursors.up.isDown) {
      this.player.setVelocityY(-250);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);

      this.player.anims.play('turn');
    }
  }

  create() {
    this.addPlayer();

    // labyrinth
    const TILESIZE = 80;
    const cellsWidth = Math.floor(this.game.config.height / TILESIZE - 1);
    const cellsHeight = Math.floor(this.game.config.width / TILESIZE - 1);
    const columns = cellsWidth - 1;
    const rows = cellsHeight - 1;

    const x = this.game.config.width - TILESIZE * cellsHeight;
    const y = this.game.config.height - TILESIZE * cellsWidth + 40;

    const mazeCells = generateMaze(rows, columns);

    const width = TILESIZE * mazeCells[0].length;
    const height = TILESIZE * mazeCells.length;

    const tiles = cellsToTiles(mazeCells);

    let src = new Pair(1, 1);
    let dest = new Pair(columns * 2 - 1, rows * 2 - 1);

    let path = findShortestRoute(cellsToTiles(mazeCells), src, dest);

    const route = routeToTiles(path, mazeCells);

    this._renderLabyrinth(tiles, width, height, x, y);

    // main menu buttons
    const toStartBtn = this.add.text(100, 65, 'Go to start', {
      fontFamily: 'Roboto',
      fontSize: '30px',
      color: '#29c09f',
    });
    toStartBtn.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
      this.player.setX(this.initialPositionX);
      this.player.setY(this.initialPositionY);
    });

    const restartBtn = this.add.text(400, 65, 'New map', {
      fontFamily: 'Roboto',
      fontSize: '30px',
      color: '#29c09f',
    });
    restartBtn.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
      this.scene.start('Game');
    });

    const showRouteBtn = this.add.text(700, 50, 'Show route\nand restart', {
      fontFamily: 'Roboto',
      fontSize: '30px',
      color: '#29c09f',
    });
    showRouteBtn.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
      this.showRoute(route, width, height, x, y);
      setTimeout(() => {
        this.scene.start('Game');
      }, 2000);
    });

    const infoBtn = this.add.text(1000, 70, 'Info', {
      fontFamily: 'Roboto',
      fontSize: '30px',
      color: '#29c09f',
    });
    infoBtn.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
      this.scene.start('Start');
    });

    this.addFinish();

    this.physics.add.collider(
      this.player,
      this.finish,
      this.finishGame.bind(this)
    );
  }

  showRoute(route, width, height, x, y) {
    const routeMap = this.make.tilemap({
      data: route,
      tileWidth: 50,
      tileHeight: 50,
    });
    const routeTiles = routeMap.addTilesetImage('route');
    const routeLayer = routeMap.createLayer(0, routeTiles, x, y);
    routeLayer.setDisplaySize(width, height);
  }

  finishGame() {
    this.scene.start('EndScene');
  }

  _renderLabyrinth(tiles, width, height, x, y) {
    const floorMap = this.make.tilemap({
      data: tiles,
      tileWidth: 50,
      tileHeight: 50,
    });
    const floorTiles = floorMap.addTilesetImage('grass');
    const floorLayer = floorMap.createLayer(0, floorTiles, x, y);
    floorLayer.setDisplaySize(width, height);

    swapTiles(tiles);
    const wallsMap = this.make.tilemap({
      data: tiles,
      tileWidth: 50,
      tileHeight: 50,
    });
    const wallTiles = wallsMap.addTilesetImage('ground');
    const wallsLayer = wallsMap.createLayer(0, wallTiles, x, y);
    wallsLayer.setDisplaySize(width, height);

    wallsLayer.setCollisionBetween(1, 255);
    this.physics.add.collider(this.player, wallsLayer);
  }
}

export default GameScene;
