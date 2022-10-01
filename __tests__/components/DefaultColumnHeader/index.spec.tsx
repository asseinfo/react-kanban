import { render, fireEvent } from '@testing-library/react'
import DefaultColumnHeader from '@/components/Board/components/DefaultColumnHeader'

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<DefaultColumnHeader />', () => {
  let subject: any

  // @ts-expect-error TS(2304): Cannot find name 'jest'.
  const onColumnRemove = jest.fn()
  // @ts-expect-error TS(2304): Cannot find name 'jest'.
  const onColumnRename = jest.fn()

  const column = { id: 1, title: 'Column title' }

  function reset() {
    subject = undefined
    onColumnRemove.mockClear()
    onColumnRename.mockClear()
  }

  function mount(props: any) {
    subject = render(
      <DefaultColumnHeader onColumnRemove={onColumnRemove} onColumnRename={onColumnRename} {...props}>
        {column}
      </DefaultColumnHeader>
    )
    return subject
  }

  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(reset)

  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('renders a column header with the title', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mount().queryByText('Column title')).toBeInTheDocument()
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('about the remove column button', () => {
    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the component does not receive the allowRemoveColumn prop', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => mount({ onColumnRemove }))

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not show the remove button', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(subject.queryByText('×')).not.toBeInTheDocument()
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not call the "onColumnRemove" callback', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onColumnRemove).not.toHaveBeenCalled()
      })
    })

    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the component receives the "allowRemoveColumn" prop', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => mount({ allowRemoveColumn: true }))

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('shows the remove button', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(subject.queryByText('×')).toBeInTheDocument()
      })

      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not call the "onColumnRemove" callback', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onColumnRemove).not.toHaveBeenCalled()
      })

      // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when the user clicks on the remove button', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => fireEvent.click(subject.queryByText('×')))

        // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('calls the "onColumnRemove" callback passing the column', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(onColumnRemove).toHaveBeenCalledTimes(1)
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(onColumnRemove).toHaveBeenCalledWith(column)
        })
      })
    })
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('about the column title renaming', () => {
    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the component does not receive the "allowRenameColumn" prop', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => mount({ onColumnRename }))

      // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when the user moves the mouse over the title', () => {
        // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('does not show a mouse pointer', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(subject.queryByText('Column title')).not.toHaveStyle({ cursor: 'pointer' })
        })
      })

      // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when the user clicks on the column title', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => fireEvent.click(subject.queryByText('Column title')))

        // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('does not allow the user to rename the column', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(subject.queryByText('Column title')).toBeInTheDocument()
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(subject.container.querySelector('input')).not.toBeInTheDocument()
        })

        // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('does not call the "onColumnRename" callback', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(onColumnRename).not.toHaveBeenCalled()
        })
      })
    })

    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the component receives the "allowRenameColumn" prop', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => mount({ allowRenameColumn: true, onColumnRename }))

      // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when the user moves the mouse over the title', () => {
        // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('shows a mouse pointer', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(subject.queryByText('Column title')).toHaveStyle({ cursor: 'pointer' })
        })
      })

      // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when the user clicks on the column title', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => fireEvent.click(subject.queryByText('Column title')))

        // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('does not call the "onColumnRename" callback', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(onColumnRename).not.toHaveBeenCalled()
        })

        // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('toggles the title for an input for typing a new title', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(subject.queryByText('Column title')).not.toBeInTheDocument()
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(subject.container.querySelector('input')).toBeInTheDocument()
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(subject.queryByText('Rename', { selector: 'button' })).toBeInTheDocument()
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(subject.queryByText('Cancel', { selector: 'button' })).toBeInTheDocument()
        })

        // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('focuses on the input', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(subject.container.querySelector('input')).toHaveFocus()
        })

        // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('fills the input with the column title', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(subject.container.querySelector('input')).toHaveValue('Column title')
        })

        // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
        describe('when the user types a new name and confirms it', () => {
          // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
          beforeEach(() => {
            fireEvent.change(subject.container.querySelector('input'), { target: { value: 'New title' } })
            fireEvent.click(subject.queryByText('Rename', { selector: 'button' }))
          })

          // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('toggles the input for the column title', () => {
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(subject.queryByText('Column title')).toBeInTheDocument()
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(subject.container.querySelector('input')).not.toBeInTheDocument()
          })

          // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('calls the "onColumnRename" callback passing the column with the new title', () => {
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(onColumnRename).toHaveBeenCalledTimes(1)
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(onColumnRename).toHaveBeenCalledWith(column, 'New title')
          })
        })

        // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
        describe('when the user cancels the renaming', () => {
          // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
          beforeEach(() => {
            fireEvent.click(subject.queryByText('Cancel', { selector: 'button' }))
          })

          // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('toggles the input for the column title', () => {
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(subject.queryByText('Column title')).toBeInTheDocument()
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(subject.container.querySelector('input')).not.toBeInTheDocument()
          })

          // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('does call the "onColumnRename" callback', () => {
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(onColumnRename).not.toHaveBeenCalled()
          })
        })
      })
    })
  })
})
