import { moveColumn, moveCard, addColumn, removeColumn, changeColumn, addCard, removeCard, changeCard } from './helpers'

// @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#moveColumn', () => {
  // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('returns a board with the column moved to the specified position', () => {
    const board = {
      columns: [
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      ],
    }

    const orderedBoard = moveColumn(board, { fromPosition: 0 }, { toPosition: 1 })

    // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
    expect(orderedBoard).toEqual({
      columns: [
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
      ],
    })
  })
})

// @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#moveCard', () => {
  // @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the card is moved in the same column', () => {
    // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns a board with the card moved in the same column to the specified position', () => {
      const board = {
        columns: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
        ],
      }

      const orderedBoard = moveCard(board, { fromPosition: 0, fromColumnId: 1 }, { toPosition: 2, toColumnId: 1 })

      // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
      expect(orderedBoard).toEqual({
        columns: [
          { id: 1, cards: [{ id: 2 }, { id: 3 }, { id: 1 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
        ],
      })
    })
  })

  // @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the card is moved from a column to another column', () => {
    // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns a board with the card moved to another column to the specified position', () => {
      const board = {
        columns: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
          { id: 3, cards: [{ id: 7 }, { id: 8 }, { id: 9 }] },
        ],
      }

      const orderedBoard = moveCard(board, { fromPosition: 0, fromColumnId: 1 }, { toPosition: 1, toColumnId: 2 })

      // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
      expect(orderedBoard).toEqual({
        columns: [
          { id: 1, cards: [{ id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 1 }, { id: 5 }, { id: 6 }] },
          { id: 3, cards: [{ id: 7 }, { id: 8 }, { id: 9 }] },
        ],
      })
    })
  })
})

// @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#addColumn', () => {
  // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('returns a board with the new column at the specified position', () => {
    const board = {
      columns: [
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      ],
    }

    const boardWithTheNewColumn = addColumn(board, { id: 3, cards: [{ id: 7 }] })

    // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
    expect(boardWithTheNewColumn).toEqual({
      columns: [
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
        { id: 3, cards: [{ id: 7 }] },
      ],
    })
  })
})

// @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#removeColumn', () => {
  // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('returns a board without the specified column', () => {
    const board = {
      columns: [
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      ],
    }

    const boardWithoutTheColumn = removeColumn(board, { id: 2 })

    // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
    expect(boardWithoutTheColumn).toEqual({
      columns: [{ id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] }],
    })
  })
})

// @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#changeColumn', () => {
  // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('returns a board with the specified column changed according to passed column', () => {
    const board = {
      columns: [
        { id: 1, title: 'Doing', cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, title: 'Done', cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      ],
    }

    const boardWithTheModifiedColumn = changeColumn(board, { id: 1 }, { title: 'New title' })

    // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
    expect(boardWithTheModifiedColumn).toEqual({
      columns: [
        { id: 1, title: 'New title', cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, title: 'Done', cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      ],
    })
  })
})

// TODO I'm not happy with this and with the remove card method
// How can we handle this better?
// @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#addCard', () => {
  // @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the card is added on top of the column', () => {
    // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns a board with the new card in the specified column at the specified position', () => {
      const board = {
        columns: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
        ],
      }
      const column = { id: 2 }

      const boardWithTheNewColumn = addCard(board, column, { id: 7 }, { on: 'top' })

      // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
      expect(boardWithTheNewColumn).toEqual({
        columns: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 7 }, { id: 4 }, { id: 5 }, { id: 6 }] },
        ],
      })
    })
  })

  // @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the card is added on bottom of the column', () => {
    // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns a board with the new card in the specified column at the specified position', () => {
      const board = {
        columns: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
        ],
      }
      const inColumn = { id: 2 }

      const boardWithTheNewColumn = addCard(board, inColumn, { id: 7 }, { on: 'bottom' })

      // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
      expect(boardWithTheNewColumn).toEqual({
        columns: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }] },
        ],
      })
    })
  })
})

// @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#removeCard', () => {
  // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('returns a board without the specified card', () => {
    const board = {
      columns: [
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      ],
    }
    const fromColumn = { id: 1 }

    const boardWithoutTheCard = removeCard(board, fromColumn, { id: 2 })

    // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
    expect(boardWithoutTheCard).toEqual({
      columns: [
        { id: 1, cards: [{ id: 1 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      ],
    })
  })
})

// @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#changeCard', () => {
  // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("changes the card's board", () => {
    const board = {
      columns: [
        { id: 1, title: 'Doing', cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, title: 'Done', cards: [{ id: 4 }, { id: 5, foo: 'bar' }, { id: 6 }] },
      ],
    }

    const boardWithTheModifiedCard = changeCard(board, 5, { title: 'New title' })

    // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
    expect(boardWithTheModifiedCard).toEqual({
      columns: [
        { id: 1, title: 'Doing', cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, title: 'Done', cards: [{ id: 4 }, { id: 5, foo: 'bar', title: 'New title' }, { id: 6 }] },
      ],
    })
  })
})
