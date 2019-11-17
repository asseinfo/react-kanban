import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DefaultLaneHeader from './'

describe('<DefaultLaneHeader />', () => {
  let subject

  const onLaneRemove = jest.fn()
  const onLaneRename = jest.fn()

  const lane = { id: 1, title: 'Lane title' }

  function reset() {
    subject = undefined
    onLaneRemove.mockClear()
    onLaneRename.mockClear()
  }

  function mount(props) {
    subject = render(
      <DefaultLaneHeader onLaneRemove={onLaneRemove} onLaneRename={onLaneRename} {...props}>
        {lane}
      </DefaultLaneHeader>
    )
    return subject
  }

  beforeEach(reset)

  it('renders a lane header with the title', () => {
    expect(mount().queryByText('Lane title')).toBeInTheDocument()
  })

  describe('about the remove lane button', () => {
    describe('when the component does not receive the allowRemoveLane prop', () => {
      beforeEach(() => mount({ onLaneRemove }))

      it('does not show the remove button', () => {
        expect(subject.queryByText('×')).not.toBeInTheDocument()
      })

      it('does not call the "onLaneRemove" callback', () => {
        expect(onLaneRemove).not.toHaveBeenCalled()
      })
    })

    describe('when the component receives the "allowRemoveLane" prop', () => {
      beforeEach(() => mount({ allowRemoveLane: true }))

      it('shows the remove button', () => {
        expect(subject.queryByText('×')).toBeInTheDocument()
      })

      it('does not call the "onLaneRemove" callback', () => {
        expect(onLaneRemove).not.toHaveBeenCalled()
      })

      describe('when the user clicks on the remove button', () => {
        beforeEach(() => fireEvent.click(subject.queryByText('×')))

        it('calls the "onLaneRemove" callback passing the lane', () => {
          expect(onLaneRemove).toHaveBeenCalledTimes(1)
          expect(onLaneRemove).toHaveBeenCalledWith(lane)
        })
      })
    })
  })

  describe('about the lane title renaming', () => {
    describe('when the component does not receive the "allowRenameLane" prop', () => {
      beforeEach(() => mount({ onLaneRename }))

      describe('when the user moves the mouse over the title', () => {
        it('does not show a mouse pointer', () => {
          expect(subject.queryByText('Lane title')).not.toHaveStyle('cursor: pointer')
        })
      })

      describe('when the user clicks on the lane title', () => {
        beforeEach(() => fireEvent.click(subject.queryByText('Lane title')))

        it('does not allow the user to rename the lane', () => {
          expect(subject.queryByText('Lane title')).toBeInTheDocument()
          expect(subject.container.querySelector('input')).not.toBeInTheDocument()
        })

        it('does not call the "onLaneRename" callback', () => {
          expect(onLaneRename).not.toHaveBeenCalled()
        })
      })
    })

    describe('when the component receives the "allowRenameLane" prop', () => {
      beforeEach(() => mount({ allowRenameLane: true, onLaneRename }))

      describe('when the user moves the mouse over the title', () => {
        it('shows a mouse pointer', () => {
          expect(subject.queryByText('Lane title')).toHaveStyle('cursor: pointer')
        })
      })

      describe('when the user clicks on the lane title', () => {
        beforeEach(() => fireEvent.click(subject.queryByText('Lane title')))

        it('does not call the "onLaneRename" callback', () => {
          expect(onLaneRename).not.toHaveBeenCalled()
        })

        it('toggles the title for an input for typing a new title', () => {
          expect(subject.queryByText('Lane title')).not.toBeInTheDocument()
          expect(subject.container.querySelector('input')).toBeInTheDocument()
          expect(subject.queryByText('Rename', { selector: 'button' })).toBeInTheDocument()
          expect(subject.queryByText('Cancel', { selector: 'button' })).toBeInTheDocument()
        })

        it('focuses on the input', () => {
          expect(subject.container.querySelector('input')).toHaveFocus()
        })

        it('fills the input with the lane title', () => {
          expect(subject.container.querySelector('input')).toHaveValue('Lane title')
        })

        describe('when the user types a new name and confirms it', () => {
          beforeEach(() => {
            fireEvent.change(subject.container.querySelector('input'), { target: { value: 'New title' } })
            fireEvent.click(subject.queryByText('Rename', { selector: 'button' }))
          })

          it('toggles the input for the new lane title', () => {
            expect(subject.queryByText('New title')).toBeInTheDocument()
            expect(subject.container.querySelector('input')).not.toBeInTheDocument()
          })

          it('calls the "onLaneRename" callback passing the lane with the new title', () => {
            expect(onLaneRename).toHaveBeenCalledTimes(1)
            expect(onLaneRename).toHaveBeenCalledWith(lane, 'New title')
          })
        })

        describe('when the user cancels the renaming', () => {
          beforeEach(() => {
            fireEvent.click(subject.queryByText('Cancel', { selector: 'button' }))
          })

          it('cancels the renaming', () => {
            expect(subject.queryByText('Lane title')).toBeInTheDocument()
            expect(subject.container.querySelector('input')).not.toBeInTheDocument()
          })

          it('does call the "onLaneRename" callback', () => {
            expect(onLaneRename).not.toHaveBeenCalled()
          })
        })
      })
    })
  })
})
