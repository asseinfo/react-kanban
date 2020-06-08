import { moveColumn, moveCard, addColumn, removeColumn, changeColumn, addCard, removeCard } from './helpers'

describe('#moveColumn', () => {
  it('returns a board with the column moved to the specified position', () => {
    const board = {
      columns: [
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      ],
    }

    const orderedBoard = moveColumn(board, { fromPosition: 0 }, { toPosition: 1 })

    expect(orderedBoard).toEqual({
      columns: [
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
      ],
    })
  })
})

describe('#moveCard', () => {
  describe('when the card is moved in the same column', () => {
    it('returns a board with the card moved in the same column to the specified position', () => {
      const board = {
        columns: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
        ],
      }

      const orderedBoard = moveCard(board, { fromPosition: 0, fromColumnId: 1 }, { toPosition: 2, toColumnId: 1 })

      expect(orderedBoard).toEqual({
        columns: [
          { id: 1, cards: [{ id: 2 }, { id: 3 }, { id: 1 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
        ],
      })
    })
  })

  describe('when the card is moved from a column to another column', () => {
    it('returns a board with the card moved to another column to the specified position', () => {
      const board = {
        columns: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
          { id: 3, cards: [{ id: 7 }, { id: 8 }, { id: 9 }] },
        ],
      }

      const orderedBoard = moveCard(board, { fromPosition: 0, fromColumnId: 1 }, { toPosition: 1, toColumnId: 2 })

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

describe('#addColumn', () => {
  it('returns a board with the new column at the specified position', () => {
    const board = {
      columns: [
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      ],
    }

    const boardWithTheNewColumn = addColumn(board, { id: 3, cards: [{ id: 7 }] })

    expect(boardWithTheNewColumn).toEqual({
      columns: [
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
        { id: 3, cards: [{ id: 7 }] },
      ],
    })
  })
})

describe('#removeColumn', () => {
  it('returns a board without the specified column', () => {
    const board = {
      columns: [
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      ],
    }

    const boardWithoutTheColumn = removeColumn(board, { id: 2 })

    expect(boardWithoutTheColumn).toEqual({
      columns: [{ id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] }],
    })
  })
})

describe('#changeColumn', () => {
  it('returns a board with the specified column changed according to passed column', () => {
    const board = {
      columns: [
        { id: 1, title: 'Doing', cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, title: 'Done', cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      ],
    }

    const boardWithTheModifiedColumn = changeColumn(board, { id: 1 }, { title: 'New title' })

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
describe('#addCard', () => {
  describe('when the card is added on top of the column', () => {
    it('returns a board with the new card in the specified column at the specified position', () => {
      const board = {
        columns: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
        ],
      }
      const column = { id: 2 }

      const boardWithTheNewColumn = addCard(board, column, { id: 7 }, { on: 'top' })

      expect(boardWithTheNewColumn).toEqual({
        columns: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 7 }, { id: 4 }, { id: 5 }, { id: 6 }] },
        ],
      })
    })
  })

  describe('when the card is added on bottom of the column', () => {
    it('returns a board with the new card in the specified column at the specified position', () => {
      const board = {
        columns: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
        ],
      }
      const inColumn = { id: 2 }

      const boardWithTheNewColumn = addCard(board, inColumn, { id: 7 }, { on: 'bottom' })

      expect(boardWithTheNewColumn).toEqual({
        columns: [
          { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
          { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }] },
        ],
      })
    })
  })
})

describe('#removeCard', () => {
  it('returns a board without the specified card', () => {
    const board = {
      columns: [
        { id: 1, cards: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      ],
    }
    const fromColumn = { id: 1 }

    const boardWithoutTheCard = removeCard(board, fromColumn, { id: 2 })

    expect(boardWithoutTheCard).toEqual({
      columns: [
        { id: 1, cards: [{ id: 1 }, { id: 3 }] },
        { id: 2, cards: [{ id: 4 }, { id: 5 }, { id: 6 }] },
      ],
    })
  })
})
