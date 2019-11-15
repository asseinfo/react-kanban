import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import LaneAdder from './'

describe('<LaneAdder />', () => {
  let subject, onConfirm

  function mount() {
    onConfirm = jest.fn()

    subject = render(<LaneAdder onConfirm={onConfirm} />)
  }

  beforeEach(mount)
  afterEach(() => {
    subject = onConfirm = undefined
  })

  it('renders the lane placeholder to add a new lane', () => {
    expect(subject.queryByText('➕')).toBeInTheDocument()
  })

  describe('when the user clicks to add a new lane', () => {
    beforeEach(() => fireEvent.click(subject.queryByText('➕')))

    it('hides the lane placeholder', () => {
      expect(subject.queryByText('➕')).not.toBeInTheDocument()
    })

    it('renders the input asking for a lane name', () => {
      expect(subject.container.querySelector('input')).toBeInTheDocument()
    })

    describe('when the user confirms the new lane', () => {
      beforeEach(() => {
        fireEvent.change(subject.container.querySelector('input'), { target: { value: 'Lane Added by user' } })
        fireEvent.click(subject.queryByText('Add'))
      })

      it('calls the "onConfirm" prop passing the lane title', () => {
        expect(onConfirm).toHaveBeenCalledTimes(1)
        expect(onConfirm).toHaveBeenCalledWith('Lane Added by user')
      })

      it('hides the input', () => {
        expect(subject.container.querySelector('input')).not.toBeInTheDocument()
      })

      it('renders the lane placeholder to add a new lane', () => {
        expect(subject.queryByText('➕')).toBeInTheDocument()
      })
    })

    describe('when the user cancels the new lane', () => {
      beforeEach(() => {
        fireEvent.click(subject.queryByText('Cancel'))
      })

      it('does not call the "onConfirm" prop', () => {
        expect(onConfirm).not.toHaveBeenCalled()
      })

      it('hides the input', () => {
        expect(subject.container.querySelector('input')).not.toBeInTheDocument()
      })

      it('renders the lane placeholder to add a new lane', () => {
        expect(subject.queryByText('➕')).toBeInTheDocument()
      })
    })
  })
})
