import React from 'react'
import { render } from '@testing-library/react'
import Column from './'

describe('<Column />', () => {
  let subject

  const renderCard = jest.fn((_, { title }) => <div>{title}</div>)

  const column = {
    id: 1,
    title: 'Backlog',
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

  function mount({ children = column, ...otherProps } = {}) {
    subject = render(
      <Column {...otherProps} renderColumnHeader={() => <div>Backlog</div>} renderCard={renderCard}>
        {children}
      </Column>
    )
    return subject
  }

  function reset() {
    subject = undefined
    renderCard.mockClear()
  }

  beforeEach(reset)

  it('renders a column', () => {
    expect(mount().container.querySelector('div')).toBeInTheDocument()
  })

  it("renders the column's header", () => {
    expect(mount().queryByText(/^Backlog$/)).toBeInTheDocument()
  })

  describe("about the column's card", () => {
    beforeEach(() => mount())

    it('renders the specified cards in the column ordered by its specified position', () => {
      const cards = subject.queryAllByText(/^Card title/)
      expect(cards).toHaveLength(2)
      expect(cards[0]).toHaveTextContent(/^Card title 1/)
      expect(cards[1]).toHaveTextContent(/^Card title 2/)
    })

    it('calls the "renderCard" passing the column, the card and whether the card is dragging or not', () => {
      expect(renderCard).toHaveBeenCalledWith(column, expect.objectContaining({ id: 1, title: 'Card title 1' }), false)
    })
  })
})
