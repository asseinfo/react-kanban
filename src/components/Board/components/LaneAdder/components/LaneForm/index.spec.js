import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import LaneForm from './'

describe('<LaneForm />', () => {
  let subject, onConfirm, onCancel

  function mount() {
    onConfirm = jest.fn()
    onCancel = jest.fn()

    subject = render(<LaneForm onConfirm={onConfirm} onCancel={onCancel} />)
  }

  beforeEach(mount)
  afterEach(() => {
    subject = onConfirm = onCancel = undefined
  })

  it('renders an input asking for a lane title', () => {
    expect(subject.container.querySelector('input')).toBeInTheDocument()
  })

  it('focus on the input', () => {
    expect(subject.container.querySelector('input')).toHaveFocus()
  })

  describe('when the user clicks confirm the input', () => {
    describe('when the user has typed a lane title', () => {
      beforeEach(() => {
        fireEvent.change(subject.container.querySelector('input'), { target: { value: 'Lane Title' } })
        fireEvent.click(subject.queryByText('Add'))
      })

      it('calls the onConfirm prop passing the lane title', () => {
        expect(onConfirm).toHaveBeenCalledTimes(1)
        expect(onConfirm).toHaveBeenCalledWith('Lane Title')
      })

      it('does not call the onCancel prop', () => {
        expect(onCancel).not.toHaveBeenCalled()
      })
    })

    describe('when the user has not typed a lane title', () => {
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
