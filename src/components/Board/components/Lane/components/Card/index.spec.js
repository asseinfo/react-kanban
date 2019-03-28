import React from 'react'
import { render } from 'react-testing-library'
import Card from './'

describe('<Card />', () => {
  let subject

  beforeEach(() => {
    const card = {
      id: 1,
      title: 'Card title',
      description: 'Card content'
    }

    subject = render(<Card>{card}</Card>)
  })
  afterEach(() => { subject = undefined })

  it('renders a card', () => {
    expect(subject.container).toBeInTheDocument()
  })

  it("renders the card's title", () => {
    expect(subject.queryByText(/^Card title$/)).toBeInTheDocument()
  })

  it("renders the card's description", () => {
    expect(subject.queryByText(/^Card content$/)).toBeInTheDocument()
  })
})
