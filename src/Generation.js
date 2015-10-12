
import Grid from './Grid';

export default class Generation {
  constructor(grid) {
    this.grid = grid;
  }

  evolve() {
    let grid = this.grid.clone();
    for (let [x, y] of this.grid.cells()) {
      let liveNeighbours = [...this.grid.neighbours(x, y)].filter(function (cell) {
        return cell.isAlive;
      }).length;

      let cell = grid.get(x, y);
      cell.isAlive = Generation.shouldLive(cell.isAlive, liveNeighbours);

      grid.set(x, y, cell)
    }
    return new Generation(grid);
  }

  static shouldLive(isAlive, liveNeighbours) {
    // Rule 1: Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    if (isAlive && liveNeighbours < 2) {
      return false;
    }

    // Rule 2: Any live cell with two or three live neighbours lives on to the next generation.
    if (isAlive && (liveNeighbours === 2 || liveNeighbours === 3)) {
      return true;
    }

    // Rule 3: Any live cell with more than three live neighbours dies, as if by overcrowding.
    if (isAlive && liveNeighbours > 3) {
      return false;
    }

    // Rule 4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    if (!isAlive && liveNeighbours === 3) {
      return true;
    }

    return isAlive;
  }
}
