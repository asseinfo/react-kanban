import React from 'react'
import { render, within, act } from 'react-testing-library'
import Board from './'
import { callbacks } from 'react-beautiful-dnd'

describe('<Board />', () => {
  let subject, onCardDragEnd, onLaneDragEnd

  function mount (props) {
    const board = {
      lanes: [
        {
          id: 1,
          title: 'Lane Backlog',
          cards: [
            {
              id: 1,
              title: 'Card title',
              description: 'Card content'
            },
            {
              id: 2,
              title: 'Card title',
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
              title: 'Card title',
              description: 'Card content'
            }
          ]
        }
      ]
    }
    subject = render(<Board {...props}>{board}</Board>)
    return subject
  }
  afterEach(() => { subject = onCardDragEnd = onLaneDragEnd = undefined })

  it('renders a board', () => {
    expect(mount().container).toBeInTheDocument()
  })

  it('renders the specified lanes in the board ordered by its specified position', () => {
    const lanes = mount().queryAllByText(/^Lane/)
    expect(lanes).toHaveLength(2)
    expect(lanes[0]).toHaveTextContent(/^Lane Backlog$/)
    expect(lanes[1]).toHaveTextContent(/^Lane Doing$/)
  })

  it('renders the specified cards in their lanes', () => {
    expect(within(mount().queryByText(/^Lane Backlog$/).parentNode).queryAllByText(/^Card title$/)).toHaveLength(2)
  })

  describe('about the card moving', () => {
    describe('when the component receives "onCardDragEnd" callback', () => {
      beforeEach(() => {
        onCardDragEnd = jest.fn()
        mount({ onCardDragEnd })
      })

      describe('when the user cancels the card moving', () => {
        beforeEach(() => { callbacks.onDragEnd({ source: null, destination: null }) })

        it('does not call onCardDragEnd callback', () => {
          expect(onCardDragEnd).not.toHaveBeenCalled()
        })
      })

      describe('when the user moves a card to another position', () => {
        beforeEach(() => {
          act(() => {
            callbacks.onDragEnd({ source: { droppableId: '1', index: 0 }, destination: { droppableId: '1', index: 1 } })
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
                    title: 'Card title',
                    description: 'Card content'
                  },
                  {
                    id: 1,
                    title: 'Card title',
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
                    title: 'Card title',
                    description: 'Card content'
                  }
                ]
              }
            ]
          }
          expect(onCardDragEnd).toHaveBeenCalledTimes(1)
          expect(onCardDragEnd).toHaveBeenCalledWith(expectedBoard, { laneId: 1, index: 0 }, { laneId: 1, index: 1 })
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
        beforeEach(() => { callbacks.onDragEnd({ source: null, destination: null, type: 'BOARD' }) })

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
                    title: 'Card title',
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
                    title: 'Card title',
                    description: 'Card content'
                  },
                  {
                    id: 2,
                    title: 'Card title',
                    description: 'Card content'
                  }
                ]
              }
            ]
          }

          expect(onLaneDragEnd).toHaveBeenCalledTimes(1)
          expect(onLaneDragEnd).toHaveBeenCalledWith(expectedBoard, { index: 0 }, { index: 1 })
        })
      })
    })
  })
})
