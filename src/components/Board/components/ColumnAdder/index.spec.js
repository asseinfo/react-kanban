import { render, fireEvent } from '@testing-library/react'
import ColumnAdder from './'

describe('<ColumnAdder />', () => {
  let subject, onConfirm

  function mount() {
    onConfirm = jest.fn()

    subject = render(<ColumnAdder onConfirm={onConfirm} />)
  }

  beforeEach(mount)
  afterEach(() => {
    subject = onConfirm = undefined
  })

  it('renders the column placeholder to add a new column', () => {
    expect(subject.queryByText('➕')).toBeInTheDocument()
  })

  describe('when the user clicks to add a new column', () => {
    beforeEach(() => fireEvent.click(subject.queryByText('➕')))

    it('hides the column placeholder', () => {
      expect(subject.queryByText('➕')).not.toBeInTheDocument()
    })

    it('renders the input asking for a column name', () => {
      expect(subject.container.querySelector('input')).toBeInTheDocument()
    })

    describe('when the user confirms the new column', () => {
      beforeEach(() => {
        fireEvent.change(subject.container.querySelector('input'), { target: { value: 'Column Added by user' } })
        fireEvent.click(subject.queryByText('Add'))
      })

      it('calls the "onConfirm" prop passing the column title', () => {
        expect(onConfirm).toHaveBeenCalledTimes(1)
        expect(onConfirm).toHaveBeenCalledWith('Column Added by user')
      })

      it('hides the input', () => {
        expect(subject.container.querySelector('input')).not.toBeInTheDocument()
      })

      it('renders the column placeholder to add a new column', () => {
        expect(subject.queryByText('➕')).toBeInTheDocument()
      })
    })

    describe('when the user cancels the new column', () => {
      beforeEach(() => {
        fireEvent.click(subject.queryByText('Cancel'))
      })

      it('does not call the "onConfirm" prop', () => {
        expect(onConfirm).not.toHaveBeenCalled()
      })

      it('hides the input', () => {
        expect(subject.container.querySelector('input')).not.toBeInTheDocument()
      })

      it('renders the column placeholder to add a new column', () => {
        expect(subject.queryByText('➕')).toBeInTheDocument()
      })
    })
  })
})
