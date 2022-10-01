import {
  getCard,
  isAColumnMove,
  getCoordinates,
  isMovingAColumnToAnotherPosition,
  isMovingACardToAnotherPosition,
} from '../../components/Board/services'

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#getCoordinates', () => {
  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the event does not have destination', () => {
    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns empty object', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(getCoordinates({ destination: null })).toEqual({})
    })
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the event is a column move', () => {
    const event = {
      type: 'BOARD',
      source: { index: 0, droppableId: 0 },
      destination: { index: 1, droppableId: 1 },
    }

    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns the column coordinates', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(getCoordinates(event)).toEqual({ destination: { toPosition: 1 }, source: { fromPosition: 0 } })
    })
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
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

    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns the card coordinates', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(getCoordinates(event, board)).toEqual({
        source: { fromColumnId: 1, fromPosition: 0 },
        destination: { toColumnId: '2', toPosition: 1 },
      })
    })
  })
})

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#isAColumnMove', () => {
  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the type is "BOARD"', () => {
    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(isAColumnMove('BOARD')).toEqual(true)
    })
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the type is not "BOARD"', () => {
    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns false', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(isAColumnMove('IS_NOT_BOARD')).toEqual(false)
    })
  })
})

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#getCard', () => {
  const board = {
    columns: [{ id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] }],
  }

  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('returns the card of the board from the given source', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(getCard(board, { fromColumnId: 1, fromPosition: 1 })).toEqual({ id: 2 })
  })
})

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#isMovingAColumnToAnotherPosition', () => {
  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when coordinates does not have same source and destination', () => {
    const validColumnCoordinates = {
      source: { fromPosition: 0 },
      destination: { toPosition: 1 },
    }

    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(isMovingAColumnToAnotherPosition(validColumnCoordinates)).toEqual(true)
    })
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when coordinates has same source and destination', () => {
    const invalidColumnCoordinates = {
      source: { fromPosition: 0 },
      destination: { toPosition: 0 },
    }

    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns false', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(isMovingAColumnToAnotherPosition(invalidColumnCoordinates)).toEqual(false)
    })
  })
})

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#isMovingACardToAnotherPosition', () => {
  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when coordinates does not have same source and destination', () => {
    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the source column is different from the destination column', () => {
      const validCardCoordinates = {
        source: { fromPosition: 0, fromColumnId: 0 },
        destination: { toPosition: 0, toColumnId: 1 },
      }

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('returns true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(isMovingACardToAnotherPosition(validCardCoordinates)).toEqual(true)
      })
    })

    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the source position is different from the destination position', () => {
      const validCardCoordinates = {
        source: { fromPosition: 0, fromColumnId: 0 },
        destination: { toPosition: 1, toColumnId: 0 },
      }

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('returns true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(isMovingACardToAnotherPosition(validCardCoordinates)).toEqual(true)
      })
    })
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when coordinates has same source and destination', () => {
    const validCardCoordinates = {
      source: { fromPosition: 0, fromColumnId: 0 },
      destination: { toPosition: 0, toColumnId: 0 },
    }

    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns false', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(isMovingACardToAnotherPosition(validCardCoordinates)).toEqual(false)
    })
  })
})
