import { render, fireEvent } from '@testing-library/react'
import ColumnAdder from '@/components/Board/components/ColumnAdder'

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<ColumnAdder />', () => {
  let subject: any, onConfirm: any

  function mount() {
    // @ts-expect-error TS(2304): Cannot find name 'jest'.
    onConfirm = jest.fn()

    subject = render(<ColumnAdder onConfirm={onConfirm} />)
  }

  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(mount)
  // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
  afterEach(() => {
    subject = onConfirm = undefined
  })

  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('renders the column placeholder to add a new column', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subject.queryByText('➕')).toBeInTheDocument()
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the user clicks to add a new column', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => fireEvent.click(subject.queryByText('➕')))

    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hides the column placeholder', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(subject.queryByText('➕')).not.toBeInTheDocument()
    })

    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('renders the input asking for a column name', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(subject.container.querySelector('input')).toBeInTheDocument()
    })

    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the user confirms the new column', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        fireEvent.change(subject.container.querySelector('input'), { target: { value: 'Column Added by user' } })
        fireEvent.click(subject.queryByText('Add'))
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('calls the "onConfirm" prop passing the column title', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onConfirm).toHaveBeenCalledTimes(1)
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onConfirm).toHaveBeenCalledWith('Column Added by user')
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('hides the input', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(subject.container.querySelector('input')).not.toBeInTheDocument()
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('renders the column placeholder to add a new column', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(subject.queryByText('➕')).toBeInTheDocument()
      })
    })

    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the user cancels the new column', () => {
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
      it('renders the column placeholder to add a new column', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(subject.queryByText('➕')).toBeInTheDocument()
      })
    })
  })
})
