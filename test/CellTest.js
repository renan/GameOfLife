/* global describe, it */

import expect from 'expect.js';
import Cell from '../src/Cell';

describe('Cell', function() {
  it('should should hold state', function() {
    let cell;

    cell = new Cell(true);
    expect(cell.isAlive).to.equal(true);

    cell = new Cell(false);
    expect(cell.isAlive).to.equal(false);
  });

  it('should cast state to boolean', function() {
    let cell = new Cell(1);
    expect(cell.isAlive).to.be.an('boolean');
  });
});
