export function bfs(grid, start, end) {
  const visited = [];
  start.distance = 0;
  const que = [start];
  while (que.length) {
    const closestCell = que.shift();
    if (closestCell.isWall) continue;
    if (closestCell.distance === Infinity) return visited;
    closestCell.isVisited = true;
    visited.push(closestCell);
    allNeighborsAddOne(closestCell, grid, que);
    if (closestCell === end) return visited;
  }
  return visited
}

function allNeighborsAddOne(cell, grid, que) {
  const neighbors = [];
  if (cell.row > 0) neighbors.push(grid[cell.row - 1][cell.col]);
  if (cell.row < grid.length - 1) neighbors.push(grid[cell.row + 1][cell.col]);
  if (cell.col > 0) neighbors.push(grid[cell.row][cell.col - 1]);
  if (cell.col < grid[0].length - 1)
    neighbors.push(grid[cell.row][cell.col + 1]);
  const unvisitedNeighbors = neighbors.filter(
    (each) => !each.isVisited
  );
  for (const each of unvisitedNeighbors) {
    each.distance = cell.distance + 1;
    each.previousCell = cell;
    if (!each.isSeen) {
      que.push(each);
      each.isSeen = true;
    }
  }
}
