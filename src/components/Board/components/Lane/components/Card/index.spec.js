import React from 'react'
import { render } from 'react-testing-library'
import Card, { CardSkeleton } from './'
import { callbacks } from 'react-beautiful-dnd'

describe('<Card />', () => {
  let subject

  const defaultCard = {
    id: 1,
    title: 'Card title',
    description: 'Card content'
  }

  function mount ({ children = defaultCard, ...otherProps } = {}) {
    subject = render(<Card {...otherProps}>{children}</Card>)
    return subject
  }

  afterEach(() => { subject = undefined })

  it('renders a card', () => {
    expect(mount().container.querySelector('div')).toBeInTheDocument()
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
    afterEach(() => { callbacks.isDragging(false) })

    it('shows the card with a box shadow', () => {
      expect(subject.queryByText(/^Card title$/).parentNode).toHaveStyle('box-shadow: 2px 2px grey')
    })
  })

  describe('about a custom card', () => {
    let renderCard
    const customCard = {
      id: 1,
      title: 'Card title',
      content: 'Card content'
    }

    afterEach(() => { renderCard = undefined })

    describe('when it receives a "renderCard" prop', () => {
      beforeEach(() => {
        renderCard = jest.fn(cardContent => (
          <div id='customCard'>{cardContent.id} - {cardContent.title} - {cardContent.content}</div>
        ))

        mount({ children: customCard, renderCard })
      })

      it('renders the custom card', () => {
        expect(subject.container.querySelector('div#customCard')).toHaveTextContent(/^1 - Card title - Card content$/)
      })

      it('passes the card content and the isDragging as a parameter to the renderCard prop', () => {
        expect(renderCard).toHaveBeenCalledTimes(1)
        expect(renderCard).toHaveBeenCalledWith(customCard, false)
      })
    })
  })
})

describe('<CardSkeleton />', () => {
  it("renders a card's skeleton", () => {
    expect(render(<CardSkeleton />).container.querySelector('div')).toBeInTheDocument()
  })
})
