
describe 'Generation', ->
  it 'should die when under-population', ->
    generation = new Generation([
      [ 1, 0 ]
      [ 0, 0 ]
    ])
    result = generation.evolve()

    expect(result).toEqual [
      [ 0, 0 ]
      [ 0, 0 ]
    ]

  it 'should live to the next generation', ->
    generation = new Generation([
      [ 1, 0, 1 ]
      [ 0, 1, 1 ]
    ])
    result = generation.evolve()

    expect(result).toEqual [
      [ 0, 0, 1 ]
      [ 0, 1, 1 ]
    ]

  it 'should die when overcrowding', ->
    generation = new Generation([
      [ 1, 1, 1 ]
      [ 1, 1, 1 ]
    ])
    result = generation.evolve()

    expect(result).toEqual [
      [ 1, 0, 1 ]
      [ 1, 0, 1 ]
    ]

  it 'should reproduce', ->
    generation = new Generation([
      [ 1, 0 ]
      [ 1, 1 ]
    ])
    result = generation.evolve()

    expect(result).toEqual [
      [ 1, 1 ]
      [ 1, 1 ]
    ]

describe 'Generation Patterns : Still lifes', ->
  it 'should generate a Block', ->
    cellGrid = [
      [ 0, 0, 0, 0 ]
      [ 0, 1, 1, 0 ]
      [ 0, 1, 1, 0 ]
      [ 0, 0, 0, 0 ]
    ]

    generation = new Generation(cellGrid)
    result = generation.evolve()
    expect(result).toEqual cellGrid

  it 'should generate a Beehive', ->
    cellGrid = [
      [ 0, 0, 0, 0, 0, 0 ]
      [ 0, 0, 1, 1, 0, 0 ]
      [ 0, 1, 0, 0, 1, 0 ]
      [ 0, 0, 1, 1, 0, 0 ]
      [ 0, 0, 0, 0, 0, 0 ]
    ]
    
    generation = new Generation(cellGrid)
    result = generation.evolve()
    expect(result).toEqual cellGrid

  it 'should generate a Loaf', ->
    cellGrid = [
      [ 0, 0, 0, 0, 0, 0 ]
      [ 0, 0, 1, 1, 0, 0 ]
      [ 0, 1, 0, 0, 1, 0 ]
      [ 0, 0, 1, 0, 1, 0 ]
      [ 0, 0, 0, 1, 0, 0 ]
      [ 0, 0, 0, 0, 0, 0 ]
    ]
    
    generation = new Generation(cellGrid)
    result = generation.evolve()
    expect(result).toEqual cellGrid

  it 'should generate a Boat', ->
    cellGrid = [
      [ 0, 0, 0, 0, 0 ]
      [ 0, 1, 1, 0, 0 ]
      [ 0, 1, 0, 1, 0 ]
      [ 0, 0, 1, 0, 0 ]
      [ 0, 0, 0, 0, 0 ]
    ]
    
    generation = new Generation(cellGrid)
    result = generation.evolve()
    expect(result).toEqual cellGrid

animate = (stages) ->
  for stage, i in stages
    if i + 1 == stages.length
      continue

    nextStage = stages[i + 1]
    generation = new Generation(stage)

    result = generation.evolve()
    expect(result).toEqual nextStage

describe 'Generation Patterns : Oscillators', ->
  it 'should generate a Blinker (period 2)', ->
    stages = []
    stages.push [
      [ 0, 0, 0, 0, 0 ]
      [ 0, 0, 1, 0, 0 ]
      [ 0, 0, 1, 0, 0 ]
      [ 0, 0, 1, 0, 0 ]
      [ 0, 0, 0, 0, 0 ]
    ]
    stages.push [
      [ 0, 0, 0, 0, 0 ]
      [ 0, 0, 0, 0, 0 ]
      [ 0, 1, 1, 1, 0 ]
      [ 0, 0, 0, 0, 0 ]
      [ 0, 0, 0, 0, 0 ]
    ]
    stages.push stages[0]
    stages.push stages[1]

    animate stages

  it 'should generate a Toad (period 2)', ->
    stages = []
    stages.push [
      [ 0, 0, 0, 0, 0, 0 ]
      [ 0, 0, 0, 1, 0, 0 ]
      [ 0, 1, 0, 0, 1, 0 ]
      [ 0, 1, 0, 0, 1, 0 ]
      [ 0, 0, 1, 0, 0, 0 ]
      [ 0, 0, 0, 0, 0, 0 ]
    ]
    stages.push [
      [ 0, 0, 0, 0, 0, 0 ]
      [ 0, 0, 0, 0, 0, 0 ]
      [ 0, 0, 1, 1, 1, 0 ]
      [ 0, 1, 1, 1, 0, 0 ]
      [ 0, 0, 0, 0, 0, 0 ]
      [ 0, 0, 0, 0, 0, 0 ]
    ]
    stages.push stages[0]
    stages.push stages[1]

    animate stages
