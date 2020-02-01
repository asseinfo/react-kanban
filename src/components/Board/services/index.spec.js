import { getCard, isALaneMove, getCoordinates } from './'

describe('#getCoordinates', () => {
  describe('when the event does not have destination', () => {
    it('returns empty object', () => {
      expect(getCoordinates({ destination: null })).toEqual({})
    })
  })

  describe('when the event is a lane move', () => {
    const event = {
      type: 'BOARD',
      source: { index: 0, droppableId: 0 },
      destination: { index: 1, droppableId: 1 }
    }

    it('returns the lane coordinates', () => {
      expect(getCoordinates(event)).toEqual({ destination: { toPosition: 1 }, source: { fromPosition: 0 } })
    })
  })

  describe('when the event is a card move', () => {
    describe('when both the source lane and the destination lane has a number id', () => {
      const event = {
        type: 'CARD',
        source: { index: 0, droppableId: 0 },
        destination: { index: 1, droppableId: 1 }
      }

      it('returns the card coordinates', () => {
        expect(getCoordinates(event)).toEqual({
          destination: { toLaneId: 1, toPosition: 1 },
          source: { fromLaneId: 0, fromPosition: 0 }
        })
      })
    })

    describe('when any of the source lane or the destination lane has a non-number id', () => {
      const event = {
        type: 'CARD',
        source: { index: 0, droppableId: '0206c8d7-4d48-4d97-b867-86fc2d21074d' },
        destination: { index: 1, droppableId: 1 }
      }

      it('returns the card coordinates', () => {
        expect(getCoordinates(event)).toEqual({
          source: { fromLaneId: '0206c8d7-4d48-4d97-b867-86fc2d21074d', fromPosition: 0 },
          destination: { toLaneId: 1, toPosition: 1 }
        })
      })
    })
  })
})

describe('#isALaneMove', () => {
  describe('when the type is "BOARD"', () => {
    it('returns true', () => {
      expect(isALaneMove('BOARD')).toEqual(true)
    })
  })

  describe('when the type is not "BOARD"', () => {
    it('returns false', () => {
      expect(isALaneMove('IS_NOT_BOARD')).toEqual(false)
    })
  })
})

describe('#getCard', () => {
  const board = {
    lanes: [{ id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] }]
  }

  it('returns the card of the board from the given source', () => {
    expect(getCard(board, { fromLaneId: 1, fromPosition: 1 })).toEqual({ id: 2 })
  })
})
