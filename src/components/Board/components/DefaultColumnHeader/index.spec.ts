import { render, fireEvent } from '@testing-library/react'
import DefaultColumnHeader from './'

describe('<DefaultColumnHeader />', () => {
  let subject

  const onColumnRemove = jest.fn()
  const onColumnRename = jest.fn()

  const column = { id: 1, title: 'Column title' }

  function reset() {
    subject = undefined
    onColumnRemove.mockClear()
    onColumnRename.mockClear()
  }

  function mount(props) {
    subject = render(
      <DefaultColumnHeader onColumnRemove={onColumnRemove} onColumnRename={onColumnRename} {...props}>
        {column}
      </DefaultColumnHeader>
    )
    return subject
  }

  beforeEach(reset)

  it('renders a column header with the title', () => {
    expect(mount().queryByText('Column title')).toBeInTheDocument()
  })

  describe('about the remove column button', () => {
    describe('when the component does not receive the allowRemoveColumn prop', () => {
      beforeEach(() => mount({ onColumnRemove }))

      it('does not show the remove button', () => {
        expect(subject.queryByText('×')).not.toBeInTheDocument()
      })

      it('does not call the "onColumnRemove" callback', () => {
        expect(onColumnRemove).not.toHaveBeenCalled()
      })
    })

    describe('when the component receives the "allowRemoveColumn" prop', () => {
      beforeEach(() => mount({ allowRemoveColumn: true }))

      it('shows the remove button', () => {
        expect(subject.queryByText('×')).toBeInTheDocument()
      })

      it('does not call the "onColumnRemove" callback', () => {
        expect(onColumnRemove).not.toHaveBeenCalled()
      })

      describe('when the user clicks on the remove button', () => {
        beforeEach(() => fireEvent.click(subject.queryByText('×')))

        it('calls the "onColumnRemove" callback passing the column', () => {
          expect(onColumnRemove).toHaveBeenCalledTimes(1)
          expect(onColumnRemove).toHaveBeenCalledWith(column)
        })
      })
    })
  })

  describe('about the column title renaming', () => {
    describe('when the component does not receive the "allowRenameColumn" prop', () => {
      beforeEach(() => mount({ onColumnRename }))

      describe('when the user moves the mouse over the title', () => {
        it('does not show a mouse pointer', () => {
          expect(subject.queryByText('Column title')).not.toHaveStyle({ cursor: 'pointer' })
        })
      })

      describe('when the user clicks on the column title', () => {
        beforeEach(() => fireEvent.click(subject.queryByText('Column title')))

        it('does not allow the user to rename the column', () => {
          expect(subject.queryByText('Column title')).toBeInTheDocument()
          expect(subject.container.querySelector('input')).not.toBeInTheDocument()
        })

        it('does not call the "onColumnRename" callback', () => {
          expect(onColumnRename).not.toHaveBeenCalled()
        })
      })
    })

    describe('when the component receives the "allowRenameColumn" prop', () => {
      beforeEach(() => mount({ allowRenameColumn: true, onColumnRename }))

      describe('when the user moves the mouse over the title', () => {
        it('shows a mouse pointer', () => {
          expect(subject.queryByText('Column title')).toHaveStyle({ cursor: 'pointer' })
        })
      })

      describe('when the user clicks on the column title', () => {
        beforeEach(() => fireEvent.click(subject.queryByText('Column title')))

        it('does not call the "onColumnRename" callback', () => {
          expect(onColumnRename).not.toHaveBeenCalled()
        })

        it('toggles the title for an input for typing a new title', () => {
          expect(subject.queryByText('Column title')).not.toBeInTheDocument()
          expect(subject.container.querySelector('input')).toBeInTheDocument()
          expect(subject.queryByText('Rename', { selector: 'button' })).toBeInTheDocument()
          expect(subject.queryByText('Cancel', { selector: 'button' })).toBeInTheDocument()
        })

        it('focuses on the input', () => {
          expect(subject.container.querySelector('input')).toHaveFocus()
        })

        it('fills the input with the column title', () => {
          expect(subject.container.querySelector('input')).toHaveValue('Column title')
        })

        describe('when the user types a new name and confirms it', () => {
          beforeEach(() => {
            fireEvent.change(subject.container.querySelector('input'), { target: { value: 'New title' } })
            fireEvent.click(subject.queryByText('Rename', { selector: 'button' }))
          })

          it('toggles the input for the column title', () => {
            expect(subject.queryByText('Column title')).toBeInTheDocument()
            expect(subject.container.querySelector('input')).not.toBeInTheDocument()
          })

          it('calls the "onColumnRename" callback passing the column with the new title', () => {
            expect(onColumnRename).toHaveBeenCalledTimes(1)
            expect(onColumnRename).toHaveBeenCalledWith(column, 'New title')
          })
        })

        describe('when the user cancels the renaming', () => {
          beforeEach(() => {
            fireEvent.click(subject.queryByText('Cancel', { selector: 'button' }))
          })

          it('toggles the input for the column title', () => {
            expect(subject.queryByText('Column title')).toBeInTheDocument()
            expect(subject.container.querySelector('input')).not.toBeInTheDocument()
          })

          it('does call the "onColumnRename" callback', () => {
            expect(onColumnRename).not.toHaveBeenCalled()
          })
        })
      })
    })
  })
})
