
import Cell from './Cell';

export default class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this._cells = new Map();
  }

  static fromArray(lines) {
    let grid = new Grid(lines[0].length, lines.length);

    for (let y in lines) {
      let line = lines[y];
      for (let x in line) {
        grid.set(x, y, new Cell(line[x]));
      }
    }
    return grid;
  }

  set(x, y, cell) {
    this._cells.set(`${x},${y}`, cell);
  }

  get(x, y) {
    return this._cells.get(`${x},${y}`);
  }

  * cells() {
    for (let [coordinate, cell] of this._cells.entries()) {
      let parts = coordinate.split(',');
      let x = parseInt(parts[0], 10);
      let y = parseInt(parts[1], 10);

      yield [x, y, cell];
    }
  }

  * neighbours(x, y) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) {
          continue;
        }

        let neighbour = this.get(x + dx, y + dy);
        if (typeof neighbour === 'undefined') {
          continue;
        }

        yield neighbour;
      }
    }
  }

  clone() {
    let grid = new Grid(this.width, this.height);
    for (let [x, y, cell] of this.cells()) {
      grid.set(x, y, new Cell(cell.isAlive));
    }
    return grid;
  }

  toArray(integers = false) {
    let lines = [];
    for (let y = 0; y < this.height; y++) {
      let columns = [];
      for (let x = 0; x < this.width; x++) {
        columns.push(
          integers
            ? Number(this.get(x, y).isAlive)
            : this.get(x, y).isAlive
        );
      }
      lines.push(columns);
    }
    return lines;
  }
}
