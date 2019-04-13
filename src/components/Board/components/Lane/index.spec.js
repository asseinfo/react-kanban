import React from 'react'
import { render } from 'react-testing-library'
import Lane from './'

describe('<Lane />', () => {
  let subject

  beforeEach(() => {
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

    subject = render(<Lane>{lane}</Lane>)
  })
  afterEach(() => { subject = undefined })

  it('renders a lane', () => {
    expect(subject.container.querySelector('div')).toBeInTheDocument()
  })

  it("renders the lane's title", () => {
    expect(subject.queryByText(/^Backlog$/)).toBeInTheDocument()
  })

  it('renders the specified cards in the lane ordered by its specified position', () => {
    const cards = subject.queryAllByText(/^Card title/)
    expect(cards).toHaveLength(2)
    expect(cards[0]).toHaveTextContent(/^Card title 1$/)
    expect(cards[1]).toHaveTextContent(/^Card title 2$/)
  })
})
