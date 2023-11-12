import Phaser from 'phaser';
import findShortestRoute from '../helpers/find-route';
import { Pair } from '../helpers/pair';
import generateMaze from '../helpers/generate-maze';
import { cellsToTiles, routeToTiles, swapTiles } from '../helpers/tiles';

const TILE_DIM = 50;

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
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

    this.route = routeToTiles(path, mazeCells);

    this.addPlayer(x + TILE_DIM, y + TILE_DIM);
    this.renderLabyrinth(tiles, width, height, x, y);

    // main menu buttons
    this.addButtons(width, height, x, y);

    this.addFinish(x, y, width, height);

    this.physics.add.collider(
      this.player,
      this.finish,
      this.finishGame.bind(this)
    );
  }

  addPlayer(x, y) {
    const player = this.physics.add.sprite(x, y, 'cat');
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

  addFinish(x, y, rows, columns) {
    const xPos = rows - 60 + x;
    const yPos = columns - 60 + y;

    const finish = this.physics.add.image(xPos, yPos, 'kitten').setScale(0.8);
    this.finish = finish;
  }

  update() {
    let cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.player.setVelocityX(-200);

      this.player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(200);

      this.player.anims.play('right', true);
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(200);
    } else if (cursors.up.isDown) {
      this.player.setVelocityY(-200);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);

      this.player.anims.play('turn');
    }
  }

  addButtons(width, height, x, y) {
    const toStartBtn = this.add.sprite(100, 65, 'back');

    toStartBtn.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
      this.player.setX(x + TILE_DIM);
      this.player.setY(y + TILE_DIM);
    });

    const showRouteBtn = this.add.sprite(600, 65, 'new');
    showRouteBtn.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
      this.showRoute(this.route, width, height, x, y);
      setTimeout(() => {
        this.scene.start('Game');
      }, 2000);
    });

    const exitBtn = this.add.sprite(1100, 70, 'tutorial');
    exitBtn.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
      this.scene.start('Start');
    });
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

  renderLabyrinth(tiles, width, height, x, y) {
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
