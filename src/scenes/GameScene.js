import Phaser from 'phaser';
import generateMaze from '../helpers/generate-maze';
import grass from '../assets/textures/grassTile.png';
import ground from '../assets/textures/groundTile.png';
import kitten from '../assets/kitten.png';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('ground', ground);
    this.load.image('grass', grass);
    this.load.image('kitten', kitten);

    this.load.spritesheet('cat', 'assets/cat.png', {
      frameWidth: 29.2,
      frameHeight: 23,
    });
  }

  //TODO по-хорошему надо перенести в отдельный класс, наследующий от Phaser.Physics.Arcade.Sprite
  addPlayer() {
    const player = this.physics.add.sprite(135, 135, 'cat');
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
    const finish = this.physics.add.image(1065, 585, 'kitten');
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

    // if (this.player.x >= 1040 && this.player.y >= 560) {
    //   this.scene.start('EndScene');
    // }
  }

  create() {
    this.addPlayer();

    const TILESIZE = 80;
    const cellsWidth = Math.floor(this.game.config.height / TILESIZE - 1);
    const cellsHeight = Math.floor(this.game.config.width / TILESIZE - 1);
    const rows = cellsWidth - 1;
    const colums = cellsHeight - 1;
    const x = this.game.config.width - TILESIZE * cellsHeight;
    const y = this.game.config.height - TILESIZE * cellsWidth;

    const mazeCells = generateMaze(colums, rows);

    const width = TILESIZE * mazeCells[0].length;
    const height = TILESIZE * mazeCells.length;

    const tiles = this._cellsToTiles(mazeCells);

    this._renderLabyrinth(tiles, width, height, x, y);
    this.addFinish();
    this.physics.add.collider(
      this.player,
      this.finish,
      this.finishGame.bind(this)
    );
  }

  finishGame() {
    console.log(this);
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

    this._swapTiles(tiles);

    const wallsMap = this.make.tilemap({
      data: tiles,
      tileWidth: 50,
      tileHeight: 50,
    });
    const wallTiles = wallsMap.addTilesetImage('ground');
    const wallsLayer = wallsMap.createLayer(0, wallTiles, x, y);
    wallsLayer.setDisplaySize(width, height);

    //Добавляем коллайдер между стенами лабиринта и игроком
    wallsLayer.setCollisionBetween(1, 255);
    this.physics.add.collider(this.player, wallsLayer);
  }

  _cellsToTiles(cells) {
    const tiles = new Array(cells.length * 2 + 1);

    for (let i = 0; i < tiles.length; i++) {
      tiles[i] = new Array(cells[0].length * 2 + 1).fill(0);
    }

    cells.map((row, i) => {
      const y = (i + 1) * 2 - 1;
      row.map((cell, c) => {
        const x = (c + 1) * 2 - 1;
        tiles[y][x] = 1; //клетка посередине
        tiles[y - 1][x] = cell[0]; //верхняя клетка
        tiles[y + 1][x] = cell[2]; //нижняя клетка
        tiles[y][x - 1] = cell[3]; //клетка слева
        tiles[y][x + 1] = cell[1]; //клетка справа
      });
    });

    return tiles;
  }

  _swapTiles(tiles) {
    tiles.map((row) => {
      row.map((v, i, a) => {
        a[i] = a[i] ? 0 : 1;
      });
    });
  }
}

export default GameScene;
