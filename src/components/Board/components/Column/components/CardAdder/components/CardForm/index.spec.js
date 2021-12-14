import { render, fireEvent } from '@testing-library/react'
import CardForm from './'

describe('<CardForm />', () => {
  let subject, onConfirm, onCancel

  function mount(props) {
    onConfirm = jest.fn()
    onCancel = jest.fn()

    subject = render(<CardForm onConfirm={onConfirm} onCancel={onCancel} {...props} />)
    return subject
  }

  beforeEach(() => {
    subject = mount()
  })
  afterEach(() => {
    subject = onConfirm = onCancel = undefined
  })

  it('renders the card inputs', () => {
    expect(subject.container.querySelector('input[name="title"]')).toBeInTheDocument()
    expect(subject.container.querySelector('input[name="description"]')).toBeInTheDocument()
  })

  it('renders only the card description input when disableCardTitle is true', () => {
    const subject = mount({ disableCardTitle: true })
    expect(subject.container.querySelector('input[name="title"]')).not.toBeInTheDocument()
    expect(subject.container.querySelector('input[name="description"]')).toBeInTheDocument()
  })

  it('renders edit card form with title and description to edit', () => {
    const subject = mount({ isEdit: true, initialValue: { title: 'Card title', description: 'Card description' } })
    expect(subject.container.querySelector('button')).toHaveTextContent('Edit')
    expect(subject.container.querySelector('input[name="title"]')).toHaveDisplayValue('Card title')
    expect(subject.container.querySelector('input[name="description"]')).toHaveDisplayValue('Card description')
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

    describe('when the user edit card', () => {
      it('the card should be edited to new one with called onConfirm with new values', () => {
        const subject = mount({ isEdit: true, initialValue: { title: 'Card title', description: 'Card description' } })
        console.log(subject.container.querySelector('input[name="description"]'))
        fireEvent.change(subject.container.querySelector('input[name="title"]'), {
          target: { value: 'Card title 2' },
        })
        fireEvent.change(subject.container.querySelector('input[name="description"]'), {
          target: { value: 'Card description 2' },
        })
        fireEvent.click(subject.queryByText('Edit'))
        expect(onConfirm).toHaveBeenCalledTimes(1)
        expect(onConfirm).toHaveBeenCalledWith({ title: 'Card title 2', description: 'Card description 2' })
      })
      it('the card shouldnt be edited with without calling onConfirm', () => {
        const subject = mount({ isEdit: true, initialValue: { title: 'Card title', description: 'Card description' } })
        console.log(subject.container.querySelector('input[name="description"]'))
        fireEvent.change(subject.container.querySelector('input[name="title"]'), {
          target: { value: '' },
        })
        fireEvent.change(subject.container.querySelector('input[name="description"]'), {
          target: { value: 'Card description 2' },
        })
        fireEvent.click(subject.queryByText('Edit'))
        expect(onConfirm).not.toHaveBeenCalled()
      })
      it('the card should be edited with disableCardTitle prop', () => {
        const subject = mount({
          disableCardTitle: true,
          isEdit: true,
          initialValue: { description: 'Card description' },
        })
        fireEvent.change(subject.container.querySelector('input[name="description"]'), {
          target: { value: 'Card description 2' },
        })
        fireEvent.click(subject.queryByText('Edit'))
        expect(onConfirm).toHaveBeenCalledTimes(1)
        expect(onConfirm).toHaveBeenCalledWith({ description: 'Card description 2' })
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
