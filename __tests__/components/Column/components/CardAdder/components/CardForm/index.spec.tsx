import { render, fireEvent } from '@testing-library/react'
import CardForm from '@/components/Board/components/Column/components/CardAdder/components/CardForm'

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<CardForm />', () => {
  let subject: any, onConfirm: any, onCancel: any

  function mount() {
    // @ts-expect-error TS(2304): Cannot find name 'jest'.
    onConfirm = jest.fn()
    // @ts-expect-error TS(2304): Cannot find name 'jest'.
    onCancel = jest.fn()

    subject = render(<CardForm onConfirm={onConfirm} onCancel={onCancel} />)
  }

  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(mount)
  // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
  afterEach(() => {
    subject = onConfirm = onCancel = undefined
  })

  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('renders the card inputs', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subject.container.querySelector('input[name="title"]')).toBeInTheDocument()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subject.container.querySelector('input[name="description"]')).toBeInTheDocument()
  })

  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('focuses on the title input', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subject.container.querySelector('input[name="title"]')).toHaveFocus()
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the user clicks confirm the input', () => {
    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the user has informed a valid card', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        fireEvent.change(subject.container.querySelector('input[name="title"]'), { target: { value: 'Card title' } })
        fireEvent.change(subject.container.querySelector('input[name="description"]'), {
          target: { value: 'Description' },
        })
        fireEvent.click(subject.queryByText('Add'))
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('calls the onConfirm prop passing the values', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onConfirm).toHaveBeenCalledTimes(1)
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onConfirm).toHaveBeenCalledWith({ title: 'Card title', description: 'Description' })
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not call the onCancel prop', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onCancel).not.toHaveBeenCalled()
      })
    })

    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the user has not typed a card title', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        fireEvent.change(subject.container.querySelector('input[name="title"]'), { target: { value: '' } })
        fireEvent.click(subject.queryByText('Add'))
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not call the onConfirm prop', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onConfirm).not.toHaveBeenCalled()
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not call the onCancel prop', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onCancel).not.toHaveBeenCalled()
      })
    })
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the user cancels the input', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      fireEvent.click(subject.queryByText('Cancel'))
    })

    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('calls the onCancel prop', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(onCancel).toHaveBeenCalledTimes(1)
    })

    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('does not call the onConfirm prop', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(onConfirm).not.toHaveBeenCalled()
    })
  })
})
