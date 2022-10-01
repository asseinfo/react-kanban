import { render, fireEvent } from '@testing-library/react'
import CardAdder from '@/components/Board/components/ColumnAdder'

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<CardAdder />', () => {
  let subject: any, onConfirm: any
  const column = { id: 1 }
  function mount() {
    // @ts-expect-error TS(2304): Cannot find name 'jest'.
    onConfirm = jest.fn()

    subject = render(<CardAdder column={column} onConfirm={onConfirm} />)
  }

  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(mount)
  // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
  afterEach(() => {
    subject = onConfirm = undefined
  })

  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('renders the button to add a new card', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subject.queryByText('+')).toBeInTheDocument()
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the user clicks to add a new card', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => fireEvent.click(subject.queryByText('+')))

    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hides the card placeholder', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(subject.queryByText('+')).not.toBeInTheDocument()
    })

    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('renders the card inputs', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(subject.container.querySelector('input[name="title"]')).toBeInTheDocument()
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(subject.container.querySelector('input[name="description"]')).toBeInTheDocument()
    })

    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the user confirms the new card', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        fireEvent.change(subject.container.querySelector('input[name="title"]'), {
          target: { value: 'Card Added by user' },
        })
        fireEvent.change(subject.container.querySelector('input[name="description"]'), {
          target: { value: 'Description' },
        })
        fireEvent.click(subject.queryByText('Add'))
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('calls the "onConfirm" prop passing the new card and the column', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onConfirm).toHaveBeenCalledTimes(1)
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onConfirm).toHaveBeenCalledWith(column, { title: 'Card Added by user', description: 'Description' })
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('hides the input', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(subject.container.querySelector('input')).not.toBeInTheDocument()
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('renders the placeholder to add a new card', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(subject.queryByText('+')).toBeInTheDocument()
      })
    })

    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the user cancels the new card', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        fireEvent.click(subject.queryByText('Cancel'))
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not call the "onConfirm" prop', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onConfirm).not.toHaveBeenCalled()
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('hides the input', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(subject.container.querySelector('input')).not.toBeInTheDocument()
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('renders the placeholder to add a new card', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(subject.queryByText('+')).toBeInTheDocument()
      })
    })
  })
})
