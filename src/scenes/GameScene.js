import Phaser from 'phaser';
import generateMaze from '../helpers/generate-maze';

class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('grass', 'src/assets/textures/grass.png');
    this.load.image('ground', 'src/assets/textures/ground.png');
  }

  create() {
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
  }

  _renderLabyrinth(tiles, width, height, x, y) {
    const wallsMap = this.make.tilemap({
      data: tiles,
      tileWidth: 50,
      tileHeight: 50,
    });
    const wallTiles = wallsMap.addTilesetImage('grass');
    const wallsLayer = wallsMap.createLayer(0, wallTiles, x, y);
    wallsLayer.setDisplaySize(width, height);

    this._swapTiles(tiles);

    const floorMap = this.make.tilemap({
      data: tiles,
      tileWidth: 50,
      tileHeight: 50,
    });
    const floorTiles = floorMap.addTilesetImage('ground');
    const floorLayer = floorMap.createLayer(0, floorTiles, x, y);
    floorLayer.setDisplaySize(width, height);
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
