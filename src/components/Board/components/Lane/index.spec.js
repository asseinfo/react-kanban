import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Lane, { StyledLane } from './'

describe('<Lane />', () => {
  let subject

  const renderCard = jest.fn((_, { title }) => <div>{title}</div>)

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

  function mount({ children = lane, ...otherProps } = {}) {
    subject = render(
      <Lane {...otherProps} renderLaneHeader={() => <div>Backlog</div>} renderCard={renderCard}>
        {children}
      </Lane>
    )
    return subject
  }

  function reset() {
    subject = undefined
    renderCard.mockClear()
  }

  beforeEach(reset)

  it('renders a lane', () => {
    expect(mount().container.querySelector('div')).toBeInTheDocument()
  })

  it("renders the lane's header", () => {
    expect(mount().queryByText(/^Backlog$/)).toBeInTheDocument()
  })

  describe("about the lane's card", () => {
    beforeEach(() => mount())

    it('renders the specified cards in the lane ordered by its specified position', () => {
      const cards = subject.queryAllByText(/^Card title/)
      expect(cards).toHaveLength(2)
      expect(cards[0]).toHaveTextContent(/^Card title 1/)
      expect(cards[1]).toHaveTextContent(/^Card title 2/)
    })

    it('calls the "renderCard" passing the lane, the card and whether the card is dragging or not', () => {
      expect(renderCard).toHaveBeenCalledWith(lane, expect.objectContaining({ id: 1, title: 'Card title 1' }), false)
    })
  })

  describe('about the card adding', () => {
    const onCardAdd = jest.fn()

    describe('when the component does not receive the "allowAddCard" prop', () => {
      beforeEach(() => mount({ onCardAdd }))

      it('does not show the add card button', () => {
        expect(subject.queryByText('+')).not.toBeInTheDocument()
      })
    })

    describe('when the component receives the "allowAddCard" prop', () => {
      beforeEach(() => mount({ onCardAdd, allowAddCard: true }))

      it('shows the add card button', () => {
        expect(subject.queryByText('+')).toBeVisible()
      })

      describe('when the user clicks on the add card button', () => {
        beforeEach(() => fireEvent.click(subject.queryByText('+')))

        it('shows the add card form', () => {
          expect(subject.container.querySelector('form')).toBeVisible()
        })

        describe('when the user confirm a new card', () => {
          beforeEach(() => {
            fireEvent.change(subject.container.querySelector('input[name="title"]'), {
              target: { value: 'Card title' }
            })
            fireEvent.change(subject.container.querySelector('input[name="description"]'), {
              target: { value: 'Description' }
            })
            fireEvent.click(subject.queryByText('Add'))
          })

          it('calls the onCardAdd prop passing the values', () => {
            expect(onCardAdd).toHaveBeenCalledTimes(1)
            expect(onCardAdd).toHaveBeenCalledWith(lane, { title: 'Card title', description: 'Description' })
          })
        })

        describe('when the user cancels the card adding', () => {
          beforeEach(() => fireEvent.click(subject.queryByText('Cancel')))

          it('hides the add card form', () => {
            expect(subject.container.querySelector('form')).not.toBeInTheDocument()
          })
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
