import React from 'react'
import { render, within } from 'react-testing-library'
import Board from './'

describe('<Board />', () => {
  let subject

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

    subject = render(<Board>{board}</Board>)
  })
  afterEach(() => { subject = undefined })

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
})
