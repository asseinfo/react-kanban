import React from 'react'
import { render, within, act } from 'react-testing-library'
import Board from './'
import { callbacks } from 'react-beautiful-dnd'

describe('<Board />', () => {
  let subject, onCardDragEnd

  beforeEach(() => {
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
    onCardDragEnd = jest.fn()

    subject = render(<Board onCardDragEnd={onCardDragEnd}>{board}</Board>)
  })
  afterEach(() => { subject = onCardDragEnd = undefined })

  it('renders a board', () => {
    expect(subject.container).toBeInTheDocument()
  })

  it('renders the specified lanes in the board ordered by its specified position', () => {
    const lanes = subject.queryAllByText(/^Lane/)
    expect(lanes).toHaveLength(2)
    expect(lanes[0]).toHaveTextContent(/^Lane Backlog$/)
    expect(lanes[1]).toHaveTextContent(/^Lane Doing$/)
  })

  it('renders the specified cards in their lanes', () => {
    expect(within(subject.queryByText(/^Lane Backlog$/).parentNode).queryAllByText(/^Card title$/)).toHaveLength(2)
  })

  describe('about the card moving', () => {
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
          callbacks.onDragEnd({ source: { droppableId: '1', index: 0 }, destination: { droppableId: '1', index: 1 } })
        })
      })

      it('calls the onCardDragEnd callback passing the modified board and the moving coordinates', () => {
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
