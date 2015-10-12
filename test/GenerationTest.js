/* global describe, it */

import expect from 'expect.js';
import Generation from '../src/Generation';
import Grid from '../src/Grid';

describe('Generation', function() {
  it('should evolve to a new generation', function() {
    let generation = new Generation(Grid.fromArray(
      [1, 0, 1],
      [0, 1, 0]
    ));
    let evolved = generation.evolve();

    expect(evolved).to.be.an(Generation);
    expect(evolved).not.to.be(generation);
  });

  it('should die when under-population', function() {
    let generation = new Generation(Grid.fromArray(
      [1, 0],
      [0, 0]
    ));
    expect(generation.evolve().grid.toArray(true)).to.eql([
      [0, 0],
      [0, 0]
    ]);
  });

  it('should live to the next generation', function() {
    let generation = new Generation(Grid.fromArray(
      [1, 0, 1],
      [0, 1, 1]
    ));
    expect(generation.evolve().grid.toArray(true)).to.eql([
      [0, 0, 1],
      [0, 1, 1]
    ]);
  });

  it('should die when overcrowding', function() {
    let generation = new Generation(Grid.fromArray(
      [1, 1, 1],
      [1, 1, 1]
    ));
    expect(generation.evolve().grid.toArray(true)).to.eql([
      [1, 0, 1],
      [1, 0, 1]
    ]);
  });

  it('should reproduce', function() {
    let generation = new Generation(Grid.fromArray(
      [1, 0],
      [1, 1]
    ));
    expect(generation.evolve().grid.toArray(true)).to.eql([
      [1, 1],
      [1, 1]
    ]);
  });

  describe('Generation Patterns: Still lifes', function() {
    it('should generate a Block', function () {
      let grid = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ];
      expect(
        new Generation(Grid.fromArray(...grid)).grid.toArray(true)
      ).to.eql(grid);
    });

    it('should generate a Beehive', function () {
      let grid = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ];
      expect(
        new Generation(Grid.fromArray(...grid)).grid.toArray(true)
      ).to.eql(grid);
    });

    it('should generate a Loaf', function () {
      let grid = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ];
      expect(
        new Generation(Grid.fromArray(...grid)).grid.toArray(true)
      ).to.eql(grid);
    });

    it('should generate a Boat', function () {
      let grid = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      expect(
        new Generation(Grid.fromArray(...grid)).grid.toArray(true)
      ).to.eql(grid);
    });
  });

  describe('Generation Patterns : Oscillators', function() {
    let animate = function (firstGeneration, generations) {
      let generation = new Generation(Grid.fromArray(...firstGeneration));

      for (let evolved of generations) {
        generation = generation.evolve();
        expect(generation.grid.toArray(true)).to.eql(evolved);
      }
    };

    it('should generate a Blinker (period 2)', function () {
      let firstGeneration = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      let secondGeneration = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];

      animate(firstGeneration, [
        secondGeneration,
        firstGeneration,
        secondGeneration
      ]);
    });

    it('should generate a Toad (period 2)', function () {
      let firstGeneration = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ];
      let secondGeneration = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ];

      animate(firstGeneration, [
        secondGeneration,
        firstGeneration,
        secondGeneration
      ]);
    });
  });
});
