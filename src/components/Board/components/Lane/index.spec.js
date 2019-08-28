import React from 'react'
import { render, fireEvent, within } from '@testing-library/react'
import Lane, { StyledLane } from './'

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
    subject = render(<Lane {...otherProps} renderLaneHeader={<div>Backlog</div>}>{children}</Lane>)
    return subject
  }

  afterEach(() => { subject = undefined })

  it('renders a lane', () => {
    expect(mount().container.querySelector('div')).toBeInTheDocument()
  })

  it("renders the lane's header", () => {
    expect(mount().queryByText(/^Backlog$/)).toBeInTheDocument()
  })

  it('renders the specified cards in the lane ordered by its specified position', () => {
    const cards = mount().queryAllByText(/^Card title/)
    expect(cards).toHaveLength(2)
    expect(cards[0]).toHaveTextContent(/^Card title 1/)
    expect(cards[1]).toHaveTextContent(/^Card title 2/)
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
        renderCard = jest.fn()
        mount({ children: lane, renderCard })
      })

      it('calls the "renderCard" passing the card and whether the card is dragging or not', () => {
        expect(renderCard).toHaveBeenCalledTimes(2)
        expect(renderCard).toHaveBeenNthCalledWith(1, expect.objectContaining({ id: 1, title: 'Card title' }), false)
        expect(renderCard).toHaveBeenNthCalledWith(2, expect.objectContaining({ id: 2, title: 'Card title' }), false)
      })
    })
  })

  describe('about the card removing', () => {
    let onCardRemove

    describe('when the component uses the default card template', () => {
      describe('when the component receives the "allowRemoveCard" prop', () => {
        beforeEach(() => {
          onCardRemove = jest.fn()
          mount({ allowRemoveCard: true, onCardRemove })
        })

        it('does not call the "onCardRemove callback', () => {
          expect(onCardRemove).toHaveBeenCalledTimes(0)
        })

        it('shows a button to remove the card', () => {
          expect(within(subject.queryByText('Card title 1')).queryByText('×')).toBeVisible()
        })

        describe('when the user clicks to remove a card', () => {
          beforeEach(() => {
            const removeCardButton = within(subject.queryByText('Card title 1')).queryByText('×')
            fireEvent.click(removeCardButton)
          })

          it('calls the "onCardRemove" callback passing the card', () => {
            expect(onCardRemove).toHaveBeenCalledTimes(1)
            expect(onCardRemove).toHaveBeenCalledWith(
              expect.objectContaining({ title: 'Card title 1' })
            )
          })
        })
      })

      describe('when the component does not receive the "allowRemoveCard" prop', () => {
        beforeEach(() => {
          onCardRemove = jest.fn()
          mount({ onCardRemove })
        })

        it('does not call the "onCardRemove" callback', () => {
          expect(onCardRemove).toHaveBeenCalledTimes(0)
        })

        it('does not show the button on card to remove the card', () => {
          expect(within(subject.queryByText('Card title 1')).queryByText('×')).not.toBeInTheDocument()
        })
      })
    })
  })
})

describe('<StyledLane />', () => {
  it('renders a lane', () => {
    expect(render(<StyledLane />).container.querySelector('div')).toBeInTheDocument()
  })
})
