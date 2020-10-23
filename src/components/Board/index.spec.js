import { useState } from 'react'
import { render, within, act, fireEvent, screen } from '@testing-library/react'
import Board from './'
import { callbacks } from 'react-beautiful-dnd'
import { moveCard } from '@services/helpers'

describe('<Board />', () => {
  let subject, onCardDragEnd, onColumnDragEnd, onColumnRemove, onColumnRename, onCardRemove
  const board = {
    columns: [
      {
        id: 1,
        title: 'Column Backlog',
        cards: [
          {
            id: 1,
            title: 'Card title 1',
            description: 'Card content',
          },
          {
            id: 2,
            title: 'Card title 2',
            description: 'Card content',
          },
        ],
      },
      {
        id: 2,
        title: 'Column Doing',
        cards: [
          {
            id: 3,
            title: 'Card title 3',
            description: 'Card content',
          },
        ],
      },
    ],
  }

  afterEach(() => {
    jest.clearAllMocks()
    subject = onCardDragEnd = onColumnDragEnd = onColumnRemove = onCardRemove = undefined
  })

  describe('when the board is controlled', () => {
    function ControlledBoard({ children, ...props }) {
      const [board, setBoard] = useState(children)

      function handleCardMoving() {
        setBoard(moveCard(board, { fromPosition: 0, fromColumnId: 1 }, { toPosition: 1, toColumnId: 1 }))
      }

      return (
        <>
          <button onClick={handleCardMoving}>Move card</button>
          <Board {...props}>{board}</Board>
        </>
      )
    }

    function mount({ children = board, ...props } = {}) {
      subject = render(<ControlledBoard children={children} {...props} />)
      return subject
    }

    it('renders a board according to the children prop', () => {
      const { queryByText, queryByTestId } = mount()

      const column = within(queryByTestId('column-1'))
      const cards = column.queryAllByText(/^Card title/)

      expect(cards).toHaveLength(2)
      expect(cards[0]).toHaveTextContent(/^Card title 1$/)
      expect(cards[1]).toHaveTextContent(/^Card title 2$/)

      fireEvent.click(queryByText('Move card', { selector: 'button' }))

      const movedCards = column.queryAllByText(/^Card title/)

      expect(movedCards).toHaveLength(2)
      expect(movedCards[0]).toHaveTextContent(/^Card title 2$/)
      expect(movedCards[1]).toHaveTextContent(/^Card title 1$/)
    })

    describe('about the card moving', () => {
      describe('when the component receives "onCardDragEnd" callback', () => {
        beforeEach(() => {
          onCardDragEnd = jest.fn()
          mount({ onCardDragEnd })
        })

        describe('when the user cancels the card moving', () => {
          beforeEach(() => {
            callbacks.onDragEnd({ source: null, destination: null })
          })

          it('does not call onCardDragEnd callback', () => {
            expect(onCardDragEnd).not.toHaveBeenCalled()
          })
        })

        describe('whe the user moves a card to the same position', () => {
          beforeEach(() => {
            act(() => {
              callbacks.onDragEnd({
                source: { droppableId: '1', index: 0 },
                destination: { droppableId: '1', index: 0 },
              })
            })
          })

          it('does not call onCardDragEnd callback', () => {
            expect(onCardDragEnd).not.toHaveBeenCalled()
          })
        })

        describe('when the user moves a card to another position', () => {
          beforeEach(() => {
            act(() => {
              callbacks.onDragEnd({
                source: { droppableId: '1', index: 0 },
                destination: { droppableId: '1', index: 1 },
              })
            })
          })

          it('calls the onCardDragEnd callback passing the card and the move coordinates', () => {
            expect(onCardDragEnd).toHaveBeenCalledTimes(1)
            expect(onCardDragEnd).toHaveBeenCalledWith(
              { id: 1, description: 'Card content', title: 'Card title 1' },
              { fromPosition: 0, fromColumnId: 1 },
              { toPosition: 1, toColumnId: 1 }
            )
          })
        })
      })
    })

    describe('about the column moving', () => {
      describe('when the component receives "onColumnDragEnd" callback', () => {
        beforeEach(() => {
          onColumnDragEnd = jest.fn()
          mount({ onColumnDragEnd })
        })

        describe('when the user cancels the column moving', () => {
          beforeEach(() => {
            callbacks.onDragEnd({ source: null, destination: null, type: 'BOARD' })
          })

          it('does not call onColumnDragEnd callback', () => {
            expect(onColumnDragEnd).not.toHaveBeenCalled()
          })
        })

        describe('when the user moves a column to same position', () => {
          beforeEach(() => {
            act(() => {
              callbacks.onDragEnd({ source: { index: 0 }, destination: { index: 0 }, type: 'BOARD' })
            })
          })

          it('does not call onColumnDragEnd callback', () => {
            expect(onColumnDragEnd).not.toHaveBeenCalled()
          })
        })

        describe('when the user moves a column to another position', () => {
          beforeEach(() => {
            act(() => {
              callbacks.onDragEnd({ source: { index: 0 }, destination: { index: 1 }, type: 'BOARD' })
            })
          })

          it('calls the onColumnDragEnd callback passing the column and the move coordinates', () => {
            expect(onColumnDragEnd).toHaveBeenCalledTimes(1)
            expect(onColumnDragEnd).toHaveBeenCalledWith(
              expect.objectContaining({ title: 'Column Backlog' }),
              { fromPosition: 0 },
              { toPosition: 1 }
            )
          })
        })
      })
    })

    describe("about the board's custom card", () => {
      let renderCard
      const board = {
        columns: [
          {
            id: 1,
            title: 'Column Backlog',
            cards: [
              {
                id: 1,
                title: 'Card title',
                content: 'Card content',
              },
              {
                id: 2,
                title: 'Card title',
                content: 'Card content',
              },
            ],
          },
          {
            id: 2,
            title: 'Column Doing',
            cards: [
              {
                id: 3,
                title: 'Card title',
                content: 'Card content',
              },
            ],
          },
        ],
      }

      afterEach(() => {
        renderCard = undefined
      })

      describe('when it receives a "renderCard" prop', () => {
        beforeEach(() => {
          renderCard = jest.fn((cardContent) => (
            <div>
              {cardContent.id} - {cardContent.title} - {cardContent.content}
            </div>
          ))

          mount({ children: board, renderCard })
        })

        it("renders the custom cards on the board's column", () => {
          const cards = subject.queryAllByText(/\d+ - Card title - Card content$/)
          expect(cards).toHaveLength(3)
        })

        // FIXME It shouldn't be receiving the bag, just the dragging prop?! Maybe, just a typo in spec.
        it('passes the card content and the card bag as a parameter to the renderCard prop', () => {
          expect(renderCard).toHaveBeenCalledWith(
            { id: 1, title: 'Card title', content: 'Card content' },
            { dragging: false }
          )
        })
      })
    })

    describe("about the column's header", () => {
      let renderColumnHeader
      const board = {
        columns: [
          {
            id: 1,
            title: 'Column Backlog',
            wip: 1,
            cards: [{ id: 2, title: 'Card title', content: 'Card content' }],
          },
        ],
      }

      afterEach(() => {
        renderColumnHeader = undefined
      })

      describe('when the component receives a "renderColumnHeader" prop', () => {
        beforeEach(() => {
          renderColumnHeader = jest.fn((columnContent) => (
            <div>
              {columnContent.title} ({columnContent.wip})
            </div>
          ))

          mount({ children: board, renderColumnHeader })
        })

        it("renders the custom header on the board's column", () => {
          expect(subject.queryAllByTestId(/column/)).toHaveLength(1)
          expect(subject.queryByTestId('column-1')).toHaveTextContent(/Column Backlog \(1\)/)
        })

        it('passes the column content to the "renderColumnHeader" prop', () => {
          expect(renderColumnHeader).toHaveBeenCalledTimes(1)
          expect(renderColumnHeader).toHaveBeenCalledWith({
            id: 1,
            title: 'Column Backlog',
            wip: 1,
            cards: [{ id: 2, title: 'Card title', content: 'Card content' }],
          })
        })
      })

      describe('when the component does not receive a "renderColumnHeader" prop', () => {
        beforeEach(() => mount({ children: board }))

        it("renders the default header on the board's column", () => {
          expect(subject.queryAllByTestId(/column/)).toHaveLength(1)
          expect(subject.queryByTestId('column-1')).toHaveTextContent(/Column Backlog/)
        })
      })
    })

    describe('about the column adding', () => {
      describe('about the default column adder', () => {
        describe('when the component does not receive "allowAddColumn" prop', () => {
          let onNewColumnConfirm

          beforeEach(() => {
            onNewColumnConfirm = jest.fn()
            mount({ allowAddColumn: false, onNewColumnConfirm })
          })
          afterEach(() => {
            onNewColumnConfirm = undefined
          })

          it('does not render the column adder', () => {
            expect(subject.queryByText('➕')).not.toBeInTheDocument()
          })
        })

        describe('when the component does not receive "onNewColumnConfirm" prop', () => {
          beforeEach(() => {
            mount({ allowAddColumn: true })
          })

          it('does not render the column adder', () => {
            expect(subject.queryByText('➕')).not.toBeInTheDocument()
          })
        })

        describe('when it receives the "allowAddColumn" and "onNewColumnConfirm" prop', () => {
          let onNewColumnConfirm

          beforeEach(() => {
            onNewColumnConfirm = jest.fn()
            mount({ allowAddColumn: true, onNewColumnConfirm })
          })
          afterEach(() => {
            onNewColumnConfirm = undefined
          })

          it('renders the column placeholder as the last column to add a new column', () => {
            expect(subject.queryByText('➕')).toBeInTheDocument()
          })

          describe('when the user clicks to add a new column', () => {
            beforeEach(() => fireEvent.click(subject.queryByText('➕')))

            it('hides the column placeholder', () => {
              expect(subject.queryByText('➕')).not.toBeInTheDocument()
            })

            it('renders the input asking for a column title', () => {
              expect(subject.container.querySelector('input')).toBeInTheDocument()
            })

            describe('when the user confirms the new column', () => {
              beforeEach(() => {
                fireEvent.change(subject.container.querySelector('input'), {
                  target: { value: 'Column Added by user' },
                })
                fireEvent.click(subject.queryByText('Add'))
              })

              it('calls the "onNewColumnConfirm" passing the new column', () => {
                expect(onNewColumnConfirm).toHaveBeenCalledTimes(1)
                expect(onNewColumnConfirm).toHaveBeenCalledWith({ title: 'Column Added by user', cards: [] })
              })
            })

            describe('when the user cancels the new column adding', () => {
              beforeEach(() => {
                fireEvent.click(subject.queryByText('Cancel'))
              })

              it('does not call the "onNewColumnConfirm" passing the new column', () => {
                expect(onNewColumnConfirm).not.toHaveBeenCalled()
              })
            })
          })
        })
      })

      describe('about custom column adder', () => {
        describe('when the component receives a custom column adder', () => {
          let renderColumnAdder

          describe('when the component does not receive "allowAddColumn" prop', () => {
            beforeEach(() => {
              renderColumnAdder = jest.fn(() => (
                <div>
                  <input data-testid='columnAdder' />
                </div>
              ))

              mount({ renderColumnAdder })
            })

            it('does not render the custom render adder', () => {
              expect(subject.queryByTestId('columnAdder')).not.toBeInTheDocument()
            })
          })

          describe('when the component receives the "allowAddColumn" prop', () => {
            beforeEach(() => {
              renderColumnAdder = jest.fn(() => (
                <div data-testid='columnAdder'>
                  <button>Add column</button>
                </div>
              ))

              mount({ children: board, renderColumnAdder, allowAddColumn: true })
            })

            it('renders the custom column adder as the last column to add a new column', () => {
              expect(subject.queryByTestId('columnAdder')).toBeInTheDocument()
            })

            // TODO it needs spec for the renderColumnAdder callback
          })
        })
      })
    })

    describe('about the column removing', () => {
      beforeEach(() => {
        onColumnRemove = jest.fn()
      })

      describe('when the component uses the default header template', () => {
        describe('when the component receives the "allowRemoveColumn" prop', () => {
          beforeEach(() => mount({ allowRemoveColumn: true, onColumnRemove }))

          it('does not call the "onColumnRemove callback', () => {
            expect(onColumnRemove).not.toHaveBeenCalled()
          })

          describe('when the user clicks to remove a column', () => {
            beforeEach(() => {
              const removeColumnButton = within(subject.queryByTestId('column-1')).queryByText('×')
              fireEvent.click(removeColumnButton)
            })

            it('calls the "onColumnRemove" callback passing the column to be removed', () => {
              expect(onColumnRemove).toHaveBeenCalledTimes(1)
              expect(onColumnRemove).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }))
            })
          })
        })
      })

      describe('when the component receives a custom header column template', () => {
        let renderColumnHeader

        beforeEach(() => {
          renderColumnHeader = jest.fn(({ title }) => <div>{title}</div>)
          onColumnRemove = jest.fn()
          mount({ renderColumnHeader, onColumnRemove })
        })

        it('does not call the "onColumnRemove" callback', () => {
          expect(onColumnRemove).not.toHaveBeenCalled()
        })
      })
    })

    describe('about the column renaming', () => {
      describe('when the component use the default header template', () => {
        describe('when the component receives the "allowRenameColumn" prop', () => {
          beforeEach(() => {
            onColumnRename = jest.fn()
            mount({ allowRenameColumn: true, onColumnRename })
          })

          it('does not call the "onColumnRename" callback', () => {
            expect(onColumnRename).not.toHaveBeenCalled()
          })

          describe('when the user renames a column', () => {
            beforeEach(() => {
              fireEvent.click(within(subject.queryByTestId('column-1')).queryByText('Column Backlog'))
              fireEvent.change(subject.container.querySelector('input'), { target: { value: 'New title' } })
              fireEvent.click(subject.queryByText('Rename', { selector: 'button' }))
            })

            it('does not rename the column', () => {
              expect(subject.queryByText('Column Backlog')).toBeInTheDocument()
              expect(subject.queryByText('New title')).not.toBeInTheDocument()
            })

            it('calls the "onColumnRename" callback passing the column to be renamed', () => {
              expect(onColumnRename).toHaveBeenCalledTimes(1)
              expect(onColumnRename).toHaveBeenCalledWith(
                expect.objectContaining({ id: 1, title: 'Column Backlog' }),
                'New title'
              )
            })
          })
        })

        describe('when the component does not receive the "allowRenameColumn" prop', () => {
          beforeEach(() => {
            onColumnRename = jest.fn()
            mount({ onColumnRename })
          })

          it('does not call the "onColumnRename" callback', () => {
            expect(onColumnRename).not.toHaveBeenCalled()
          })

          it('does not show the button on column header to remove the column', () => {
            expect(subject.queryByTestId('column-1').querySelector('button')).not.toBeInTheDocument()
          })
        })
      })

      describe('when the component receives a custom header column template', () => {
        beforeEach(() => {
          const renderColumnHeader = ({ title }) => <div>{title}</div>
          onColumnRename = jest.fn()
          mount({ renderColumnHeader, onColumnRename })
        })

        it('does not call the "onColumnRename" callback', () => {
          expect(onColumnRename).not.toHaveBeenCalled()
        })
      })
    })

    describe('about the card removing', () => {
      beforeEach(() => {
        onCardRemove = jest.fn()
      })

      describe('when the component uses the default card template', () => {
        describe('when the component receives the "allowRemoveCard" prop', () => {
          beforeEach(() => mount({ allowRemoveCard: true, onCardRemove }))

          it('does not call the "onCardRemove" callback', () => {
            expect(onCardRemove).not.toHaveBeenCalled()
          })

          describe('when the user clicks to remove a card from a column', () => {
            beforeEach(() => {
              const removeCardButton = within(subject.queryByTestId('card-1')).queryByText('×')
              fireEvent.click(removeCardButton)
            })

            it('calls the "onCardRemove" callback passing the card to be removed', () => {
              expect(onCardRemove).toHaveBeenCalledTimes(1)
              expect(onCardRemove).toHaveBeenCalledWith(expect.objectContaining({ id: 1, title: 'Card title 1' }))
            })
          })
        })
      })

      describe('when the component receives a custom card template', () => {
        let renderCard

        beforeEach(() => {
          renderCard = jest.fn(({ title }) => <div>{title}</div>)
          onCardRemove = jest.fn()
          mount({ renderCard, onCardRemove })
        })

        it('does not call the "onCardRemove" callback', () => {
          expect(onCardRemove).not.toHaveBeenCalled()
        })
      })
    })
  })

  describe('when the board is uncontrolled', () => {
    function mount({ Component = Board, initialBoard = board, ...props } = {}) {
      subject = render(<Component initialBoard={initialBoard} {...props} />)
      return subject
    }

    function UselessState({ initialBoard, ...props }) {
      const [board, setBoard] = useState(initialBoard)

      function handleCardMoving() {
        setBoard(moveCard(board, { fromPosition: 0, fromColumnId: 1 }, { toPosition: 1, toColumnId: 1 }))
      }

      return (
        <>
          <button onClick={handleCardMoving}>Move card</button>
          <Board initialBoard={board} {...props} />
        </>
      )
    }

    it('renders a board only on mounting according to the initialBoard prop', () => {
      expect(mount().container.querySelector('div')).toBeInTheDocument()
    })

    it('does not rerender on initialBoard change', () => {
      const { queryByText, queryByTestId } = mount({ Component: UselessState })

      const column = within(queryByTestId('column-1'))
      const cards = column.queryAllByText(/^Card title/)

      expect(cards).toHaveLength(2)
      expect(cards[0]).toHaveTextContent(/^Card title 1$/)
      expect(cards[1]).toHaveTextContent(/^Card title 2$/)

      fireEvent.click(queryByText('Move card', { selector: 'button' }))

      const movedCards = column.queryAllByText(/^Card title/)

      expect(movedCards).toHaveLength(2)
      expect(movedCards[0]).toHaveTextContent(/^Card title 1$/)
      expect(movedCards[1]).toHaveTextContent(/^Card title 2$/)
    })

    it('renders the specified columns in the board ordered by its specified position', () => {
      const columns = mount().queryAllByText(/^Column/)
      expect(columns).toHaveLength(2)
      expect(columns[0]).toHaveTextContent(/^Column Backlog$/)
      expect(columns[1]).toHaveTextContent(/^Column Doing$/)
    })

    it('renders the specified cards in their columns', () => {
      const column = within(mount().queryByTestId('column-1'))
      const cards = column.queryAllByText(/^Card title/)
      expect(cards).toHaveLength(2)
    })

    describe('about the card moving', () => {
      describe('when the component receives "onCardDragEnd" callback', () => {
        beforeEach(() => {
          onCardDragEnd = jest.fn()
          mount({ onCardDragEnd })
        })

        describe('when the user cancels the card moving', () => {
          beforeEach(() => {
            callbacks.onDragEnd({ source: null, destination: null })
          })

          it('does not call onCardDragEnd callback', () => {
            expect(onCardDragEnd).not.toHaveBeenCalled()
          })
        })

        describe('whe the user moves a card to the same position', () => {
          beforeEach(() => {
            act(() => {
              callbacks.onDragEnd({
                source: { droppableId: '1', index: 0 },
                destination: { droppableId: '1', index: 0 },
              })
            })
          })

          it('does not call onCardDragEnd callback', () => {
            expect(onCardDragEnd).not.toHaveBeenCalled()
          })
        })

        describe('when the user moves a card to another position', () => {
          beforeEach(() => {
            act(() => {
              callbacks.onDragEnd({
                source: { droppableId: '1', index: 0 },
                destination: { droppableId: '1', index: 1 },
              })
            })
          })

          it('calls the onCardDragEnd callback passing the modified board, the card and the move coordinates', () => {
            const expectedBoard = {
              columns: [
                {
                  id: 1,
                  title: 'Column Backlog',
                  cards: [
                    {
                      id: 2,
                      title: 'Card title 2',
                      description: 'Card content',
                    },
                    {
                      id: 1,
                      title: 'Card title 1',
                      description: 'Card content',
                    },
                  ],
                },
                {
                  id: 2,
                  title: 'Column Doing',
                  cards: [
                    {
                      id: 3,
                      title: 'Card title 3',
                      description: 'Card content',
                    },
                  ],
                },
              ],
            }
            expect(onCardDragEnd).toHaveBeenCalledTimes(1)
            expect(onCardDragEnd).toHaveBeenCalledWith(
              expectedBoard,
              { description: 'Card content', id: 1, title: 'Card title 1' },
              { fromPosition: 0, fromColumnId: 1 },
              { toPosition: 1, toColumnId: 1 }
            )
          })
        })
      })
    })

    describe('about the column moving', () => {
      describe('when the component receives "onColumnDragEnd" callback', () => {
        beforeEach(() => {
          onColumnDragEnd = jest.fn()
          mount({ onColumnDragEnd })
        })

        describe('when the user cancels the column moving', () => {
          beforeEach(() => {
            callbacks.onDragEnd({ source: null, destination: null, type: 'BOARD' })
          })

          it('does not call onColumnDragEnd callback', () => {
            expect(onColumnDragEnd).not.toHaveBeenCalled()
          })
        })

        describe('when the user moves a column to same position', () => {
          beforeEach(() => {
            act(() => {
              callbacks.onDragEnd({ source: { index: 0 }, destination: { index: 0 }, type: 'BOARD' })
            })
          })

          it('does not call onColumnDragEnd callback', () => {
            expect(onColumnDragEnd).not.toHaveBeenCalled()
          })
        })

        describe('when the user moves a column to another position', () => {
          beforeEach(() => {
            act(() => {
              callbacks.onDragEnd({ source: { index: 0 }, destination: { index: 1 }, type: 'BOARD' })
            })
          })

          it('calls the onColumnDragEnd callback passing the modified board, the column, and the column move coordinates', () => {
            const expectedBoard = {
              columns: [
                {
                  id: 2,
                  title: 'Column Doing',
                  cards: [
                    {
                      id: 3,
                      title: 'Card title 3',
                      description: 'Card content',
                    },
                  ],
                },
                {
                  id: 1,
                  title: 'Column Backlog',
                  cards: [
                    {
                      id: 1,
                      title: 'Card title 1',
                      description: 'Card content',
                    },
                    {
                      id: 2,
                      title: 'Card title 2',
                      description: 'Card content',
                    },
                  ],
                },
              ],
            }

            expect(onColumnDragEnd).toHaveBeenCalledTimes(1)
            expect(onColumnDragEnd).toHaveBeenCalledWith(
              expectedBoard,
              expect.objectContaining({ title: 'Column Backlog' }),
              { fromPosition: 0 },
              { toPosition: 1 }
            )
          })
        })
      })
    })

    describe("about the board's custom card", () => {
      let renderCard
      const board = {
        columns: [
          {
            id: 1,
            title: 'Column Backlog',
            cards: [
              {
                id: 1,
                title: 'Card title',
                content: 'Card content',
              },
              {
                id: 2,
                title: 'Card title',
                content: 'Card content',
              },
            ],
          },
          {
            id: 2,
            title: 'Column Doing',
            cards: [
              {
                id: 3,
                title: 'Card title',
                content: 'Card content',
              },
            ],
          },
        ],
      }

      afterEach(() => {
        renderCard = undefined
      })

      describe('when it receives a "renderCard" prop', () => {
        beforeEach(() => {
          renderCard = jest.fn((cardContent) => (
            <div>
              {cardContent.id} - {cardContent.title} - {cardContent.content}
            </div>
          ))

          mount({ initialBoard: board, renderCard })
        })

        it("renders the custom cards on the board's column", () => {
          const cards = subject.queryAllByText(/\d+ - Card title - Card content$/)
          expect(cards).toHaveLength(3)
        })

        it('passes the card content and the card bag as a parameter to the renderCard prop', () => {
          expect(renderCard).toHaveBeenCalledWith(
            { id: 1, title: 'Card title', content: 'Card content' },
            { removeCard: expect.any(Function), dragging: false }
          )
        })
      })
    })

    describe("about the column's header", () => {
      let renderColumnHeader
      const board = {
        columns: [
          {
            id: 1,
            title: 'Column Backlog',
            wip: 1,
            cards: [{ id: 2, title: 'Card title', content: 'Card content' }],
          },
        ],
      }

      afterEach(() => {
        renderColumnHeader = undefined
      })

      describe('when the component receives a "renderColumnHeader" prop', () => {
        beforeEach(() => {
          renderColumnHeader = jest.fn((columnContent) => (
            <div>
              {columnContent.title} ({columnContent.wip})
            </div>
          ))

          mount({ initialBoard: board, renderColumnHeader })
        })

        it("renders the custom header on the board's column", () => {
          expect(subject.queryAllByTestId(/column/)).toHaveLength(1)
          expect(subject.queryByTestId('column-1')).toHaveTextContent(/Column Backlog \(1\)/)
        })

        it('passes the column content, the "removeColumn" and the "renameColumn" to the "renderColumnHeader" prop', () => {
          expect(renderColumnHeader).toHaveBeenCalledTimes(1)
          expect(renderColumnHeader).toHaveBeenCalledWith(
            {
              id: 1,
              title: 'Column Backlog',
              wip: 1,
              cards: [{ id: 2, title: 'Card title', content: 'Card content' }],
            },
            { removeColumn: expect.any(Function), renameColumn: expect.any(Function), addCard: expect.any(Function) }
          )
        })
      })

      describe('when the component does not receive a "renderColumnHeader" prop', () => {
        beforeEach(() => mount({ initialBoard: board }))

        it("renders the default header on the board's column", () => {
          expect(subject.queryAllByTestId(/column/)).toHaveLength(1)
          expect(subject.queryByTestId('column-1')).toHaveTextContent(/Column Backlog/)
        })
      })
    })

    describe('about the column adding', () => {
      describe('about the default column adder', () => {
        describe('when the component does not receive "allowAddColumn" prop', () => {
          let onColumnNew, onNewColumnConfirm

          beforeEach(() => {
            onColumnNew = jest.fn()
            onNewColumnConfirm = jest.fn((column) => new Promise((resolve) => resolve({ id: 999, ...column })))
            mount({ allowAddColumn: false, onNewColumnConfirm, onColumnNew })
          })
          afterEach(() => {
            onColumnNew = undefined
            onNewColumnConfirm = undefined
          })

          it('does not render the column adder', () => {
            expect(subject.queryByText('➕')).not.toBeInTheDocument()
          })
        })

        describe('when the component does not receive "onNewColumnConfirm" prop', () => {
          beforeEach(() => {
            mount({ allowAddColumn: true })
          })

          it('does not render the column adder', () => {
            expect(subject.queryByText('➕')).not.toBeInTheDocument()
          })
        })

        describe('when it receives the "allowAddColumn" and "onNewColumnConfirm" prop', () => {
          let onColumnNew, onNewColumnConfirm

          beforeEach(() => {
            onColumnNew = jest.fn()
            onNewColumnConfirm = jest.fn((column) => new Promise((resolve) => resolve({ id: 999, ...column })))
            mount({ allowAddColumn: true, onNewColumnConfirm, onColumnNew })
          })
          afterEach(() => {
            onColumnNew = undefined
            onNewColumnConfirm = undefined
          })

          it('renders the column placeholder as the last column to add a new column', () => {
            expect(subject.queryByText('➕')).toBeInTheDocument()
          })

          describe('when the user clicks to add a new column', () => {
            beforeEach(() => fireEvent.click(subject.queryByText('➕')))

            it('hides the column placeholder', () => {
              expect(subject.queryByText('➕')).not.toBeInTheDocument()
            })

            it('renders the input asking for a column title', () => {
              expect(subject.container.querySelector('input')).toBeInTheDocument()
            })

            describe('when the user confirms the new column', () => {
              beforeEach(async () => {
                fireEvent.change(subject.container.querySelector('input'), {
                  target: { value: 'Column Added by user' },
                })
                fireEvent.click(subject.queryByText('Add'))
                await screen.findByTestId('column-999')
              })

              it('calls the "onNewColumnConfirm" passing the new column', () => {
                expect(onNewColumnConfirm).toHaveBeenCalledTimes(1)
                expect(onNewColumnConfirm).toHaveBeenCalledWith({ title: 'Column Added by user', cards: [] })
              })

              it('renders the new column using the id returned on "onNewColumnConfirm"', () => {
                expect(subject.queryAllByTestId(/column-\d+/)).toHaveLength(3)
              })

              it('renders the column placeholder as the last column to add a new column', () => {
                expect(subject.queryByText('➕')).toBeInTheDocument()
              })

              it('calls the "onColumnNew" passing the modified board and the added column', () => {
                expect(onColumnNew).toHaveBeenCalledTimes(1)
                expect(onColumnNew).toHaveBeenCalledWith(
                  {
                    columns: [
                      expect.objectContaining({ id: 1 }),
                      expect.objectContaining({ id: 2 }),
                      expect.objectContaining({ id: 999 }),
                    ],
                  },
                  { id: 999, title: 'Column Added by user', cards: [] }
                )
              })
            })

            describe('when the user cancels the new column adding', () => {
              beforeEach(() => {
                fireEvent.click(subject.queryByText('Cancel'))
              })

              it('does not add any new column', () => {
                expect(subject.queryAllByTestId(/column-\d+/)).toHaveLength(2)
              })

              it('renders the column placeholder as the last column to add a new column', () => {
                expect(subject.queryByText('➕')).toBeInTheDocument()
              })
            })
          })
        })
      })

      describe('about custom column adder', () => {
        describe('when the component receives a custom column adder', () => {
          let onColumnNew, renderColumnAdder

          describe('when the component does not receive "allowAddColumn" prop', () => {
            beforeEach(() => {
              renderColumnAdder = jest.fn(() => (
                <div>
                  <input data-testid='columnAdder' />
                </div>
              ))

              mount({ renderColumnAdder })
            })

            it('does not render the custom render adder', () => {
              expect(subject.queryByTestId('columnAdder')).not.toBeInTheDocument()
            })
          })

          describe('when the component receives the "allowAddColumn" prop', () => {
            beforeEach(() => {
              onColumnNew = jest.fn()
              renderColumnAdder = jest.fn(({ addColumn }) => (
                <div data-testid='columnAdder'>
                  <button onClick={() => addColumn({ id: 99, title: 'New column', cards: [] })}>Add column</button>
                </div>
              ))

              mount({ children: board, renderColumnAdder, allowAddColumn: true, onColumnNew })
            })

            it('renders the custom column adder as the last column to add a new column', () => {
              expect(subject.queryByTestId('columnAdder')).toBeInTheDocument()
            })

            it('passes the "addColumn" to the "renderColumnAdder" prop', () => {
              expect(renderColumnAdder).toHaveBeenCalledTimes(1)
              expect(renderColumnAdder).toHaveBeenCalledWith({ addColumn: expect.any(Function) })
            })

            describe('when the "addColumn" callback is called', () => {
              beforeEach(() => fireEvent.click(within(subject.queryByTestId('columnAdder')).queryByText('Add column')))

              it('renders the new column', () => {
                const column = subject.queryAllByTestId(/column-\d+/)
                expect(column).toHaveLength(3)
                expect(column[2]).toHaveTextContent('New column')
              })

              it('calls the "onColumnNew" callback passing both the updated board and the added column', () => {
                expect(onColumnNew).toHaveBeenCalledTimes(1)
                expect(onColumnNew).toHaveBeenCalledWith(
                  {
                    columns: [
                      expect.objectContaining({ id: 1 }),
                      expect.objectContaining({ id: 2 }),
                      expect.objectContaining({ id: 99, title: 'New column' }),
                    ],
                  },
                  expect.objectContaining({ id: 99, title: 'New column' })
                )
              })
            })
          })
        })
      })
    })

    describe('about the column removing', () => {
      beforeEach(() => {
        onColumnRemove = jest.fn()
      })

      describe('when the component uses the default header template', () => {
        describe('when the component receives the "allowRemoveColumn" prop', () => {
          beforeEach(() => mount({ allowRemoveColumn: true, onColumnRemove }))

          it('does not call the "onColumnRemove callback', () => {
            expect(onColumnRemove).not.toHaveBeenCalled()
          })

          describe('when the user clicks to remove a column', () => {
            beforeEach(() => {
              const removeColumnButton = within(subject.queryByTestId('column-1')).queryByText('×')
              fireEvent.click(removeColumnButton)
            })

            it('removes the column', () => {
              const column = subject.queryAllByTestId(/column-\d+/)
              expect(column).toHaveLength(1)
              expect(column[0]).toHaveTextContent('Column Doing')
            })

            it('calls the "onColumnRemove" callback passing both the updated board and the removed column', () => {
              expect(onColumnRemove).toHaveBeenCalledTimes(1)
              expect(onColumnRemove).toHaveBeenCalledWith(
                { columns: [expect.objectContaining({ id: 2 })] },
                expect.objectContaining({ id: 1 })
              )
            })
          })
        })
      })

      describe('when the component receives a custom header column template', () => {
        let renderColumnHeader

        beforeEach(() => {
          renderColumnHeader = jest.fn(({ title }, { removeColumn }) => <div onClick={removeColumn}>{title}</div>)
          onColumnRemove = jest.fn()
          mount({ renderColumnHeader, onColumnRemove })
        })

        it('does not call the "onColumnRemove" callback', () => {
          expect(onColumnRemove).not.toHaveBeenCalled()
        })

        it('passes the column and the column bag to the "renderColumnHeader"', () => {
          expect(renderColumnHeader).toHaveBeenCalledWith(
            expect.objectContaining({ id: 1, title: 'Column Backlog' }),
            expect.objectContaining({ removeColumn: expect.any(Function), renameColumn: expect.any(Function) })
          )
        })

        describe('when the "removeColumn" callback is called', () => {
          beforeEach(() => fireEvent.click(within(subject.queryByTestId('column-1')).queryByText('Column Backlog')))

          it('removes the column', () => {
            const column = subject.queryAllByTestId(/column-\d+/)
            expect(column).toHaveLength(1)
            expect(column[0]).toHaveTextContent('Column Doing')
          })

          it('calls the "onColumnRemove" callback passing both the updated board and the removed column', () => {
            expect(onColumnRemove).toHaveBeenCalledTimes(1)
            expect(onColumnRemove).toHaveBeenCalledWith(
              { columns: [expect.objectContaining({ id: 2 })] },
              expect.objectContaining({ id: 1 })
            )
          })
        })
      })
    })

    describe('about the column renaming', () => {
      describe('when the component use the default header template', () => {
        describe('when the component receives the "allowRenameColumn" prop', () => {
          beforeEach(() => {
            onColumnRename = jest.fn()
            mount({ allowRenameColumn: true, onColumnRename })
          })

          it('does not call the "onColumnRename" callback', () => {
            expect(onColumnRename).not.toHaveBeenCalled()
          })

          describe('when the user renames a column', () => {
            beforeEach(() => {
              fireEvent.click(within(subject.queryByTestId('column-1')).queryByText('Column Backlog'))
              fireEvent.change(subject.container.querySelector('input'), { target: { value: 'New title' } })
              fireEvent.click(subject.queryByText('Rename', { selector: 'button' }))
            })

            it('renames the column', () => {
              expect(subject.queryByText('Column Backlog')).not.toBeInTheDocument()
              expect(subject.queryByText('New title')).toBeInTheDocument()
            })

            it('calls the "onColumnRename" callback passing both the updated board and the renamed column', () => {
              expect(onColumnRename).toHaveBeenCalledTimes(1)
              expect(onColumnRename).toHaveBeenCalledWith(
                {
                  columns: [
                    expect.objectContaining({ id: 1, title: 'New title' }),
                    expect.objectContaining({ id: 2, title: 'Column Doing' }),
                  ],
                },
                expect.objectContaining({ id: 1, title: 'New title' })
              )
            })
          })
        })

        describe('when the component does not receive the "allowRenameColumn" prop', () => {
          beforeEach(() => {
            onColumnRename = jest.fn()
            mount({ onColumnRename })
          })

          it('does not call the "onColumnRename" callback', () => {
            expect(onColumnRename).not.toHaveBeenCalled()
          })

          it('does not show the button on column header to remove the column', () => {
            expect(subject.queryByTestId('column-1').querySelector('button')).not.toBeInTheDocument()
          })
        })
      })

      describe('when the component receives a custom header column template', () => {
        beforeEach(() => {
          const renderColumnHeader = ({ title }, { renameColumn }) => (
            <div onClick={() => renameColumn('New title')}>{title}</div>
          )
          onColumnRename = jest.fn()
          mount({ renderColumnHeader, onColumnRename })
        })

        it('does not call the "onColumnRename" callback', () => {
          expect(onColumnRename).not.toHaveBeenCalled()
        })

        describe('when the "renameColumn" callback is called', () => {
          beforeEach(() => fireEvent.click(within(subject.queryByTestId('column-1')).queryByText('Column Backlog')))

          it('renames the column', () => {
            expect(subject.queryByTestId('column-1')).toHaveTextContent('New title')
          })

          it('calls the "onColumnRename" callback passing both the updated board and the renamed column', () => {
            expect(onColumnRename).toHaveBeenCalledTimes(1)
            expect(onColumnRename).toHaveBeenCalledWith(
              {
                columns: [
                  expect.objectContaining({ id: 1, title: 'New title' }),
                  expect.objectContaining({ id: 2, title: 'Column Doing' }),
                ],
              },
              expect.objectContaining({ id: 1, title: 'New title' })
            )
          })
        })
      })
    })

    describe('about the card removing', () => {
      beforeEach(() => {
        onCardRemove = jest.fn()
      })

      describe('when the component uses the default card template', () => {
        describe('when the component receives the "allowRemoveCard" prop', () => {
          beforeEach(() => mount({ allowRemoveCard: true, onCardRemove }))

          it('does not call the "onCardRemove" callback', () => {
            expect(onCardRemove).not.toHaveBeenCalled()
          })

          describe('when the user clicks to remove a card from a column', () => {
            beforeEach(() => {
              const removeCardButton = within(subject.queryByTestId('card-1')).queryByText('×')
              fireEvent.click(removeCardButton)
            })

            it('removes the card from the column', () => {
              const cards = subject.queryAllByText(/^Card title/)
              expect(cards).toHaveLength(2)
              expect(cards[0]).toHaveTextContent('Card title 2')
              expect(cards[1]).toHaveTextContent('Card title 3')
            })

            it('calls the "onCardRemove" callback passing the updated board, the updated column and the removed card', () => {
              expect(onCardRemove).toHaveBeenCalledTimes(1)
              expect(onCardRemove).toHaveBeenCalledWith(
                {
                  columns: [
                    expect.objectContaining({ id: 1, cards: [expect.objectContaining({ id: 2 })] }),
                    expect.objectContaining({ id: 2, cards: [expect.objectContaining({ id: 3 })] }),
                  ],
                },
                expect.objectContaining({ id: 1, title: 'Column Backlog' }),
                expect.objectContaining({ id: 1, title: 'Card title 1' })
              )
            })
          })
        })
      })

      describe('when the component receives a custom card template', () => {
        let renderCard

        beforeEach(() => {
          renderCard = jest.fn(({ title }, { removeCard }) => <div onClick={removeCard}>{title}</div>)
          onCardRemove = jest.fn()
          mount({ renderCard, onCardRemove })
        })

        it('does not call the "onCardRemove" callback', () => {
          expect(onCardRemove).not.toHaveBeenCalled()
        })

        it('passes the card and the card bag to the "renderCard"', () => {
          expect(renderCard).toHaveBeenCalledWith(
            expect.objectContaining({ title: 'Card title 1' }),
            expect.objectContaining({ removeCard: expect.any(Function), dragging: false })
          )
        })

        describe('when the "removeCard" callback is called', () => {
          beforeEach(() => fireEvent.click(subject.queryByText('Card title 1')))

          it('removes the card from the column', () => {
            const cards = subject.queryAllByText(/^Card title/)
            expect(cards).toHaveLength(2)
            expect(cards[0]).toHaveTextContent('Card title 2')
            expect(cards[1]).toHaveTextContent('Card title 3')
          })

          it('calls the "onCardRemove" callback passing the updated board, column and the removed card', () => {
            expect(onCardRemove).toHaveBeenCalledTimes(1)
            expect(onCardRemove).toHaveBeenCalledWith(
              {
                columns: [
                  expect.objectContaining({ title: 'Column Backlog' }),
                  expect.objectContaining({ title: 'Column Doing' }),
                ],
              },
              expect.objectContaining({ id: 1, title: 'Column Backlog' }),
              expect.objectContaining({ id: 1, title: 'Card title 1' })
            )
          })
        })
      })
    })

    describe('about the card adding', () => {
      describe('when the component receives a custom header column template', () => {
        const renderColumnHeader = jest.fn((_, { addCard }) => {
          return <button onClick={() => addCard({ id: 99, title: 'New card' })}>New card</button>
        })
        const onCardNew = jest.fn()

        beforeEach(() => {
          renderColumnHeader.mockClear()
          onCardNew.mockClear()
        })

        it('does not call the "onCardNew" callback', () => {
          mount({ renderColumnHeader, onCardNew })
          expect(onCardNew).not.toHaveBeenCalled()
        })

        it('passes the column and the column bag to the "renderColumnHeader"', () => {
          mount({ renderColumnHeader, onCardNew })
          expect(renderColumnHeader).toHaveBeenCalledWith(
            expect.objectContaining({ id: 1, title: 'Column Backlog' }),
            expect.objectContaining({
              removeColumn: expect.any(Function),
              renameColumn: expect.any(Function),
              addCard: expect.any(Function),
            })
          )
        })

        describe('when the "addCard" callback is called', () => {
          describe('when the position is not specified', () => {
            beforeEach(() => {
              mount({ renderColumnHeader, onCardNew })
              fireEvent.click(within(subject.queryByTestId('column-1')).queryByText('New card'))
            })

            it('adds a new card on the bottom of the column', () => {
              const cards = within(subject.queryByTestId('column-1')).queryAllByTestId(/card/)
              expect(cards).toHaveLength(3)
              expect(cards[2]).toHaveTextContent('New card')
            })

            it('calls the "onCardNew" callback passing the updated board, the updated column and the new card', () => {
              expect(onCardNew).toHaveBeenCalledTimes(1)
              expect(onCardNew).toHaveBeenCalledWith(
                {
                  columns: [expect.objectContaining({ id: 1 }), expect.objectContaining({ id: 2 })],
                },
                expect.objectContaining({
                  id: 1,
                  cards: [
                    expect.objectContaining({ id: 1 }),
                    expect.objectContaining({ id: 2 }),
                    expect.objectContaining({ id: 99 }),
                  ],
                }),
                expect.objectContaining({ id: 99 })
              )
            })
          })

          describe('when the position is specified to add the card on the top of the column', () => {
            beforeEach(() => {
              const renderColumnHeader = jest.fn((_, { addCard }) => {
                return <button onClick={() => addCard({ id: 99, title: 'New card' }, { on: 'top' })}>New card</button>
              })
              mount({ renderColumnHeader, onCardNew })
              fireEvent.click(within(subject.queryByTestId('column-1')).queryByText('New card'))
            })

            it('adds a new card on the top of the column', () => {
              const cards = within(subject.queryByTestId('column-1')).queryAllByTestId(/card/)
              expect(cards).toHaveLength(3)
              expect(cards[0]).toHaveTextContent('New card')
            })

            it('calls the "onCardNew" callback passing the updated board, the updated column and the new card', () => {
              expect(onCardNew).toHaveBeenCalledTimes(1)
              expect(onCardNew).toHaveBeenCalledWith(
                {
                  columns: [expect.objectContaining({ id: 1 }), expect.objectContaining({ id: 2 })],
                },
                expect.objectContaining({
                  id: 1,
                  cards: [
                    expect.objectContaining({ id: 99 }),
                    expect.objectContaining({ id: 1 }),
                    expect.objectContaining({ id: 2 }),
                  ],
                }),
                expect.objectContaining({ id: 99 })
              )
            })
          })

          describe('when the position is specified to add the card on the bottom of the column', () => {
            beforeEach(() => {
              const renderColumnHeader = jest.fn((_, { addCard }) => {
                return (
                  <button onClick={() => addCard({ id: 99, title: 'New card' }, { on: 'bottom' })}>New card</button>
                )
              })
              mount({ renderColumnHeader, onCardNew })
              fireEvent.click(within(subject.queryByTestId('column-1')).queryByText('New card'))
            })

            it('adds a new card on the bottom of the column', () => {
              const cards = within(subject.queryByTestId('column-1')).queryAllByTestId(/card/)
              expect(cards).toHaveLength(3)
              expect(cards[2]).toHaveTextContent('New card')
            })

            it('calls the "onCardNew" callback passing the updated board, the updated column and the new card', () => {
              expect(onCardNew).toHaveBeenCalledTimes(1)
              expect(onCardNew).toHaveBeenCalledWith(
                {
                  columns: [expect.objectContaining({ id: 1 }), expect.objectContaining({ id: 2 })],
                },
                expect.objectContaining({
                  id: 1,
                  cards: [
                    expect.objectContaining({ id: 1 }),
                    expect.objectContaining({ id: 2 }),
                    expect.objectContaining({ id: 99 }),
                  ],
                }),
                expect.objectContaining({ id: 99 })
              )
            })
          })
        })
      })

      describe('when the component does not receive a custom header column template', () => {
        const onCardNew = jest.fn()
        const onNewCardConfirm = jest.fn((column) => new Promise((resolve) => resolve({ id: 999, ...column })))

        describe('when the component does not receive "allowAddCard" prop', () => {
          beforeEach(() => {
            mount({ allowAddCard: false, onNewCardConfirm, onCardNew })
          })

          it('does not render the card adder', () => {
            expect(subject.queryByText('+')).not.toBeInTheDocument()
          })
        })

        describe('when the component does not receive the "onNewCardConfirm" prop', () => {
          beforeEach(() => {
            mount({ allowAddCard: true, onCardNew: () => {} })
          })

          it('does not render the column adder', () => {
            expect(subject.queryByText('+')).not.toBeInTheDocument()
          })
        })

        describe('when the component receives both the "allowAddCard" and "onNewCardConfirm" props', () => {
          describe('when the user adds a new card', () => {
            beforeEach(async () => {
              mount({ allowAddCard: true, onNewCardConfirm, onCardNew })

              fireEvent.click(subject.queryAllByText('+')[0])
              fireEvent.change(subject.container.querySelector('input[name="title"]'), {
                target: { value: 'Card title' },
              })
              fireEvent.change(subject.container.querySelector('input[name="description"]'), {
                target: { value: 'Card description' },
              })
              fireEvent.click(subject.queryByText('Add'))
              await screen.findByTestId('card-999')
            })

            it('calls the "onNewCardConfirm" passing the new card', () => {
              expect(onNewCardConfirm).toHaveBeenCalledTimes(1)
              expect(onNewCardConfirm).toHaveBeenCalledWith({
                title: 'Card title',
                description: 'Card description',
              })
            })

            it('renders the new card using the id returned on "onNewCardConfirm"', () => {
              expect(subject.queryAllByTestId(/card/)).toHaveLength(4)
            })

            it('renders the card placeholder', () => {
              expect(subject.queryAllByText('+')).toHaveLength(2)
            })

            it('adds a new card on column', () => {
              const cards = within(subject.queryByTestId('column-1')).queryAllByTestId(/card/)
              expect(cards).toHaveLength(3)
              expect(cards[2]).toHaveTextContent('Card title')
            })

            it('calls the "onCardNew" callback passing the updated board, the updated column and the new card', () => {
              expect(onCardNew).toHaveBeenCalledTimes(1)
              expect(onCardNew).toHaveBeenCalledWith(
                {
                  columns: [
                    {
                      id: 1,
                      title: 'Column Backlog',
                      cards: [
                        {
                          id: 1,
                          title: 'Card title 1',
                          description: 'Card content',
                        },
                        {
                          id: 2,
                          title: 'Card title 2',
                          description: 'Card content',
                        },
                        { id: 999, title: 'Card title', description: 'Card description' },
                      ],
                    },
                    {
                      id: 2,
                      title: 'Column Doing',
                      cards: [
                        {
                          id: 3,
                          title: 'Card title 3',
                          description: 'Card content',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 1,
                  title: 'Column Backlog',
                  cards: [
                    {
                      id: 1,
                      title: 'Card title 1',
                      description: 'Card content',
                    },
                    {
                      id: 2,
                      title: 'Card title 2',
                      description: 'Card content',
                    },
                    { id: 999, title: 'Card title', description: 'Card description' },
                  ],
                },
                expect.objectContaining({ id: 999 })
              )
            })
          })

          describe('about the card position when it is added', () => {
            describe('when the position is not specified', () => {
              beforeEach(async () => {
                mount({ allowAddCard: true, onNewCardConfirm, onCardNew })
                fireEvent.click(subject.queryAllByText('+')[0])

                fireEvent.change(subject.container.querySelector('input[name="title"]'), {
                  target: { value: 'Card title' },
                })
                fireEvent.change(subject.container.querySelector('input[name="description"]'), {
                  target: { value: 'Card description' },
                })
                fireEvent.click(subject.queryByText('Add'))
                await screen.findByTestId('card-999')
              })

              it('adds a new card on the bottom of the column', () => {
                const cards = within(subject.queryByTestId('column-1')).queryAllByTestId(/card/)
                expect(cards).toHaveLength(3)
                expect(cards[2]).toHaveTextContent('Card description')
              })

              it('calls the "onCardNew" callback passing the updated board, the updated column and the new card on the end of the card array', () => {
                expect(onCardNew).toHaveBeenCalledTimes(1)
                expect(onCardNew).toHaveBeenCalledWith(
                  {
                    columns: [
                      {
                        id: 1,
                        title: 'Column Backlog',
                        cards: [
                          {
                            id: 1,
                            title: 'Card title 1',
                            description: 'Card content',
                          },
                          {
                            id: 2,
                            title: 'Card title 2',
                            description: 'Card content',
                          },
                          { id: 999, title: 'Card title', description: 'Card description' },
                        ],
                      },
                      {
                        id: 2,
                        title: 'Column Doing',
                        cards: [
                          {
                            id: 3,
                            title: 'Card title 3',
                            description: 'Card content',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 1,
                    title: 'Column Backlog',
                    cards: [
                      {
                        id: 1,
                        title: 'Card title 1',
                        description: 'Card content',
                      },
                      {
                        id: 2,
                        title: 'Card title 2',
                        description: 'Card content',
                      },
                      { id: 999, title: 'Card title', description: 'Card description' },
                    ],
                  },
                  expect.objectContaining({ id: 999 })
                )
              })
            })

            describe('when the position is specified to add the card on the top of the column', () => {
              beforeEach(async () => {
                mount({ allowAddCard: { on: 'top' }, onNewCardConfirm, onCardNew })
                fireEvent.click(subject.queryAllByText('+')[0])

                fireEvent.change(subject.container.querySelector('input[name="title"]'), {
                  target: { value: 'Card title' },
                })
                fireEvent.change(subject.container.querySelector('input[name="description"]'), {
                  target: { value: 'Card description' },
                })
                fireEvent.click(subject.queryByText('Add'))
                await screen.findByTestId('card-999')
              })

              it('adds a new card on the top of the column', () => {
                const cards = within(subject.queryByTestId('column-1')).queryAllByTestId(/card/)
                expect(cards).toHaveLength(3)
                expect(cards[0]).toHaveTextContent('Card description')
              })

              it('calls the "onCardNew" callback passing the updated board, the updated column and the new card on the start of the array', () => {
                expect(onCardNew).toHaveBeenCalledTimes(1)
                expect(onCardNew).toHaveBeenCalledWith(
                  {
                    columns: [
                      {
                        id: 1,
                        title: 'Column Backlog',
                        cards: [
                          { id: 999, title: 'Card title', description: 'Card description' },
                          {
                            id: 1,
                            title: 'Card title 1',
                            description: 'Card content',
                          },
                          {
                            id: 2,
                            title: 'Card title 2',
                            description: 'Card content',
                          },
                        ],
                      },
                      {
                        id: 2,
                        title: 'Column Doing',
                        cards: [
                          {
                            id: 3,
                            title: 'Card title 3',
                            description: 'Card content',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 1,
                    title: 'Column Backlog',
                    cards: [
                      { id: 999, title: 'Card title', description: 'Card description' },
                      {
                        id: 1,
                        title: 'Card title 1',
                        description: 'Card content',
                      },
                      {
                        id: 2,
                        title: 'Card title 2',
                        description: 'Card content',
                      },
                    ],
                  },
                  expect.objectContaining({ id: 999 })
                )
              })
            })

            describe('when the position is specified to add the card on the bottom of the column', () => {
              beforeEach(async () => {
                mount({ allowAddCard: { on: 'bottom' }, onNewCardConfirm, onCardNew })
                fireEvent.click(subject.queryAllByText('+')[0])

                fireEvent.change(subject.container.querySelector('input[name="title"]'), {
                  target: { value: 'Card title' },
                })
                fireEvent.change(subject.container.querySelector('input[name="description"]'), {
                  target: { value: 'Card description' },
                })
                fireEvent.click(subject.queryByText('Add'))
                await screen.findByTestId('card-999')
              })

              it('adds a new card on the bottom of the column', () => {
                const cards = within(subject.queryByTestId('column-1')).queryAllByTestId(/card/)
                expect(cards).toHaveLength(3)
                expect(cards[2]).toHaveTextContent('Card description')
              })

              it('calls the "onCardNew" callback passing the updated board, the updated column and the new card on the end of the array', () => {
                expect(onCardNew).toHaveBeenCalledTimes(1)
                expect(onCardNew).toHaveBeenCalledWith(
                  {
                    columns: [
                      {
                        id: 1,
                        title: 'Column Backlog',
                        cards: [
                          {
                            id: 1,
                            title: 'Card title 1',
                            description: 'Card content',
                          },
                          {
                            id: 2,
                            title: 'Card title 2',
                            description: 'Card content',
                          },
                          { id: 999, title: 'Card title', description: 'Card description' },
                        ],
                      },
                      {
                        id: 2,
                        title: 'Column Doing',
                        cards: [
                          {
                            id: 3,
                            title: 'Card title 3',
                            description: 'Card content',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 1,
                    title: 'Column Backlog',
                    cards: [
                      {
                        id: 1,
                        title: 'Card title 1',
                        description: 'Card content',
                      },
                      {
                        id: 2,
                        title: 'Card title 2',
                        description: 'Card content',
                      },
                      { id: 999, title: 'Card title', description: 'Card description' },
                    ],
                  },
                  expect.objectContaining({ id: 999 })
                )
              })
            })
          })
        })
      })
    })
  })
})
