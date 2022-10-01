import { render, fireEvent } from '@testing-library/react'
import DefaultCard from '@/components/Board/components/DefaultCard'

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<DefaultCard />', () => {
  let subject: any

  // @ts-expect-error TS(2304): Cannot find name 'jest'.
  const onCardRemove = jest.fn()

  const card = { id: 1, title: 'Card title', description: 'Description' }

  function mount(props: any) {
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

  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(reset)

  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('renders a card with its title and its description', () => {
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
    const subject = mount()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subject.queryByText('Card title')).toBeVisible()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subject.queryByText('Description')).toBeVisible()
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('about the style on dragging', () => {
    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the component receives "dragging"', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => mount({ dragging: true }))

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('applies the gray background color to the card', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(subject.container.querySelector('div')).toHaveClass('react-kanban-card--dragging')
      })
    })

    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the component does not receive "dragging"', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => mount())

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not apply the gray background color to the card', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(subject.container.querySelector('div')).not.toHaveClass('react-kanban-card--dragging')
      })
    })
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('about the remove card button', () => {
    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the component does not receive the "allowRemoveCard" prop', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => mount({ onCardRemove }))

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not show the remove button', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(subject.queryByText('×')).not.toBeInTheDocument()
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not call the "onCardRemove" callback', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onCardRemove).not.toHaveBeenCalled()
      })
    })

    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the component receives the "allowRemoveCard" prop', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => mount({ allowRemoveCard: true }))

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('shows the remove button', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(subject.queryByText('×')).toBeInTheDocument()
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not call the "onCardRemove" callback', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onCardRemove).not.toHaveBeenCalled()
      })

      // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when the user clicks on the remove button', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => fireEvent.click(subject.queryByText('×')))

        // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('calls the "onCardRemove" callback passing the card', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(onCardRemove).toHaveBeenCalledTimes(1)
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(onCardRemove).toHaveBeenCalledWith(card)
        })
      })
    })
  })
})
