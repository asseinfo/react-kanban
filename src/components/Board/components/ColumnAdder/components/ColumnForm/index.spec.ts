import { render, fireEvent } from '@testing-library/react'
import ColumnForm from './'

// @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<ColumnForm />', () => {
  // @ts-expect-error TS(7034) FIXME: Variable 'subject' implicitly has type 'any' in so... Remove this comment to see the full error message
  let subject, onConfirm, onCancel

  function mount() {
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'jest'.
    onConfirm = jest.fn()
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'jest'.
    onCancel = jest.fn()

    // @ts-expect-error TS(2749) FIXME: 'ColumnForm' refers to a value, but is being used ... Remove this comment to see the full error message
    subject = render(<ColumnForm onConfirm={onConfirm} onCancel={onCancel} />)
  }

  // @ts-expect-error TS(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(mount)
  // @ts-expect-error TS(2304) FIXME: Cannot find name 'afterEach'.
  afterEach(() => {
    subject = onConfirm = onCancel = undefined
  })

  // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('renders an input asking for a column title', () => {
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
    expect(subject.container.querySelector('input')).toBeInTheDocument()
  })

  // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('focus on the input', () => {
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
    expect(subject.container.querySelector('input')).toHaveFocus()
  })

  // @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the user clicks confirm the input', () => {
    // @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the user has typed a column title', () => {
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(7005) FIXME: Variable 'subject' implicitly has an 'any' type.
        fireEvent.change(subject.container.querySelector('input'), { target: { value: 'Column Title' } })
        // @ts-expect-error TS(7005) FIXME: Variable 'subject' implicitly has an 'any' type.
        fireEvent.click(subject.queryByText('Add'))
      })

      // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('calls the onConfirm prop passing the column title', () => {
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
        expect(onConfirm).toHaveBeenCalledTimes(1)
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
        expect(onConfirm).toHaveBeenCalledWith('Column Title')
      })

      // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not call the onCancel prop', () => {
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
        expect(onCancel).not.toHaveBeenCalled()
      })
    })

    // @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the user has not typed a column title', () => {
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(7005) FIXME: Variable 'subject' implicitly has an 'any' type.
        fireEvent.click(subject.queryByText('Add'))
      })

      // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not call the onConfirm prop', () => {
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
        expect(onConfirm).not.toHaveBeenCalled()
      })

      // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not call the onCancel prop', () => {
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
        expect(onCancel).not.toHaveBeenCalled()
      })
    })
  })

  // @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the user cancels the input', () => {
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      // @ts-expect-error TS(7005) FIXME: Variable 'subject' implicitly has an 'any' type.
      fireEvent.click(subject.queryByText('Cancel'))
    })

    // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('calls the onCancel prop', () => {
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
      expect(onCancel).toHaveBeenCalledTimes(1)
    })

    // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('does not call the onConfirm prop', () => {
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
      expect(onConfirm).not.toHaveBeenCalled()
    })
  })
})
