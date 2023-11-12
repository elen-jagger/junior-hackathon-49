function isSafe(mat, visited, x, y) {
  return (
    x >= 0 &&
    x < mat.length &&
    y >= 0 &&
    y < mat[0].length &&
    mat[x][y] == 1 &&
    !visited[x][y]
  );
}

const route = new Array();

function findPath(mat, visited, i, j, x, y, min_dist, dist) {
  if (i == x && j == y) {
    if (route.length) return [...route];
  }

  // set (i, j) cell as visited
  visited[i][j] = true;
  route.push([i, j]);

  // go to the bottom cell
  if (isSafe(mat, visited, i + 1, j)) {
    min_dist = findPath(mat, visited, i + 1, j, x, y, min_dist, dist + 1);
  }
  // go to the right cell
  if (isSafe(mat, visited, i, j + 1)) {
    min_dist = findPath(mat, visited, i, j + 1, x, y, min_dist, dist + 1);
  }
  // go to the top cell
  if (isSafe(mat, visited, i - 1, j)) {
    min_dist = findPath(mat, visited, i - 1, j, x, y, min_dist, dist + 1);
  }
  // go to the left cell
  if (isSafe(mat, visited, i, j - 1)) {
    min_dist = findPath(mat, visited, i, j - 1, x, y, min_dist, dist + 1);
  }

  visited[i][j] = false;
  route.pop();

  return min_dist;
}

function findShortestRoute(mat, src, dest) {
  if (
    mat.length == 0 ||
    mat[src.first][src.second] == 0 ||
    mat[dest.first][dest.second] == 0
  )
    return -1;

  let row = mat.length;
  let col = mat[0].length;

  let visited = [];
  for (var i = 0; i < row; i++) visited.push(new Array(col));

  let dist = Number.MAX_SAFE_INTEGER;
  // let route = [];
  return findPath(
    mat,
    visited,
    src.first,
    src.second,
    dest.first,
    dest.second,
    dist,
    0
  );
}

export default findShortestRoute;
