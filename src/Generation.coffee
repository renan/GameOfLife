
class Generation
  cellGrid: []

  constructor: (@cellGrid) ->

  evolve: ->
    result = []
    for line, y in @cellGrid
      result[y] = []
      for state, x in line
        result[y][x] = @evolveCell(x, y)

    result

  evolveCell: (x, y) ->
    neighbours = @getNeighbours(x, y)
    liveNeighbours = neighbours.filter (state) -> state == 1
    
    live = @cellGrid[y][x] == 1
    live = @willLive live, liveNeighbours.length

    if live then 1 else 0

  willLive: (live, liveNeighbours) ->
    live = switch
      # Rule 1: Any live cell with fewer than two live neighbours dies, as if caused by under-population.
      when live && liveNeighbours < 2 then false

      # Rule 2: Any live cell with two or three live neighbours lives on to the next generation.
      when live && (liveNeighbours == 2 || liveNeighbours == 3) then true

      # Rule 3: Any live cell with more than three live neighbours dies, as if by overcrowding.
      when live && liveNeighbours > 3 then false

      # Rule 4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      when !live && liveNeighbours == 3 then true

      # No match: Return current state
      else live

    live

  getNeighbours: (x, y) ->
    result = []

    neighbours = [
      # top
      [y - 1, x - 1], [y - 1, x], [y - 1, x + 1],

      # middle
      [y, x - 1], [y, x + 1],

      # bottom
      [y + 1, x - 1], [y + 1, x], [y + 1, x + 1]
    ]

    for neighbour in neighbours
      if @cellGrid[neighbour[0]]? && @cellGrid[neighbour[0]][neighbour[1]]?
        result.push @cellGrid[neighbour[0]][neighbour[1]]

    result

module.exports = Generation
