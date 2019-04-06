import React from 'react'
import { render } from 'react-testing-library'
import Card from './'
import { callbacks } from 'react-beautiful-dnd'

describe('<Card />', () => {
  let subject

  function mount () {
    const card = {
      id: 1,
      title: 'Card title',
      description: 'Card content'
    }

    subject = render(<Card>{card}</Card>)
    return subject
  }
  afterEach(() => { subject = undefined })

  it('renders a card', () => {
    expect(mount().container).toBeInTheDocument()
  })

  it("renders the card's title", () => {
    expect(mount().queryByText(/^Card title$/)).toBeInTheDocument()
  })

  it("renders the card's description", () => {
    expect(mount().queryByText(/^Card content$/)).toBeInTheDocument()
  })

  describe('when the card is being dragging', () => {
    beforeEach(() => {
      callbacks.isDragging(true)
      mount()
    })

    it('shows the card with a box shadow', () => {
      expect(subject.queryByText(/^Card title$/).parentNode).toHaveStyle('box-shadow: 2px 2px grey')
    })
  })
})
