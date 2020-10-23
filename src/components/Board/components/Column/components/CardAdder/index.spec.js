import { render, fireEvent } from '@testing-library/react'
import CardAdder from './'

describe('<CardAdder />', () => {
  let subject, onConfirm
  const column = { id: 1 }
  function mount() {
    onConfirm = jest.fn()

    subject = render(<CardAdder column={column} onConfirm={onConfirm} />)
  }

  beforeEach(mount)
  afterEach(() => {
    subject = onConfirm = undefined
  })

  it('renders the button to add a new card', () => {
    expect(subject.queryByText('+')).toBeInTheDocument()
  })

  describe('when the user clicks to add a new card', () => {
    beforeEach(() => fireEvent.click(subject.queryByText('+')))

    it('hides the card placeholder', () => {
      expect(subject.queryByText('+')).not.toBeInTheDocument()
    })

    it('renders the card inputs', () => {
      expect(subject.container.querySelector('input[name="title"]')).toBeInTheDocument()
      expect(subject.container.querySelector('input[name="description"]')).toBeInTheDocument()
    })

    describe('when the user confirms the new card', () => {
      beforeEach(() => {
        fireEvent.change(subject.container.querySelector('input[name="title"]'), {
          target: { value: 'Card Added by user' },
        })
        fireEvent.change(subject.container.querySelector('input[name="description"]'), {
          target: { value: 'Description' },
        })
        fireEvent.click(subject.queryByText('Add'))
      })

      it('calls the "onConfirm" prop passing the new card and the column', () => {
        expect(onConfirm).toHaveBeenCalledTimes(1)
        expect(onConfirm).toHaveBeenCalledWith(column, { title: 'Card Added by user', description: 'Description' })
      })

      it('hides the input', () => {
        expect(subject.container.querySelector('input')).not.toBeInTheDocument()
      })

      it('renders the placeholder to add a new card', () => {
        expect(subject.queryByText('+')).toBeInTheDocument()
      })
    })

    describe('when the user cancels the new card', () => {
      beforeEach(() => {
        fireEvent.click(subject.queryByText('Cancel'))
      })

      it('does not call the "onConfirm" prop', () => {
        expect(onConfirm).not.toHaveBeenCalled()
      })

      it('hides the input', () => {
        expect(subject.container.querySelector('input')).not.toBeInTheDocument()
      })

      it('renders the placeholder to add a new card', () => {
        expect(subject.queryByText('+')).toBeInTheDocument()
      })
    })
  })
})
