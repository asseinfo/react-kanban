import React, { useState } from 'react'
import { render, within, act, fireEvent, waitForElement } from '@testing-library/react'
import Board from './'
import { callbacks } from 'react-beautiful-dnd'
import { moveCard } from './services'

describe('<Board />', () => {
  let subject, onCardDragEnd, onLaneDragEnd, onLaneRemove, onLaneRename, onCardRemove
  const board = {
    lanes: [
      {
        id: 1,
        title: 'Lane Backlog',
        cards: [
          {
            id: 1,
            title: 'Card title 1',
            description: 'Card content'
          },
          {
            id: 2,
            title: 'Card title 2',
            description: 'Card content'
          }
        ]
      },
      {
        id: 2,
        title: 'Lane Doing',
        cards: [
          {
            id: 3,
            title: 'Card title 3',
            description: 'Card content'
          }
        ]
      }
    ]
  }

  afterEach(() => {
    subject = onCardDragEnd = onLaneDragEnd = onLaneRemove = onCardRemove = undefined
  })

  describe('when the board is controlled', () => {
    function ControlledBoard({ children, ...props }) {
      const [board, setBoard] = useState(children)

      function handleCardMoving() {
        setBoard(moveCard(board, { fromPosition: 0, fromLaneId: 1 }, { toPosition: 1, toLaneId: 1 }))
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
      const { queryByText } = mount()

      const lane = within(queryByText(/^Lane Backlog$/).closest('[data-testid="lane"]'))
      const cards = lane.queryAllByText(/^Card title/)

      expect(cards).toHaveLength(2)
      expect(cards[0]).toHaveTextContent(/^Card title 1$/)
      expect(cards[1]).toHaveTextContent(/^Card title 2$/)

      fireEvent.click(queryByText('Move card', { selector: 'button' }))

      const movedCards = lane.queryAllByText(/^Card title/)

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

        describe('when the user moves a card to another position', () => {
          beforeEach(() => {
            act(() => {
              callbacks.onDragEnd({
                source: { droppableId: '1', index: 0 },
                destination: { droppableId: '1', index: 1 }
              })
            })
          })

          it('calls the onCardDragEnd callback passing the card move coordinates', () => {
            expect(onCardDragEnd).toHaveBeenCalledTimes(1)
            expect(onCardDragEnd).toHaveBeenCalledWith(
              { fromPosition: 0, fromLaneId: 1 },
              { toPosition: 1, toLaneId: 1 }
            )
          })
        })
      })
    })

    describe('about the lane moving', () => {
      describe('when the component receives "onLaneDragEnd" callback', () => {
        beforeEach(() => {
          onLaneDragEnd = jest.fn()
          mount({ onLaneDragEnd })
        })

        describe('when the user cancels the lane moving', () => {
          beforeEach(() => {
            callbacks.onDragEnd({ source: null, destination: null, type: 'BOARD' })
          })

          it('does not call onLaneDragEnd callback', () => {
            expect(onLaneDragEnd).not.toHaveBeenCalled()
          })
        })

        describe('when the user moves a lane to another position', () => {
          beforeEach(() => {
            act(() => {
              callbacks.onDragEnd({ source: { index: 0 }, destination: { index: 1 }, type: 'BOARD' })
            })
          })

          it('calls the onLaneDragEnd callback passing the lane move coordinates', () => {
            expect(onLaneDragEnd).toHaveBeenCalledTimes(1)
            expect(onLaneDragEnd).toHaveBeenCalledWith({ fromPosition: 0 }, { toPosition: 1 })
          })
        })
      })
    })

    describe("about the board's custom card", () => {
      let renderCard
      const board = {
        lanes: [
          {
            id: 1,
            title: 'Lane Backlog',
            cards: [
              {
                id: 1,
                title: 'Card title',
                content: 'Card content'
              },
              {
                id: 2,
                title: 'Card title',
                content: 'Card content'
              }
            ]
          },
          {
            id: 2,
            title: 'Lane Doing',
            cards: [
              {
                id: 3,
                title: 'Card title',
                content: 'Card content'
              }
            ]
          }
        ]
      }

      afterEach(() => {
        renderCard = undefined
      })

      describe('when it receives a "renderCard" prop', () => {
        beforeEach(() => {
          renderCard = jest.fn(cardContent => (
            <div>
              {cardContent.id} - {cardContent.title} - {cardContent.content}
            </div>
          ))

          mount({ children: board, renderCard })
        })

        it("renders the custom cards on the board's lane", () => {
          const cards = subject.queryAllByTestId('card')
          expect(cards).toHaveLength(3)
          expect(cards[0]).toHaveTextContent(/^1 - Card title - Card content$/)
        })

        it('passes the card content and the card bag as a parameter to the renderCard prop', () => {
          expect(renderCard).toHaveBeenCalledWith(
            { id: 1, title: 'Card title', content: 'Card content' },
            { dragging: false }
          )
        })
      })
    })

    describe("about the lane's header", () => {
      let renderLaneHeader
      const board = {
        lanes: [
          {
            id: 1,
            title: 'Lane Backlog',
            wip: 1,
            cards: [{ id: 2, title: 'Card title', content: 'Card content' }]
          }
        ]
      }

      afterEach(() => {
        renderLaneHeader = undefined
      })

      describe('when the component receives a "renderLaneHeader" prop', () => {
        beforeEach(() => {
          renderLaneHeader = jest.fn(laneContent => (
            <div>
              {laneContent.title} ({laneContent.wip})
            </div>
          ))

          mount({ children: board, renderLaneHeader })
        })

        it("renders the custom header on the board's lane", () => {
          expect(subject.queryAllByTestId('lane-header')).toHaveLength(1)
          expect(subject.queryByTestId('lane-header')).toHaveTextContent(/^Lane Backlog \(1\)$/)
        })

        it('passes the lane content to the "renderLaneHeader" prop', () => {
          expect(renderLaneHeader).toHaveBeenCalledTimes(1)
          expect(renderLaneHeader).toHaveBeenCalledWith({
            id: 1,
            title: 'Lane Backlog',
            wip: 1,
            cards: [{ id: 2, title: 'Card title', content: 'Card content' }]
          })
        })
      })

      describe('when the component does not receive a "renderLaneHeader" prop', () => {
        beforeEach(() => mount({ children: board }))

        it("renders the default header on the board's lane", () => {
          expect(subject.queryAllByTestId('lane-header')).toHaveLength(1)
          expect(subject.queryByTestId('lane-header')).toHaveTextContent(/^Lane Backlog$/)
        })
      })
    })

    describe('about the lane adding', () => {
      describe('about the default lane adder', () => {
        describe('when the component does not receive "allowAddLane" prop', () => {
          let onNewLaneConfirm

          beforeEach(() => {
            onNewLaneConfirm = jest.fn()
            mount({ allowAddLane: false, onNewLaneConfirm })
          })
          afterEach(() => {
            onNewLaneConfirm = undefined
          })

          it('does not render the lane adder', () => {
            expect(subject.queryByText('➕')).not.toBeInTheDocument()
          })
        })

        describe('when the component does not receive "onNewLaneConfirm" prop', () => {
          beforeEach(() => {
            mount({ allowAddLane: true })
          })

          it('does not render the lane adder', () => {
            expect(subject.queryByText('➕')).not.toBeInTheDocument()
          })
        })

        describe('when it receives the "allowAddLane" and "onNewLaneConfirm" prop', () => {
          let onNewLaneConfirm

          beforeEach(() => {
            onNewLaneConfirm = jest.fn()
            mount({ allowAddLane: true, onNewLaneConfirm })
          })
          afterEach(() => {
            onNewLaneConfirm = undefined
          })

          it('renders the lane placeholder as the last lane to add a new lane', () => {
            expect(subject.queryByText('➕')).toBeInTheDocument()
          })

          describe('when the user clicks to add a new lane', () => {
            beforeEach(() => fireEvent.click(subject.queryByText('➕')))

            it('hides the lane placeholder', () => {
              expect(subject.queryByText('➕')).not.toBeInTheDocument()
            })

            it('renders the input asking for a lane title', () => {
              expect(subject.container.querySelector('input')).toBeInTheDocument()
            })

            describe('when the user confirms the new lane', () => {
              beforeEach(() => {
                fireEvent.change(subject.container.querySelector('input'), { target: { value: 'Lane Added by user' } })
                fireEvent.click(subject.queryByText('Add'))
              })

              it('calls the "onNewLaneConfirm" passing the new lane', () => {
                expect(onNewLaneConfirm).toHaveBeenCalledTimes(1)
                expect(onNewLaneConfirm).toHaveBeenCalledWith({ title: 'Lane Added by user', cards: [] })
              })
            })

            describe('when the user cancels the new lane adding', () => {
              beforeEach(() => {
                fireEvent.click(subject.queryByText('Cancel'))
              })

              it('does not call the "onNewLaneConfirm" passing the new lane', () => {
                expect(onNewLaneConfirm).not.toHaveBeenCalled()
              })
            })
          })
        })
      })

      describe('about custom lane adder', () => {
        describe('when the component receives a custom lane adder', () => {
          let renderLaneAdder

          describe('when the component does not receive "allowAddLane" prop', () => {
            beforeEach(() => {
              renderLaneAdder = jest.fn(() => (
                <div>
                  <input data-testid='laneAdder' />
                </div>
              ))

              mount({ renderLaneAdder })

              it('does not renders the custom render adder', () => {
                expect(subject.queryByTestId('laneAdder')).toBeInTheDocument()
              })
            })
          })

          describe('when the component receives the "allowAddLane" prop', () => {
            beforeEach(() => {
              renderLaneAdder = jest.fn(() => (
                <div data-testid='laneAdder'>
                  <button>Add lane</button>
                </div>
              ))

              mount({ children: board, renderLaneAdder, allowAddLane: true })
            })

            it('renders the custom lane adder as the last lane to add a new lane', () => {
              expect(subject.queryByTestId('laneAdder')).toBeInTheDocument()
            })

            // TODO it needs spec for the renderLaneAdder callback
          })
        })
      })
    })

    describe('about the lane removing', () => {
      beforeEach(() => {
        onLaneRemove = jest.fn()
      })

      describe('when the component uses the default header template', () => {
        describe('when the component receives the "allowRemoveLane" prop', () => {
          beforeEach(() => mount({ allowRemoveLane: true, onLaneRemove }))

          it('does not call the "onLaneRemove callback', () => {
            expect(onLaneRemove).not.toHaveBeenCalled()
          })

          describe('when the user clicks to remove a lane', () => {
            beforeEach(() => {
              const removeLaneButton = within(subject.queryAllByTestId('lane')[0]).queryByText('×')
              fireEvent.click(removeLaneButton)
            })

            it('calls the "onLaneRemove" callback passing the lane to be removed', () => {
              expect(onLaneRemove).toHaveBeenCalledTimes(1)
              expect(onLaneRemove).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }))
            })
          })
        })
      })

      describe('when the component receives a custom header lane template', () => {
        let renderLaneHeader

        beforeEach(() => {
          renderLaneHeader = jest.fn(({ title }) => <div>{title}</div>)
          onLaneRemove = jest.fn()
          mount({ renderLaneHeader, onLaneRemove })
        })

        it('does not call the "onLaneRemove" callback', () => {
          expect(onLaneRemove).not.toHaveBeenCalled()
        })
      })
    })

    describe('about the lane renaming', () => {
      describe('when the component use the default header template', () => {
        describe('when the component receives the "allowRenameLane" prop', () => {
          beforeEach(() => {
            onLaneRename = jest.fn()
            mount({ allowRenameLane: true, onLaneRename })
          })

          it('does not call the "onLaneRename" callback', () => {
            expect(onLaneRename).not.toHaveBeenCalled()
          })

          describe('when the user renames a lane', () => {
            beforeEach(() => {
              fireEvent.click(within(subject.queryAllByTestId('lane')[0]).queryByText('Lane Backlog'))
              fireEvent.change(subject.container.querySelector('input'), { target: { value: 'New title' } })
              fireEvent.click(subject.queryByText('Rename', { selector: 'button' }))
            })

            it('calls the "onLaneRename" callback passing the lane to be renamed', () => {
              expect(onLaneRename).toHaveBeenCalledTimes(1)
              expect(onLaneRename).toHaveBeenCalledWith(
                expect.objectContaining({ id: 1, title: 'Lane Backlog' }),
                'New title'
              )
            })
          })
        })

        describe('when the component does not receive the "allowRenameLane" prop', () => {
          beforeEach(() => {
            onLaneRename = jest.fn()
            mount({ onLaneRename })
          })

          it('does not call the "onLaneRename" callback', () => {
            expect(onLaneRename).not.toHaveBeenCalled()
          })

          it('does not show the button on lane header to remove the lane', () => {
            expect(subject.queryAllByTestId('lane')[0].querySelector('button')).not.toBeInTheDocument()
          })
        })
      })

      describe('when the component receives a custom header lane template', () => {
        beforeEach(() => {
          const renderLaneHeader = ({ title }) => <div>{title}</div>
          onLaneRename = jest.fn()
          mount({ renderLaneHeader, onLaneRename })
        })

        it('does not call the "onLaneRename" callback', () => {
          expect(onLaneRename).not.toHaveBeenCalled()
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

          describe('when the user clicks to remove a card from a lane', () => {
            beforeEach(() => {
              const removeCardButton = within(subject.queryAllByTestId('card')[0]).queryByText('×')
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
        setBoard(moveCard(board, { fromPosition: 0, fromLaneId: 1 }, { toPosition: 1, toLaneId: 1 }))
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
      const { queryByText } = mount({ Component: UselessState })

      const lane = within(queryByText(/^Lane Backlog$/).closest('[data-testid="lane"]'))
      const cards = lane.queryAllByText(/^Card title/)

      expect(cards).toHaveLength(2)
      expect(cards[0]).toHaveTextContent(/^Card title 1$/)
      expect(cards[1]).toHaveTextContent(/^Card title 2$/)

      fireEvent.click(queryByText('Move card', { selector: 'button' }))

      const movedCards = lane.queryAllByText(/^Card title/)

      expect(movedCards).toHaveLength(2)
      expect(movedCards[0]).toHaveTextContent(/^Card title 1$/)
      expect(movedCards[1]).toHaveTextContent(/^Card title 2$/)
    })

    it('renders the specified lanes in the board ordered by its specified position', () => {
      const lanes = mount().queryAllByText(/^Lane/)
      expect(lanes).toHaveLength(2)
      expect(lanes[0]).toHaveTextContent(/^Lane Backlog$/)
      expect(lanes[1]).toHaveTextContent(/^Lane Doing$/)
    })

    it('renders the specified cards in their lanes', () => {
      const lane = within(
        mount()
          .queryByText(/^Lane Backlog$/)
          .closest('[data-testid="lane"]')
      )
      const cards = lane.queryAllByText(/^Card title/)
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

        describe('when the user moves a card to another position', () => {
          beforeEach(() => {
            act(() => {
              callbacks.onDragEnd({
                source: { droppableId: '1', index: 0 },
                destination: { droppableId: '1', index: 1 }
              })
            })
          })

          it('calls the onCardDragEnd callback passing the modified board and the card move coordinates', () => {
            const expectedBoard = {
              lanes: [
                {
                  id: 1,
                  title: 'Lane Backlog',
                  cards: [
                    {
                      id: 2,
                      title: 'Card title 2',
                      description: 'Card content'
                    },
                    {
                      id: 1,
                      title: 'Card title 1',
                      description: 'Card content'
                    }
                  ]
                },
                {
                  id: 2,
                  title: 'Lane Doing',
                  cards: [
                    {
                      id: 3,
                      title: 'Card title 3',
                      description: 'Card content'
                    }
                  ]
                }
              ]
            }
            expect(onCardDragEnd).toHaveBeenCalledTimes(1)
            expect(onCardDragEnd).toHaveBeenCalledWith(
              expectedBoard,
              { fromPosition: 0, fromLaneId: 1 },
              { toPosition: 1, toLaneId: 1 }
            )
          })
        })
      })
    })

    describe('about the lane moving', () => {
      describe('when the component receives "onLaneDragEnd" callback', () => {
        beforeEach(() => {
          onLaneDragEnd = jest.fn()
          mount({ onLaneDragEnd })
        })

        describe('when the user cancels the lane moving', () => {
          beforeEach(() => {
            callbacks.onDragEnd({ source: null, destination: null, type: 'BOARD' })
          })

          it('does not call onLaneDragEnd callback', () => {
            expect(onLaneDragEnd).not.toHaveBeenCalled()
          })
        })

        describe('when the user moves a lane to another position', () => {
          beforeEach(() => {
            act(() => {
              callbacks.onDragEnd({ source: { index: 0 }, destination: { index: 1 }, type: 'BOARD' })
            })
          })

          it('calls the onLaneDragEnd callback passing the modified board and the lane move coordinates', () => {
            const expectedBoard = {
              lanes: [
                {
                  id: 2,
                  title: 'Lane Doing',
                  cards: [
                    {
                      id: 3,
                      title: 'Card title 3',
                      description: 'Card content'
                    }
                  ]
                },
                {
                  id: 1,
                  title: 'Lane Backlog',
                  cards: [
                    {
                      id: 1,
                      title: 'Card title 1',
                      description: 'Card content'
                    },
                    {
                      id: 2,
                      title: 'Card title 2',
                      description: 'Card content'
                    }
                  ]
                }
              ]
            }

            expect(onLaneDragEnd).toHaveBeenCalledTimes(1)
            expect(onLaneDragEnd).toHaveBeenCalledWith(expectedBoard, { fromPosition: 0 }, { toPosition: 1 })
          })
        })
      })
    })

    describe("about the board's custom card", () => {
      let renderCard
      const board = {
        lanes: [
          {
            id: 1,
            title: 'Lane Backlog',
            cards: [
              {
                id: 1,
                title: 'Card title',
                content: 'Card content'
              },
              {
                id: 2,
                title: 'Card title',
                content: 'Card content'
              }
            ]
          },
          {
            id: 2,
            title: 'Lane Doing',
            cards: [
              {
                id: 3,
                title: 'Card title',
                content: 'Card content'
              }
            ]
          }
        ]
      }

      afterEach(() => {
        renderCard = undefined
      })

      describe('when it receives a "renderCard" prop', () => {
        beforeEach(() => {
          renderCard = jest.fn(cardContent => (
            <div>
              {cardContent.id} - {cardContent.title} - {cardContent.content}
            </div>
          ))

          mount({ initialBoard: board, renderCard })
        })

        it("renders the custom cards on the board's lane", () => {
          const cards = subject.queryAllByTestId('card')
          expect(cards).toHaveLength(3)
          expect(cards[0]).toHaveTextContent(/^1 - Card title - Card content$/)
        })

        it('passes the card content and the card bag as a parameter to the renderCard prop', () => {
          expect(renderCard).toHaveBeenCalledWith(
            { id: 1, title: 'Card title', content: 'Card content' },
            { removeCard: expect.any(Function), dragging: false }
          )
        })
      })
    })

    describe("about the lane's header", () => {
      let renderLaneHeader
      const board = {
        lanes: [
          {
            id: 1,
            title: 'Lane Backlog',
            wip: 1,
            cards: [{ id: 2, title: 'Card title', content: 'Card content' }]
          }
        ]
      }

      afterEach(() => {
        renderLaneHeader = undefined
      })

      describe('when the component receives a "renderLaneHeader" prop', () => {
        beforeEach(() => {
          renderLaneHeader = jest.fn(laneContent => (
            <div>
              {laneContent.title} ({laneContent.wip})
            </div>
          ))

          mount({ initialBoard: board, renderLaneHeader })
        })

        it("renders the custom header on the board's lane", () => {
          expect(subject.queryAllByTestId('lane-header')).toHaveLength(1)
          expect(subject.queryByTestId('lane-header')).toHaveTextContent(/^Lane Backlog \(1\)$/)
        })

        it('passes the lane content, the "removeLane" and the "renameLane" to the "renderLaneHeader" prop', () => {
          expect(renderLaneHeader).toHaveBeenCalledTimes(1)
          expect(renderLaneHeader).toHaveBeenCalledWith(
            {
              id: 1,
              title: 'Lane Backlog',
              wip: 1,
              cards: [{ id: 2, title: 'Card title', content: 'Card content' }]
            },
            { removeLane: expect.any(Function), renameLane: expect.any(Function), addCard: expect.any(Function) }
          )
        })
      })

      describe('when the component does not receive a "renderLaneHeader" prop', () => {
        beforeEach(() => mount({ initialBoard: board }))

        it("renders the default header on the board's lane", () => {
          expect(subject.queryAllByTestId('lane-header')).toHaveLength(1)
          expect(subject.queryByTestId('lane-header')).toHaveTextContent(/^Lane Backlog$/)
        })
      })
    })

    describe('about the lane adding', () => {
      describe('about the default lane adder', () => {
        describe('when the component does not receive "allowAddLane" prop', () => {
          let onLaneNew, onNewLaneConfirm

          beforeEach(() => {
            onLaneNew = jest.fn()
            onNewLaneConfirm = jest.fn(lane => new Promise(resolve => resolve({ id: 999, ...lane })))
            mount({ allowAddLane: false, onNewLaneConfirm, onLaneNew })
          })
          afterEach(() => {
            onLaneNew = undefined
            onNewLaneConfirm = undefined
          })

          it('does not render the lane adder', () => {
            expect(subject.queryByText('➕')).not.toBeInTheDocument()
          })
        })

        describe('when the component does not receive "onNewLaneConfirm" prop', () => {
          beforeEach(() => {
            mount({ allowAddLane: true })
          })

          it('does not render the lane adder', () => {
            expect(subject.queryByText('➕')).not.toBeInTheDocument()
          })
        })

        describe('when it receives the "allowAddLane" and "onNewLaneConfirm" prop', () => {
          let onLaneNew, onNewLaneConfirm

          beforeEach(() => {
            onLaneNew = jest.fn()
            onNewLaneConfirm = jest.fn(lane => new Promise(resolve => resolve({ id: 999, ...lane })))
            mount({ allowAddLane: true, onNewLaneConfirm, onLaneNew })
          })
          afterEach(() => {
            onLaneNew = undefined
            onNewLaneConfirm = undefined
          })

          it('renders the lane placeholder as the last lane to add a new lane', () => {
            expect(subject.queryByText('➕')).toBeInTheDocument()
          })

          describe('when the user clicks to add a new lane', () => {
            beforeEach(() => fireEvent.click(subject.queryByText('➕')))

            it('hides the lane placeholder', () => {
              expect(subject.queryByText('➕')).not.toBeInTheDocument()
            })

            it('renders the input asking for a lane title', () => {
              expect(subject.container.querySelector('input')).toBeInTheDocument()
            })

            describe('when the user confirms the new lane', () => {
              beforeEach(async () => {
                fireEvent.change(subject.container.querySelector('input'), { target: { value: 'Lane Added by user' } })
                fireEvent.click(subject.queryByText('Add'))
                await waitForElement(() => subject.container.querySelector('[data-testid="lane"]:nth-child(3)'))
              })

              it('calls the "onNewLaneConfirm" passing the new lane', () => {
                expect(onNewLaneConfirm).toHaveBeenCalledTimes(1)
                expect(onNewLaneConfirm).toHaveBeenCalledWith({ title: 'Lane Added by user', cards: [] })
              })

              it('renders the new lane using the id returned on "onNewLaneConfirm"', () => {
                expect(subject.queryAllByTestId('lane')).toHaveLength(3)
              })

              it('renders the lane placeholder as the last lane to add a new lane', () => {
                expect(subject.queryByText('➕')).toBeInTheDocument()
              })

              it('calls the "onLaneNew" passing the modified board and the added lane', () => {
                expect(onLaneNew).toHaveBeenCalledTimes(1)
                expect(onLaneNew).toHaveBeenCalledWith(
                  {
                    lanes: [
                      expect.objectContaining({ id: 1 }),
                      expect.objectContaining({ id: 2 }),
                      expect.objectContaining({ id: 999 })
                    ]
                  },
                  { id: 999, title: 'Lane Added by user', cards: [] }
                )
              })
            })

            describe('when the user cancels the new lane adding', () => {
              beforeEach(() => {
                fireEvent.click(subject.queryByText('Cancel'))
              })

              it('does not add any new lane', () => {
                expect(subject.queryAllByTestId('lane')).toHaveLength(2)
              })

              it('renders the lane placeholder as the last lane to add a new lane', () => {
                expect(subject.queryByText('➕')).toBeInTheDocument()
              })
            })
          })
        })
      })

      describe('about custom lane adder', () => {
        describe('when the component receives a custom lane adder', () => {
          let onLaneNew, renderLaneAdder

          describe('when the component does not receive "allowAddLane" prop', () => {
            beforeEach(() => {
              renderLaneAdder = jest.fn(() => (
                <div>
                  <input data-testid='laneAdder' />
                </div>
              ))

              mount({ renderLaneAdder })

              it('does not renders the custom render adder', () => {
                expect(subject.queryByTestId('laneAdder')).toBeInTheDocument()
              })
            })
          })

          describe('when the component receives the "allowAddLane" prop', () => {
            beforeEach(() => {
              onLaneNew = jest.fn()
              renderLaneAdder = jest.fn(({ addLane }) => (
                <div data-testid='laneAdder'>
                  <button onClick={() => addLane({ id: 99, title: 'New lane', cards: [] })}>Add lane</button>
                </div>
              ))

              mount({ children: board, renderLaneAdder, allowAddLane: true, onLaneNew })
            })

            it('renders the custom lane adder as the last lane to add a new lane', () => {
              expect(subject.queryByTestId('laneAdder')).toBeInTheDocument()
            })

            it('passes the "addLane" to the "renderLaneAdder" prop', () => {
              expect(renderLaneAdder).toHaveBeenCalledTimes(1)
              expect(renderLaneAdder).toHaveBeenCalledWith({ addLane: expect.any(Function) })
            })

            describe('when the "addLane" callback is called', () => {
              beforeEach(() => fireEvent.click(within(subject.queryByTestId('laneAdder')).queryByText('Add lane')))

              it('renders the new lane', () => {
                const lane = subject.queryAllByTestId('lane')
                expect(lane).toHaveLength(3)
                expect(lane[2]).toHaveTextContent('New lane')
              })

              it('calls the "onLaneNew" callback passing both the updated board and the added lane', () => {
                expect(onLaneNew).toHaveBeenCalledTimes(1)
                expect(onLaneNew).toHaveBeenCalledWith(
                  {
                    lanes: [
                      expect.objectContaining({ id: 1 }),
                      expect.objectContaining({ id: 2 }),
                      expect.objectContaining({ id: 99, title: 'New lane' })
                    ]
                  },
                  expect.objectContaining({ id: 99, title: 'New lane' })
                )
              })
            })
          })
        })
      })
    })

    describe('about the lane removing', () => {
      beforeEach(() => {
        onLaneRemove = jest.fn()
      })

      describe('when the component uses the default header template', () => {
        describe('when the component receives the "allowRemoveLane" prop', () => {
          beforeEach(() => mount({ allowRemoveLane: true, onLaneRemove }))

          it('does not call the "onLaneRemove callback', () => {
            expect(onLaneRemove).not.toHaveBeenCalled()
          })

          describe('when the user clicks to remove a lane', () => {
            beforeEach(() => {
              const removeLaneButton = within(subject.queryAllByTestId('lane')[0]).queryByText('×')
              fireEvent.click(removeLaneButton)
            })

            it('removes the lane', () => {
              const lane = subject.queryAllByTestId('lane')
              expect(lane).toHaveLength(1)
              expect(lane[0]).toHaveTextContent('Lane Doing')
            })

            it('calls the "onLaneRemove" callback passing both the updated board and the removed lane', () => {
              expect(onLaneRemove).toHaveBeenCalledTimes(1)
              expect(onLaneRemove).toHaveBeenCalledWith(
                { lanes: [expect.objectContaining({ id: 2 })] },
                expect.objectContaining({ id: 1 })
              )
            })
          })
        })
      })

      describe('when the component receives a custom header lane template', () => {
        let renderLaneHeader

        beforeEach(() => {
          renderLaneHeader = jest.fn(({ title }, { removeLane }) => <div onClick={removeLane}>{title}</div>)
          onLaneRemove = jest.fn()
          mount({ renderLaneHeader, onLaneRemove })
        })

        it('does not call the "onLaneRemove" callback', () => {
          expect(onLaneRemove).not.toHaveBeenCalled()
        })

        it('passes the lane and the lane bag to the "renderLaneHeader"', () => {
          expect(renderLaneHeader).toHaveBeenCalledWith(
            expect.objectContaining({ id: 1, title: 'Lane Backlog' }),
            expect.objectContaining({ removeLane: expect.any(Function), renameLane: expect.any(Function) })
          )
        })

        describe('when the "removeLane" callback is called', () => {
          beforeEach(() => fireEvent.click(within(subject.queryAllByTestId('lane')[0]).queryByText('Lane Backlog')))

          it('removes the lane', () => {
            const lane = subject.queryAllByTestId('lane')
            expect(lane).toHaveLength(1)
            expect(lane[0]).toHaveTextContent('Lane Doing')
          })

          it('calls the "onLaneRemove" callback passing both the updated board and the removed lane', () => {
            expect(onLaneRemove).toHaveBeenCalledTimes(1)
            expect(onLaneRemove).toHaveBeenCalledWith(
              { lanes: [expect.objectContaining({ id: 2 })] },
              expect.objectContaining({ id: 1 })
            )
          })
        })
      })
    })

    describe('about the lane renaming', () => {
      describe('when the component use the default header template', () => {
        describe('when the component receives the "allowRenameLane" prop', () => {
          beforeEach(() => {
            onLaneRename = jest.fn()
            mount({ allowRenameLane: true, onLaneRename })
          })

          it('does not call the "onLaneRename" callback', () => {
            expect(onLaneRename).not.toHaveBeenCalled()
          })

          describe('when the user renames a lane', () => {
            beforeEach(() => {
              fireEvent.click(within(subject.queryAllByTestId('lane')[0]).queryByText('Lane Backlog'))
              fireEvent.change(subject.container.querySelector('input'), { target: { value: 'New title' } })
              fireEvent.click(subject.queryByText('Rename', { selector: 'button' }))
            })

            it('renames the lane', () => {
              expect(subject.queryAllByTestId('lane')[0]).toHaveTextContent('New title')
            })

            it('calls the "onLaneRename" callback passing both the updated board and the renamed lane', () => {
              expect(onLaneRename).toHaveBeenCalledTimes(1)
              expect(onLaneRename).toHaveBeenCalledWith(
                {
                  lanes: [
                    expect.objectContaining({ id: 1, title: 'New title' }),
                    expect.objectContaining({ id: 2, title: 'Lane Doing' })
                  ]
                },
                expect.objectContaining({ id: 1, title: 'New title' })
              )
            })
          })
        })

        describe('when the component does not receive the "allowRenameLane" prop', () => {
          beforeEach(() => {
            onLaneRename = jest.fn()
            mount({ onLaneRename })
          })

          it('does not call the "onLaneRename" callback', () => {
            expect(onLaneRename).not.toHaveBeenCalled()
          })

          it('does not show the button on lane header to remove the lane', () => {
            expect(subject.queryAllByTestId('lane')[0].querySelector('button')).not.toBeInTheDocument()
          })
        })
      })

      describe('when the component receives a custom header lane template', () => {
        beforeEach(() => {
          const renderLaneHeader = ({ title }, { renameLane }) => (
            <div onClick={() => renameLane('New title')}>{title}</div>
          )
          onLaneRename = jest.fn()
          mount({ renderLaneHeader, onLaneRename })
        })

        it('does not call the "onLaneRename" callback', () => {
          expect(onLaneRename).not.toHaveBeenCalled()
        })

        describe('when the "renameLane" callback is called', () => {
          beforeEach(() => fireEvent.click(within(subject.queryAllByTestId('lane')[0]).queryByText('Lane Backlog')))

          it('renames the lane', () => {
            expect(subject.queryAllByTestId('lane')[0]).toHaveTextContent('New title')
          })

          it('calls the "onLaneRemove" callback passing both the updated board and the renamed lane', () => {
            expect(onLaneRename).toHaveBeenCalledTimes(1)
            expect(onLaneRename).toHaveBeenCalledWith(
              {
                lanes: [
                  expect.objectContaining({ id: 1, title: 'New title' }),
                  expect.objectContaining({ id: 2, title: 'Lane Doing' })
                ]
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

          describe('when the user clicks to remove a card from a lane', () => {
            beforeEach(() => {
              const removeCardButton = within(subject.queryAllByTestId('card')[0]).queryByText('×')
              fireEvent.click(removeCardButton)
            })

            it('removes the card from the lane', () => {
              const cards = subject.queryAllByText(/^Card title/)
              expect(cards).toHaveLength(2)
              expect(cards[0]).toHaveTextContent('Card title 2')
              expect(cards[1]).toHaveTextContent('Card title 3')
            })

            it('calls the "onCardRemove" callback passing the updated board, the updated lane and the removed card', () => {
              expect(onCardRemove).toHaveBeenCalledTimes(1)
              expect(onCardRemove).toHaveBeenCalledWith(
                {
                  lanes: [
                    expect.objectContaining({ id: 1, cards: [expect.objectContaining({ id: 2 })] }),
                    expect.objectContaining({ id: 2, cards: [expect.objectContaining({ id: 3 })] })
                  ]
                },
                expect.objectContaining({ id: 1, title: 'Lane Backlog' }),
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

          it('removes the card from the lane', () => {
            const cards = subject.queryAllByText(/^Card title/)
            expect(cards).toHaveLength(2)
            expect(cards[0]).toHaveTextContent('Card title 2')
            expect(cards[1]).toHaveTextContent('Card title 3')
          })

          it('calls the "onCardRemove" callback passing the updated board, lane and the removed card', () => {
            expect(onCardRemove).toHaveBeenCalledTimes(1)
            expect(onCardRemove).toHaveBeenCalledWith(
              {
                lanes: [
                  expect.objectContaining({ title: 'Lane Backlog' }),
                  expect.objectContaining({ title: 'Lane Doing' })
                ]
              },
              expect.objectContaining({ id: 1, title: 'Lane Backlog' }),
              expect.objectContaining({ id: 1, title: 'Card title 1' })
            )
          })
        })
      })
    })

    describe('about the card adding', () => {
      describe('when the component receives a custom header lane template', () => {
        const renderLaneHeader = jest.fn((_, { addCard }) => {
          return <button onClick={() => addCard({ id: 99, title: 'New card' })}>New card</button>
        })
        const onCardNew = jest.fn()

        beforeEach(() => {
          renderLaneHeader.mockClear()
          onCardNew.mockClear()
        })

        it('does not call the "onCardNew" callback', () => {
          mount({ renderLaneHeader, onCardNew })
          expect(onCardNew).not.toHaveBeenCalled()
        })

        it('passes the lane and the lane bag to the "renderLaneHeader"', () => {
          mount({ renderLaneHeader, onCardNew })
          expect(renderLaneHeader).toHaveBeenCalledWith(
            expect.objectContaining({ id: 1, title: 'Lane Backlog' }),
            expect.objectContaining({
              removeLane: expect.any(Function),
              renameLane: expect.any(Function),
              addCard: expect.any(Function)
            })
          )
        })

        describe('when the "addCard" callback is called', () => {
          describe('when the position is not specified', () => {
            beforeEach(() => {
              mount({ renderLaneHeader, onCardNew })
              fireEvent.click(within(subject.queryAllByTestId('lane')[0]).queryByText('New card'))
            })

            it('adds a new card on the bottom of the lane', () => {
              const cards = within(subject.queryAllByTestId('lane')[0]).queryAllByTestId('card')
              expect(cards).toHaveLength(3)
              expect(cards[2]).toHaveTextContent('New card')
            })

            it('calls the "onCardNew" callback passing the updated board, the updated lane and the new card', () => {
              expect(onCardNew).toHaveBeenCalledTimes(1)
              expect(onCardNew).toHaveBeenCalledWith(
                {
                  lanes: [expect.objectContaining({ id: 1 }), expect.objectContaining({ id: 2 })]
                },
                expect.objectContaining({
                  id: 1,
                  cards: [
                    expect.objectContaining({ id: 1 }),
                    expect.objectContaining({ id: 2 }),
                    expect.objectContaining({ id: 99 })
                  ]
                }),
                expect.objectContaining({ id: 99 })
              )
            })
          })

          describe('when the position is specified to add the card on the top of the lane', () => {
            beforeEach(() => {
              const renderLaneHeader = jest.fn((_, { addCard }) => {
                return <button onClick={() => addCard({ id: 99, title: 'New card' }, { on: 'top' })}>New card</button>
              })
              mount({ renderLaneHeader, onCardNew })
              fireEvent.click(within(subject.queryAllByTestId('lane')[0]).queryByText('New card'))
            })

            it('adds a new card on the top of the lane', () => {
              const cards = within(subject.queryAllByTestId('lane')[0]).queryAllByTestId('card')
              expect(cards).toHaveLength(3)
              expect(cards[0]).toHaveTextContent('New card')
            })

            it('calls the "onCardNew" callback passing the updated board, the updated lane and the new card', () => {
              expect(onCardNew).toHaveBeenCalledTimes(1)
              expect(onCardNew).toHaveBeenCalledWith(
                {
                  lanes: [expect.objectContaining({ id: 1 }), expect.objectContaining({ id: 2 })]
                },
                expect.objectContaining({
                  id: 1,
                  cards: [
                    expect.objectContaining({ id: 99 }),
                    expect.objectContaining({ id: 1 }),
                    expect.objectContaining({ id: 2 })
                  ]
                }),
                expect.objectContaining({ id: 99 })
              )
            })
          })

          describe('when the position is specified to add the card on the bottom of the lane', () => {
            beforeEach(() => {
              const renderLaneHeader = jest.fn((_, { addCard }) => {
                return (
                  <button onClick={() => addCard({ id: 99, title: 'New card' }, { on: 'bottom' })}>New card</button>
                )
              })
              mount({ renderLaneHeader, onCardNew })
              fireEvent.click(within(subject.queryAllByTestId('lane')[0]).queryByText('New card'))
            })

            it('adds a new card on the bottom of the lane', () => {
              const cards = within(subject.queryAllByTestId('lane')[0]).queryAllByTestId('card')
              expect(cards).toHaveLength(3)
              expect(cards[2]).toHaveTextContent('New card')
            })

            it('calls the "onCardNew" callback passing the updated board, the updated lane and the new card', () => {
              expect(onCardNew).toHaveBeenCalledTimes(1)
              expect(onCardNew).toHaveBeenCalledWith(
                {
                  lanes: [expect.objectContaining({ id: 1 }), expect.objectContaining({ id: 2 })]
                },
                expect.objectContaining({
                  id: 1,
                  cards: [
                    expect.objectContaining({ id: 1 }),
                    expect.objectContaining({ id: 2 }),
                    expect.objectContaining({ id: 99 })
                  ]
                }),
                expect.objectContaining({ id: 99 })
              )
            })
          })
        })
      })
    })
  })
})
