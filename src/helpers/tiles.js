export function cellsToTiles(cells) {
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

export function swapTiles(tiles) {
  tiles.map((row) => {
    row.map((v, i, a) => {
      a[i] = a[i] ? 0 : 1;
    });
  });
}

export function routeToTiles(route, maze) {
  const tiles = cellsToTiles(maze);

  tiles.map((v, i) => {
    v.map((v, j) => {
      if (!route.find((el) => el[0] === i && el[1] === j)) tiles[i][j] = 1;
      else tiles[i][j] = 0;
    });
  });

  return tiles;
}
