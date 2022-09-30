import { render, fireEvent } from '@testing-library/react'
import ColumnForm from './'

describe('<ColumnForm />', () => {
  let subject, onConfirm, onCancel

  function mount() {
    onConfirm = jest.fn()
    onCancel = jest.fn()

    subject = render(<ColumnForm onConfirm={onConfirm} onCancel={onCancel} />)
  }

  beforeEach(mount)
  afterEach(() => {
    subject = onConfirm = onCancel = undefined
  })

  it('renders an input asking for a column title', () => {
    expect(subject.container.querySelector('input')).toBeInTheDocument()
  })

  it('focus on the input', () => {
    expect(subject.container.querySelector('input')).toHaveFocus()
  })

  describe('when the user clicks confirm the input', () => {
    describe('when the user has typed a column title', () => {
      beforeEach(() => {
        fireEvent.change(subject.container.querySelector('input'), { target: { value: 'Column Title' } })
        fireEvent.click(subject.queryByText('Add'))
      })

      it('calls the onConfirm prop passing the column title', () => {
        expect(onConfirm).toHaveBeenCalledTimes(1)
        expect(onConfirm).toHaveBeenCalledWith('Column Title')
      })

      it('does not call the onCancel prop', () => {
        expect(onCancel).not.toHaveBeenCalled()
      })
    })

    describe('when the user has not typed a column title', () => {
      beforeEach(() => {
        fireEvent.click(subject.queryByText('Add'))
      })

      it('does not call the onConfirm prop', () => {
        expect(onConfirm).not.toHaveBeenCalled()
      })

      it('does not call the onCancel prop', () => {
        expect(onCancel).not.toHaveBeenCalled()
      })
    })
  })

  describe('when the user cancels the input', () => {
    beforeEach(() => {
      fireEvent.click(subject.queryByText('Cancel'))
    })

    it('calls the onCancel prop', () => {
      expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('does not call the onConfirm prop', () => {
      expect(onConfirm).not.toHaveBeenCalled()
    })
  })
})
