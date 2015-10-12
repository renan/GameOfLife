/* global describe, it */

import expect from 'expect.js';
import Grid from '../src/Grid';
import Cell from '../src/Cell';

describe('Grid', function() {
  it('should initialize from array of lines', function() {
    let grid = Grid.fromArray(
      [0, 1, 0],
      [1, 0, 1]
    );

    expect(grid).to.be.an(Grid);
    expect(
      [ ...grid.cells() ]
    ).to.have.length(6);
  });

  it('should serialize to array', function() {
    let array = [
      [1, 0, 1],
      [0, 1, 0]
    ];
    let grid = Grid.fromArray(...array);

    expect(grid.toArray()[0][0]).to.be(true);
    expect(grid.toArray(true)).to.eql(array);
  });

  it('should get and set the same instance', function() {
    let cell = new Cell(true);

    let grid = new Grid(1, 1);
    grid.set(0, 0, cell);

    expect(
      grid.get(0, 0)
    ).to.be(cell);
  });

  it('should return cells and their coordinates', function() {
    let grid = Grid.fromArray([1]);
    let [x, y, cell] = grid.cells().next().value;

    expect(x).to.equal(0);
    expect(y).to.equal(0);
    expect(cell).to.be.an(Cell);
  });

  it('should return neighbours of a x and y position', function() {
    let grid = new Grid(2, 2);
    let [cell00, cell10, cell01, cell11] = [
      new Cell(true), new Cell(false),
      new Cell(false), new Cell(true)
    ];

    grid.set(0, 0, cell00);
    grid.set(1, 0, cell10);
    grid.set(0, 1, cell01);
    grid.set(1, 1, cell11);

    let neighbours = grid.neighbours(0, 0);
    expect(neighbours.next().value).to.be(cell10);
    expect(neighbours.next().value).to.be(cell01);
    expect(neighbours.next().value).to.be(cell11);

    neighbours = grid.neighbours(1, 1);
    expect(neighbours.next().value).to.be(cell00);
    expect(neighbours.next().value).to.be(cell10);
    expect(neighbours.next().value).to.be(cell01);
  });

  it('should clone cells', function() {
    let grid = new Grid(0, 0);
    let cell = new Cell(true);
    grid.set(0, 0, cell);

    let clone = grid.clone().get(0, 0);
    expect(clone).to.be.an(Cell);
    expect(clone).not.to.be(cell);
  });
});
