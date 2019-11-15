import { moveLane, moveCard, addLane, removeLane, renameLane } from './'

describe('#moveLane', () => {
  it('returns a board with the lane moved to the specified position', () => {
    const board = {
      lanes: [
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] }
      ]
    }

    const orderedBoard = moveLane(board, { fromPosition: 0 }, { toPosition: 1 })

    expect(orderedBoard).toEqual({
      lanes: [
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] }
      ]
    })
  })
})

describe('#moveCard', () => {
  describe('when the card is moved in the same lane', () => {
    it('returns a board with the card moved in the same lane to the specified position', () => {
      const board = {
        lanes: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] }
        ]
      }

      const orderedBoard = moveCard(board, { fromPosition: 0, fromLaneId: 1 }, { toPosition: 2, toLaneId: 1 })

      expect(orderedBoard).toEqual({
        lanes: [
          { id: 1, cards: [{ id: 2 }, { id: 3 }, { id: 1 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] }
        ]
      })
    })
  })

  describe('when the card is moved from a lane to another lane', () => {
    it('returns a board with the card moved to another lane to the specified position', () => {
      const board = {
        lanes: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
          { id: 3, cards: [{ id: 7 }, { id: 8 }, { id: 9 }] }
        ]
      }

      const orderedBoard = moveCard(board, { fromPosition: 0, fromLaneId: 1 }, { toPosition: 1, toLaneId: 2 })

      expect(orderedBoard).toEqual({
        lanes: [
          { id: 1, cards: [{ id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 1 }, { id: 5 }, { id: 6 }] },
          { id: 3, cards: [{ id: 7 }, { id: 8 }, { id: 9 }] }
        ]
      })
    })
  })
})

describe('#addLane', () => {
  it('returns a board with the new lane at the specified position', () => {
    const board = {
      lanes: [
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] }
      ]
    }

    const boardWithTheNewLane = addLane(board, { id: 3, cards: [{ id: 7 }] })

    expect(boardWithTheNewLane).toEqual({
      lanes: [
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
        { id: 3, cards: [{ id: 7 }] }
      ]
    })
  })
})

describe('#removeLane', () => {
  it('returns a board without the specified lane', () => {
    const board = {
      lanes: [
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] }
      ]
    }

    const boardWithoutTheLane = removeLane(board, { id: 2 })

    expect(boardWithoutTheLane).toEqual({
      lanes: [{ id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] }]
    })
  })
})

describe('#renameLane', () => {
  it('returns a board with the specified lane renomed to the specified title', () => {
    const board = {
      lanes: [
        { id: 1, title: 'Doing', cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, title: 'Done', cards: [{ id: 4 }, { id: 5 }, { id: 6 }] }
      ]
    }

    const boardWithTheRenamedLane = renameLane(board, { id: 1 }, 'New title')

    expect(boardWithTheRenamedLane).toEqual({
      lanes: [
        { id: 1, title: 'New title', cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, title: 'Done', cards: [{ id: 4 }, { id: 5 }, { id: 6 }] }
      ]
    })
  })
})
