import React from 'react'
import { render } from 'react-testing-library'
import Lane from './'

describe('<Lane />', () => {
  let subject
  const lane = {
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

  function mount ({ children = lane, ...otherProps } = {}) {
    subject = render(<Lane {...otherProps}>{children}</Lane>)
    return subject
  }

  afterEach(() => { subject = undefined })

  it('renders a lane', () => {
    expect(mount().container.querySelector('div')).toBeInTheDocument()
  })

  it("renders the lane's title", () => {
    expect(mount().queryByText(/^Backlog$/)).toBeInTheDocument()
  })

  it('renders the specified cards in the lane ordered by its specified position', () => {
    const cards = mount().queryAllByText(/^Card title/)
    expect(cards).toHaveLength(2)
    expect(cards[0]).toHaveTextContent(/^Card title 1$/)
    expect(cards[1]).toHaveTextContent(/^Card title 2$/)
  })

  describe("about the lane's custom card", () => {
    let renderCard
    const lane = {
      id: 1,
      title: 'Backlog',
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
    }

    afterEach(() => { renderCard = undefined })

    describe('when it receives a "renderCard" prop', () => {
      beforeEach(() => {
        renderCard = jest.fn(cardContent => (
          <div>{cardContent.id} - {cardContent.title} - {cardContent.content}</div>
        ))

        mount({ children: lane, renderCard })
      })

      it('renders the custom cards on the lane', () => {
        expect(subject.queryAllByTestId('card')).toHaveLength(2)
        expect(subject.queryByTestId('card')).toHaveTextContent(/^1 - Card title - Card content$/)
      })
    })
  })
})
