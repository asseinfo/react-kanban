import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DefaultCard from './'

describe('<DefaultCard />', () => {
  let subject

  const onCardRemove = jest.fn()

  const card = { id: 1, title: 'Card title', description: 'Description' }

  function mount(props) {
    subject = render(
      <DefaultCard onCardRemove={onCardRemove} {...props}>
        {card}
      </DefaultCard>
    )
    return subject
  }

  function reset() {
    subject = undefined
    onCardRemove.mockClear()
  }

  beforeEach(reset)

  it('renders a card with its title and its description', () => {
    const subject = mount()
    expect(subject.queryByText('Card title')).toBeVisible()
    expect(subject.queryByText('Description')).toBeVisible()
  })

  describe('about the style on dragging', () => {
    describe('when the component receives "dragging"', () => {
      beforeEach(() => mount({ dragging: true }))

      it('applies the gray background color to the card', () => {
        expect(subject.container.querySelector('div')).toHaveStyle('box-shadow: 2px 2px grey;')
      })
    })

    describe('when the component does not receive "dragging"', () => {
      beforeEach(() => mount())

      it('does not apply the gray background color to the card', () => {
        expect(subject.container.querySelector('div')).not.toHaveStyle('box-shadow: 2px 2px grey;')
      })
    })
  })

  describe('about the remove card button', () => {
    describe('when the component does not receive the "allowRemoveCard" prop', () => {
      beforeEach(() => mount({ onCardRemove }))

      it('does not show the remove button', () => {
        expect(subject.queryByText('×')).not.toBeInTheDocument()
      })

      it('does not call the "onCardRemove" callback', () => {
        expect(onCardRemove).not.toHaveBeenCalled()
      })
    })

    describe('when the component receives the "allowRemoveCard" prop', () => {
      beforeEach(() => mount({ allowRemoveCard: true }))

      it('shows the remove button', () => {
        expect(subject.queryByText('×')).toBeInTheDocument()
      })

      it('does not call the "onCardRemove" callback', () => {
        expect(onCardRemove).not.toHaveBeenCalled()
      })

      describe('when the user clicks on the remove button', () => {
        beforeEach(() => fireEvent.click(subject.queryByText('×')))

        it('calls the "onCardRemove" callback passing the card', () => {
          expect(onCardRemove).toHaveBeenCalledTimes(1)
          expect(onCardRemove).toHaveBeenCalledWith(card)
        })
      })
    })
  })
})
