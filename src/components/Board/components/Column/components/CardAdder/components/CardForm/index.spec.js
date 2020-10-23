import { render, fireEvent } from '@testing-library/react'
import CardForm from './'

describe('<CardForm />', () => {
  let subject, onConfirm, onCancel

  function mount() {
    onConfirm = jest.fn()
    onCancel = jest.fn()

    subject = render(<CardForm onConfirm={onConfirm} onCancel={onCancel} />)
  }

  beforeEach(mount)
  afterEach(() => {
    subject = onConfirm = onCancel = undefined
  })

  it('renders the card inputs', () => {
    expect(subject.container.querySelector('input[name="title"]')).toBeInTheDocument()
    expect(subject.container.querySelector('input[name="description"]')).toBeInTheDocument()
  })

  it('focuses on the title input', () => {
    expect(subject.container.querySelector('input[name="title"]')).toHaveFocus()
  })

  describe('when the user clicks confirm the input', () => {
    describe('when the user has informed a valid card', () => {
      beforeEach(() => {
        fireEvent.change(subject.container.querySelector('input[name="title"]'), { target: { value: 'Card title' } })
        fireEvent.change(subject.container.querySelector('input[name="description"]'), {
          target: { value: 'Description' },
        })
        fireEvent.click(subject.queryByText('Add'))
      })

      it('calls the onConfirm prop passing the values', () => {
        expect(onConfirm).toHaveBeenCalledTimes(1)
        expect(onConfirm).toHaveBeenCalledWith({ title: 'Card title', description: 'Description' })
      })

      it('does not call the onCancel prop', () => {
        expect(onCancel).not.toHaveBeenCalled()
      })
    })

    describe('when the user has not typed a card title', () => {
      beforeEach(() => {
        fireEvent.change(subject.container.querySelector('input[name="title"]'), { target: { value: '' } })
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
