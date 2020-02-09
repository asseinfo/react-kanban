import React from 'react'
import { render } from '@testing-library/react'
import Card from './'
import { callbacks } from 'react-beautiful-dnd'

describe('<Card />', () => {
  let subject

  const card = {
    id: 1,
    title: 'Card title',
    description: 'Card content'
  }

  const defaultCard = jest.fn(() => <div>Card title</div>)

  function mount({ children = card, ...otherProps } = {}) {
    subject = render(
      <Card renderCard={defaultCard} {...otherProps}>
        {children}
      </Card>
    )
    return subject
  }

  function reset() {
    subject = undefined
    defaultCard.mockClear()
  }

  beforeEach(reset)

  it('renders the specified card', () => {
    expect(mount().queryByText('Card title')).toBeInTheDocument()
  })

  describe('when the card is being dragging', () => {
    beforeEach(() => {
      callbacks.isDragging(true)
      mount()
    })
    afterEach(() => {
      callbacks.isDragging(false)
    })

    it('calls the "renderCard" prop passing the dragging value', () => {
      expect(defaultCard).toHaveBeenCalledTimes(1)
      expect(defaultCard).toHaveBeenCalledWith(true)
    })
  })
})
