import {
  getCard,
  isAColumnMove,
  getCoordinates,
  isMovingAColumnToAnotherPosition,
  isMovingACardToAnotherPosition,
} from './'

describe('#getCoordinates', () => {
  describe('when the event does not have destination', () => {
    it('returns empty object', () => {
      expect(getCoordinates({ destination: null })).toEqual({})
    })
  })

  describe('when the event is a column move', () => {
    const event = {
      type: 'BOARD',
      source: { index: 0, droppableId: 0 },
      destination: { index: 1, droppableId: 1 },
    }

    it('returns the column coordinates', () => {
      expect(getCoordinates(event)).toEqual({ destination: { toPosition: 1 }, source: { fromPosition: 0 } })
    })
  })

  describe('when the event is a card move', () => {
    const board = {
      columns: [
        { id: 1, cards: [{ id: 1 }] },
        { id: '2', cards: [{ id: 2 }] },
      ],
    }

    const event = {
      type: 'CARD',
      source: { index: 0, droppableId: '1' },
      destination: { index: 1, droppableId: '2' },
    }

    it('returns the card coordinates', () => {
      expect(getCoordinates(event, board)).toEqual({
        source: { fromColumnId: 1, fromPosition: 0 },
        destination: { toColumnId: '2', toPosition: 1 },
      })
    })
  })
})

describe('#isAColumnMove', () => {
  describe('when the type is "BOARD"', () => {
    it('returns true', () => {
      expect(isAColumnMove('BOARD')).toEqual(true)
    })
  })

  describe('when the type is not "BOARD"', () => {
    it('returns false', () => {
      expect(isAColumnMove('IS_NOT_BOARD')).toEqual(false)
    })
  })
})

describe('#getCard', () => {
  const board = {
    columns: [{ id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] }],
  }

  it('returns the card of the board from the given source', () => {
    expect(getCard(board, { fromColumnId: 1, fromPosition: 1 })).toEqual({ id: 2 })
  })
})

describe('#isMovingAColumnToAnotherPosition', () => {
  describe('when coordinates does not have same source and destination', () => {
    const validColumnCoordinates = {
      source: { fromPosition: 0 },
      destination: { toPosition: 1 },
    }

    it('returns true', () => {
      expect(isMovingAColumnToAnotherPosition(validColumnCoordinates)).toEqual(true)
    })
  })

  describe('when coordinates has same source and destination', () => {
    const invalidColumnCoordinates = {
      source: { fromPosition: 0 },
      destination: { toPosition: 0 },
    }

    it('returns false', () => {
      expect(isMovingAColumnToAnotherPosition(invalidColumnCoordinates)).toEqual(false)
    })
  })
})

describe('#isMovingACardToAnotherPosition', () => {
  describe('when coordinates does not have same source and destination', () => {
    describe('when the source column is different from the destination column', () => {
      const validCardCoordinates = {
        source: { fromPosition: 0, fromColumnId: 0 },
        destination: { toPosition: 0, toColumnId: 1 },
      }

      it('returns true', () => {
        expect(isMovingACardToAnotherPosition(validCardCoordinates)).toEqual(true)
      })
    })

    describe('when the source position is different from the destination position', () => {
      const validCardCoordinates = {
        source: { fromPosition: 0, fromColumnId: 0 },
        destination: { toPosition: 1, toColumnId: 0 },
      }

      it('returns true', () => {
        expect(isMovingACardToAnotherPosition(validCardCoordinates)).toEqual(true)
      })
    })
  })

  describe('when coordinates has same source and destination', () => {
    const validCardCoordinates = {
      source: { fromPosition: 0, fromColumnId: 0 },
      destination: { toPosition: 0, toColumnId: 0 },
    }

    it('returns false', () => {
      expect(isMovingACardToAnotherPosition(validCardCoordinates)).toEqual(false)
    })
  })
})
