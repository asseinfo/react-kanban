import reorderBoard from './reorderBoard'

describe('#reorderBoard', () => {
  let subject

  afterEach(() => { subject = undefined })

  describe('when the card is changed of position in same lane', () => {
    beforeEach(() => {
      const board = {
        lanes: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] }
        ]
      }
      subject = reorderBoard(board, { laneId: 1, index: 0 }, { laneId: 1, index: 2 })
    })

    it('returns a board with cards ordered in the lane', () => {
      expect(subject).toEqual({
        lanes: [
          { id: 1, cards: [{ id: 2 }, { id: 3 }, { id: 1 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] }
        ]
      })
    })
  })

  describe('when the card is moved from a lane to another lane', () => {
    beforeEach(() => {
      const board = {
        lanes: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
          { id: 3, cards: [{ id: 7 }, { id: 8 }, { id: 9 }] }
        ]
      }
      subject = reorderBoard(board, { laneId: 1, index: 0 }, { laneId: 2, index: 1 })
    })

    it('returns a board with the card moved to another lane at specified position', () => {
      expect(subject).toEqual({
        lanes: [
          { id: 1, cards: [{ id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 1 }, { id: 5 }, { id: 6 }] },
          { id: 3, cards: [{ id: 7 }, { id: 8 }, { id: 9 }] }
        ]
      })
    })
  })

  describe('when the lane is moved to another position', () => {
    beforeEach(() => {
      const board = {
        lanes: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] }
        ]
      }
      subject = reorderBoard(board, { index: 0 }, { index: 1 })
    })

    it('returns a board with the lane moved to the specified position', () => {
      expect(subject).toEqual({
        lanes: [
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] }
        ]
      })
    })
  })
})
