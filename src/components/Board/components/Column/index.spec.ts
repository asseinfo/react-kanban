import { render, fireEvent } from '@testing-library/react'
import Column from './'

// @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<Column />', () => {
  // @ts-expect-error TS(7034) FIXME: Variable 'subject' implicitly has type 'any' in so... Remove this comment to see the full error message
  let subject

  // @ts-expect-error TS(2304) FIXME: Cannot find name 'jest'.
  const renderCard = jest.fn((_, { title }) => <div>{title}</div>)

  const column = {
    id: 1,
    title: 'Backlog',
    cards: [
      {
        id: 1,
        title: 'Card title 1',
        description: 'Card content',
      },
      {
        id: 2,
        title: 'Card title 2',
        description: 'Card content',
      },
    ],
  }

  function mount({ children = column, ...otherProps } = {}) {
    subject = render(
      // @ts-expect-error TS(2749) FIXME: 'Column' refers to a value, but is being used as a... Remove this comment to see the full error message
      <Column {...otherProps} renderColumnHeader={() => <div>Backlog</div>} renderCard={renderCard}>
        // @ts-expect-error TS(2365) FIXME: Operator '<' cannot be applied to types '{ childre... Remove this comment to see the full error message
        {children}
      </Column>
    )
    return subject
  }

  function reset() {
    subject = undefined
    renderCard.mockClear()
  }

  // @ts-expect-error TS(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(reset)

  // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('renders a column', () => {
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
    expect(mount().container.querySelector('div')).toBeInTheDocument()
  })

  // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it("renders the column's header", () => {
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
    expect(mount().queryByText(/^Backlog$/)).toBeInTheDocument()
  })

  // @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe("about the column's card", () => {
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => mount())

    // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('renders the specified cards in the column ordered by its specified position', () => {
      // @ts-expect-error TS(7005) FIXME: Variable 'subject' implicitly has an 'any' type.
      const cards = subject.queryAllByText(/^Card title/)
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
      expect(cards).toHaveLength(2)
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
      expect(cards[0]).toHaveTextContent(/^Card title 1/)
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
      expect(cards[1]).toHaveTextContent(/^Card title 2/)
    })

    // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('calls the "renderCard" passing the column, the card and whether the card is dragging or not', () => {
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
      expect(renderCard).toHaveBeenCalledWith(column, expect.objectContaining({ id: 1, title: 'Card title 1' }), false)
    })
  })

  // @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('about the card adding', () => {
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'jest'.
    const onCardNew = jest.fn()

    // @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the component does not receive the "allowAddCard" prop', () => {
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'beforeEach'.
      beforeEach(() => mount({ onCardNew }))

      // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not show the add card button', () => {
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
        expect(subject.queryByText('+')).not.toBeInTheDocument()
      })
    })

    // @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the component receives the "allowAddCard" prop', () => {
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'beforeEach'.
      beforeEach(() => mount({ onCardNew, allowAddCard: true }))

      // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('shows the add card button', () => {
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
        expect(subject.queryByText('+')).toBeVisible()
      })

      // @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when the user clicks on the add card button', () => {
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'beforeEach'.
        beforeEach(() => fireEvent.click(subject.queryByText('+')))

        // @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
        describe('when the user confirm a new card', () => {
          // @ts-expect-error TS(2304) FIXME: Cannot find name 'beforeEach'.
          beforeEach(() => {
            // @ts-expect-error TS(7005) FIXME: Variable 'subject' implicitly has an 'any' type.
            fireEvent.change(subject.container.querySelector('input[name="title"]'), {
              target: { value: 'Card title' },
            })
            // @ts-expect-error TS(7005) FIXME: Variable 'subject' implicitly has an 'any' type.
            fireEvent.change(subject.container.querySelector('input[name="description"]'), {
              target: { value: 'Description' },
            })
            // @ts-expect-error TS(7005) FIXME: Variable 'subject' implicitly has an 'any' type.
            fireEvent.click(subject.queryByText('Add'))
          })

          // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('calls the onCardNew prop passing the values', () => {
            // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
            expect(onCardNew).toHaveBeenCalledTimes(1)
            // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
            expect(onCardNew).toHaveBeenCalledWith(column, { title: 'Card title', description: 'Description' })
          })
        })
      })
    })
  })
})
