// import { useState } from 'react'
// import { render, within, act, fireEvent, screen } from '@testing-library/react'
// // @ts-expect-error TS(2305): Module '"react-beautiful-dnd"' has no exported mem... Remove this comment to see the full error message
// import { callbacks } from 'react-beautiful-dnd'
// import { moveCard } from '@services/helpers'

// // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
// describe('<Board />', () => {
//   let subject: any,
//     onCardDragEnd: any,
//     onColumnDragEnd: any,
//     onColumnRemove: any,
//     onColumnRename: any,
//     onCardRemove: any
//   const board = {
//     columns: [
//       {
//         id: 1,
//         title: 'Column Backlog',
//         cards: [
//           {
//             id: 1,
//             title: 'Card title 1',
//             description: 'Card content',
//           },
//           {
//             id: 2,
//             title: 'Card title 2',
//             description: 'Card content',
//           },
//         ],
//       },
//       {
//         id: 2,
//         title: 'Column Doing',
//         cards: [
//           {
//             id: 3,
//             title: 'Card title 3',
//             description: 'Card content',
//           },
//         ],
//       },
//     ],
//   }

//   // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
//   afterEach(() => {
//     // @ts-expect-error TS(2304): Cannot find name 'jest'.
//     jest.clearAllMocks()
//     subject = onCardDragEnd = onColumnDragEnd = onColumnRemove = onCardRemove = undefined
//   })

//   // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//   describe('when the board is controlled', () => {
//     function ControlledBoard({ children, ...props }: any) {
//       const [board, setBoard] = useState(children)

//       function handleCardMoving() {
//         setBoard(moveCard(board, { fromPosition: 0, fromColumnId: 1 }, { toPosition: 1, toColumnId: 1 }))
//       }

//       return (
//         <>
//           <button onClick={handleCardMoving}>Move card</button>
//           <Board {...props}>{board}</Board>
//         </>
//       )
//     }

//     function mount({ children = board, ...props } = {}) {
//       subject = render(<ControlledBoard children={children} {...props} />)
//       return subject
//     }

//     // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//     it('renders a board according to the children prop', () => {
//       const { queryByText, queryByTestId } = mount()

//       const column = within(queryByTestId('column-1'))
//       const cards = column.queryAllByText(/^Card title/)

//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(cards).toHaveLength(2)
//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(cards[0]).toHaveTextContent(/^Card title 1$/)
//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(cards[1]).toHaveTextContent(/^Card title 2$/)

//       fireEvent.click(queryByText('Move card', { selector: 'button' }))

//       const movedCards = column.queryAllByText(/^Card title/)

//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(movedCards).toHaveLength(2)
//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(movedCards[0]).toHaveTextContent(/^Card title 2$/)
//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(movedCards[1]).toHaveTextContent(/^Card title 1$/)
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe('about the card moving', () => {
//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component receives "onCardDragEnd" callback', () => {
//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           onCardDragEnd = jest.fn()
//           // @ts-expect-error TS(2345): Argument of type '{ onCardDragEnd: any; }' is not ... Remove this comment to see the full error message
//           mount({ onCardDragEnd })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the user cancels the card moving', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             callbacks.onDragEnd({ source: null, destination: null })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call onCardDragEnd callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onCardDragEnd).not.toHaveBeenCalled()
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('whe the user moves a card to the same position', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             act(() => {
//               callbacks.onDragEnd({
//                 source: { droppableId: '1', index: 0 },
//                 destination: { droppableId: '1', index: 0 },
//               })
//             })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call onCardDragEnd callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onCardDragEnd).not.toHaveBeenCalled()
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the user moves a card to another position', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             act(() => {
//               callbacks.onDragEnd({
//                 source: { droppableId: '1', index: 0 },
//                 destination: { droppableId: '1', index: 1 },
//               })
//             })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('calls the onCardDragEnd callback passing the card and the move coordinates', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onCardDragEnd).toHaveBeenCalledTimes(1)
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onCardDragEnd).toHaveBeenCalledWith(
//               { id: 1, description: 'Card content', title: 'Card title 1' },
//               { fromPosition: 0, fromColumnId: 1 },
//               { toPosition: 1, toColumnId: 1 }
//             )
//           })
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe('about the column moving', () => {
//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component receives "onColumnDragEnd" callback', () => {
//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           onColumnDragEnd = jest.fn()
//           // @ts-expect-error TS(2345): Argument of type '{ onColumnDragEnd: any; }' is no... Remove this comment to see the full error message
//           mount({ onColumnDragEnd })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the user cancels the column moving', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             callbacks.onDragEnd({ source: null, destination: null, type: 'BOARD' })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call onColumnDragEnd callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnDragEnd).not.toHaveBeenCalled()
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the user moves a column to same position', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             act(() => {
//               callbacks.onDragEnd({ source: { index: 0 }, destination: { index: 0 }, type: 'BOARD' })
//             })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call onColumnDragEnd callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnDragEnd).not.toHaveBeenCalled()
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the user moves a column to another position', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             act(() => {
//               callbacks.onDragEnd({ source: { index: 0 }, destination: { index: 1 }, type: 'BOARD' })
//             })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('calls the onColumnDragEnd callback passing the column and the move coordinates', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnDragEnd).toHaveBeenCalledTimes(1)
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnDragEnd).toHaveBeenCalledWith(
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect.objectContaining({ title: 'Column Backlog' }),
//               { fromPosition: 0 },
//               { toPosition: 1 }
//             )
//           })
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe("about the board's custom card", () => {
//       let renderCard: any
//       const board = {
//         columns: [
//           {
//             id: 1,
//             title: 'Column Backlog',
//             cards: [
//               {
//                 id: 1,
//                 title: 'Card title',
//                 content: 'Card content',
//               },
//               {
//                 id: 2,
//                 title: 'Card title',
//                 content: 'Card content',
//               },
//             ],
//           },
//           {
//             id: 2,
//             title: 'Column Doing',
//             cards: [
//               {
//                 id: 3,
//                 title: 'Card title',
//                 content: 'Card content',
//               },
//             ],
//           },
//         ],
//       }

//       // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
//       afterEach(() => {
//         renderCard = undefined
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when it receives a "renderCard" prop', () => {
//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           renderCard = jest.fn((cardContent: any) => (
//             <div>
//               {cardContent.id} - {cardContent.title} - {cardContent.content}
//             </div>
//           ))

//           // @ts-expect-error TS(2322): Type '{ columns: { id: number; title: string; card... Remove this comment to see the full error message
//           mount({ children: board, renderCard })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it("renders the custom cards on the board's column", () => {
//           const cards = subject.queryAllByText(/\d+ - Card title - Card content$/)
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(cards).toHaveLength(3)
//         })

//         // FIXME It shouldn't be receiving the bag, just the dragging prop?! Maybe, just a typo in spec.
//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it('passes the card content and the card bag as a parameter to the renderCard prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(renderCard).toHaveBeenCalledWith(
//             { id: 1, title: 'Card title', content: 'Card content' },
//             { dragging: false }
//           )
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe("about the column's header", () => {
//       let renderColumnHeader: any
//       const board = {
//         columns: [
//           {
//             id: 1,
//             title: 'Column Backlog',
//             wip: 1,
//             cards: [{ id: 2, title: 'Card title', content: 'Card content' }],
//           },
//         ],
//       }

//       // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
//       afterEach(() => {
//         renderColumnHeader = undefined
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component receives a "renderColumnHeader" prop', () => {
//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           renderColumnHeader = jest.fn((columnContent: any) => (
//             <div>
//               {columnContent.title} ({columnContent.wip})
//             </div>
//           ))

//           // @ts-expect-error TS(2322): Type '{ columns: { id: number; title: string; wip:... Remove this comment to see the full error message
//           mount({ children: board, renderColumnHeader })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it("renders the custom header on the board's column", () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(subject.queryAllByTestId(/column/)).toHaveLength(1)
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(subject.queryByTestId('column-1')).toHaveTextContent(/Column Backlog \(1\)/)
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it('passes the column content to the "renderColumnHeader" prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(renderColumnHeader).toHaveBeenCalledTimes(1)
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(renderColumnHeader).toHaveBeenCalledWith({
//             id: 1,
//             title: 'Column Backlog',
//             wip: 1,
//             cards: [{ id: 2, title: 'Card title', content: 'Card content' }],
//           })
//         })
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component does not receive a "renderColumnHeader" prop', () => {
//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => mount({ children: board }))

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it("renders the default header on the board's column", () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(subject.queryAllByTestId(/column/)).toHaveLength(1)
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(subject.queryByTestId('column-1')).toHaveTextContent(/Column Backlog/)
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe('about the column adding', () => {
//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('about the default column adder', () => {
//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component does not receive "allowAddColumn" prop', () => {
//           let onNewColumnConfirm

//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             // @ts-expect-error TS(2304): Cannot find name 'jest'.
//             onNewColumnConfirm = jest.fn()
//             // @ts-expect-error TS(2345): Argument of type '{ allowAddColumn: boolean; onNew... Remove this comment to see the full error message
//             mount({ allowAddColumn: false, onNewColumnConfirm })
//           })
//           // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
//           afterEach(() => {
//             onNewColumnConfirm = undefined
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not render the column adder', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(subject.queryByText('➕')).not.toBeInTheDocument()
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component does not receive "onNewColumnConfirm" prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             // @ts-expect-error TS(2345): Argument of type '{ allowAddColumn: boolean; }' is... Remove this comment to see the full error message
//             mount({ allowAddColumn: true })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not render the column adder', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(subject.queryByText('➕')).not.toBeInTheDocument()
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when it receives the "allowAddColumn" and "onNewColumnConfirm" prop', () => {
//           let onNewColumnConfirm: any

//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             // @ts-expect-error TS(2304): Cannot find name 'jest'.
//             onNewColumnConfirm = jest.fn()
//             // @ts-expect-error TS(2345): Argument of type '{ allowAddColumn: boolean; onNew... Remove this comment to see the full error message
//             mount({ allowAddColumn: true, onNewColumnConfirm })
//           })
//           // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
//           afterEach(() => {
//             onNewColumnConfirm = undefined
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('renders the column placeholder as the last column to add a new column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(subject.queryByText('➕')).toBeInTheDocument()
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the user clicks to add a new column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => fireEvent.click(subject.queryByText('➕')))

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('hides the column placeholder', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(subject.queryByText('➕')).not.toBeInTheDocument()
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('renders the input asking for a column title', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(subject.container.querySelector('input')).toBeInTheDocument()
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//             describe('when the user confirms the new column', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//               beforeEach(() => {
//                 fireEvent.change(subject.container.querySelector('input'), {
//                   target: { value: 'Column Added by user' },
//                 })
//                 fireEvent.click(subject.queryByText('Add'))
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('calls the "onNewColumnConfirm" passing the new column', () => {
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onNewColumnConfirm).toHaveBeenCalledTimes(1)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onNewColumnConfirm).toHaveBeenCalledWith({ title: 'Column Added by user', cards: [] })
//               })
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//             describe('when the user cancels the new column adding', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//               beforeEach(() => {
//                 fireEvent.click(subject.queryByText('Cancel'))
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('does not call the "onNewColumnConfirm" passing the new column', () => {
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onNewColumnConfirm).not.toHaveBeenCalled()
//               })
//             })
//           })
//         })
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('about custom column adder', () => {
//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component receives a custom column adder', () => {
//           let renderColumnAdder

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the component does not receive "allowAddColumn" prop', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => {
//               // @ts-expect-error TS(2304): Cannot find name 'jest'.
//               renderColumnAdder = jest.fn(() => (
//                 <div>
//                   <input data-testid='columnAdder' />
//                 </div>
//               ))

//               // @ts-expect-error TS(2345): Argument of type '{ renderColumnAdder: any; }' is ... Remove this comment to see the full error message
//               mount({ renderColumnAdder })
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('does not render the custom render adder', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(subject.queryByTestId('columnAdder')).not.toBeInTheDocument()
//             })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the component receives the "allowAddColumn" prop', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => {
//               // @ts-expect-error TS(2304): Cannot find name 'jest'.
//               renderColumnAdder = jest.fn(() => (
//                 <div data-testid='columnAdder'>
//                   <button>Add column</button>
//                 </div>
//               ))

//               // @ts-expect-error TS(2345): Argument of type '{ children: { columns: { id: num... Remove this comment to see the full error message
//               mount({ children: board, renderColumnAdder, allowAddColumn: true })
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('renders the custom column adder as the last column to add a new column', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(subject.queryByTestId('columnAdder')).toBeInTheDocument()
//             })

//             // TODO it needs spec for the renderColumnAdder callback
//           })
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe('about the column removing', () => {
//       // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//       beforeEach(() => {
//         // @ts-expect-error TS(2304): Cannot find name 'jest'.
//         onColumnRemove = jest.fn()
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component uses the default header template', () => {
//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component receives the "allowRemoveColumn" prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => mount({ allowRemoveColumn: true, onColumnRemove }))

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call the "onColumnRemove callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnRemove).not.toHaveBeenCalled()
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the user clicks to remove a column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => {
//               const removeColumnButton = within(subject.queryByTestId('column-1')).queryByText('×')
//               // @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
//               fireEvent.click(removeColumnButton)
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('calls the "onColumnRemove" callback passing the column to be removed', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onColumnRemove).toHaveBeenCalledTimes(1)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onColumnRemove).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }))
//             })
//           })
//         })
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component receives a custom header column template', () => {
//         let renderColumnHeader

//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           renderColumnHeader = jest.fn(({ title }: any) => <div>{title}</div>)
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           onColumnRemove = jest.fn()
//           // @ts-expect-error TS(2345): Argument of type '{ renderColumnHeader: any; onCol... Remove this comment to see the full error message
//           mount({ renderColumnHeader, onColumnRemove })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it('does not call the "onColumnRemove" callback', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(onColumnRemove).not.toHaveBeenCalled()
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe('about the column renaming', () => {
//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component use the default header template', () => {
//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component receives the "allowRenameColumn" prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             // @ts-expect-error TS(2304): Cannot find name 'jest'.
//             onColumnRename = jest.fn()
//             // @ts-expect-error TS(2345): Argument of type '{ allowRenameColumn: boolean; on... Remove this comment to see the full error message
//             mount({ allowRenameColumn: true, onColumnRename })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call the "onColumnRename" callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnRename).not.toHaveBeenCalled()
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the user renames a column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => {
//               // @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
//               fireEvent.click(within(subject.queryByTestId('column-1')).queryByText('Column Backlog'))
//               fireEvent.change(subject.container.querySelector('input'), { target: { value: 'New title' } })
//               fireEvent.click(subject.queryByText('Rename', { selector: 'button' }))
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('does not rename the column', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(subject.queryByText('Column Backlog')).toBeInTheDocument()
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(subject.queryByText('New title')).not.toBeInTheDocument()
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('calls the "onColumnRename" callback passing the column to be renamed', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onColumnRename).toHaveBeenCalledTimes(1)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onColumnRename).toHaveBeenCalledWith(
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect.objectContaining({ id: 1, title: 'Column Backlog' }),
//                 'New title'
//               )
//             })
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component does not receive the "allowRenameColumn" prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             // @ts-expect-error TS(2304): Cannot find name 'jest'.
//             onColumnRename = jest.fn()
//             // @ts-expect-error TS(2345): Argument of type '{ onColumnRename: any; }' is not... Remove this comment to see the full error message
//             mount({ onColumnRename })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call the "onColumnRename" callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnRename).not.toHaveBeenCalled()
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not show the button on column header to remove the column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(subject.queryByTestId('column-1').querySelector('button')).not.toBeInTheDocument()
//           })
//         })
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component receives a custom header column template', () => {
//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           const renderColumnHeader = ({ title }: any) => <div>{title}</div>
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           onColumnRename = jest.fn()
//           // @ts-expect-error TS(2345): Argument of type '{ renderColumnHeader: ({ title }... Remove this comment to see the full error message
//           mount({ renderColumnHeader, onColumnRename })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it('does not call the "onColumnRename" callback', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(onColumnRename).not.toHaveBeenCalled()
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe('about the card removing', () => {
//       // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//       beforeEach(() => {
//         // @ts-expect-error TS(2304): Cannot find name 'jest'.
//         onCardRemove = jest.fn()
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component uses the default card template', () => {
//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component receives the "allowRemoveCard" prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => mount({ allowRemoveCard: true, onCardRemove }))

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call the "onCardRemove" callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onCardRemove).not.toHaveBeenCalled()
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the user clicks to remove a card from a column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => {
//               const removeCardButton = within(subject.queryByTestId('card-1')).queryByText('×')
//               // @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
//               fireEvent.click(removeCardButton)
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('calls the "onCardRemove" callback passing the card to be removed', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onCardRemove).toHaveBeenCalledTimes(1)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onCardRemove).toHaveBeenCalledWith(expect.objectContaining({ id: 1, title: 'Card title 1' }))
//             })
//           })
//         })
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component receives a custom card template', () => {
//         let renderCard

//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           renderCard = jest.fn(({ title }: any) => <div>{title}</div>)
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           onCardRemove = jest.fn()
//           // @ts-expect-error TS(2345): Argument of type '{ renderCard: any; onCardRemove:... Remove this comment to see the full error message
//           mount({ renderCard, onCardRemove })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it('does not call the "onCardRemove" callback', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(onCardRemove).not.toHaveBeenCalled()
//         })
//       })
//     })
//   })

//   // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//   describe('when the board is uncontrolled', () => {
//     function mount({ Component = Board, initialBoard = board, ...props } = {}) {
//       //@ts-expect-error
//       subject = render(<Component initialBoard={initialBoard} {...props} />)
//       return subject
//     }

//     function UselessState({ initialBoard, ...props }: any) {
//       const [board, setBoard] = useState(initialBoard)

//       function handleCardMoving() {
//         setBoard(moveCard(board, { fromPosition: 0, fromColumnId: 1 }, { toPosition: 1, toColumnId: 1 }))
//       }

//       return (
//         <>
//           <button onClick={handleCardMoving}>Move card</button>
//           <Board initialBoard={board} {...props} />
//         </>
//       )
//     }

//     // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//     it('renders a board only on mounting according to the initialBoard prop', () => {
//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(mount().container.querySelector('div')).toBeInTheDocument()
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//     it('does not rerender on initialBoard change', () => {
//       const { queryByText, queryByTestId } = mount({ Component: UselessState })

//       const column = within(queryByTestId('column-1'))
//       const cards = column.queryAllByText(/^Card title/)

//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(cards).toHaveLength(2)
//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(cards[0]).toHaveTextContent(/^Card title 1$/)
//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(cards[1]).toHaveTextContent(/^Card title 2$/)

//       fireEvent.click(queryByText('Move card', { selector: 'button' }))

//       const movedCards = column.queryAllByText(/^Card title/)

//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(movedCards).toHaveLength(2)
//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(movedCards[0]).toHaveTextContent(/^Card title 1$/)
//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(movedCards[1]).toHaveTextContent(/^Card title 2$/)
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//     it('renders the specified columns in the board ordered by its specified position', () => {
//       const columns = mount().queryAllByText(/^Column/)
//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(columns).toHaveLength(2)
//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(columns[0]).toHaveTextContent(/^Column Backlog$/)
//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(columns[1]).toHaveTextContent(/^Column Doing$/)
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//     it('renders the specified cards in their columns', () => {
//       const column = within(mount().queryByTestId('column-1'))
//       const cards = column.queryAllByText(/^Card title/)
//       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//       expect(cards).toHaveLength(2)
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe('about the card moving', () => {
//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component receives "onCardDragEnd" callback', () => {
//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           onCardDragEnd = jest.fn()
//           // @ts-expect-error TS(2345): Argument of type '{ onCardDragEnd: any; }' is not ... Remove this comment to see the full error message
//           mount({ onCardDragEnd })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the user cancels the card moving', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             callbacks.onDragEnd({ source: null, destination: null })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call onCardDragEnd callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onCardDragEnd).not.toHaveBeenCalled()
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('whe the user moves a card to the same position', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             act(() => {
//               callbacks.onDragEnd({
//                 source: { droppableId: '1', index: 0 },
//                 destination: { droppableId: '1', index: 0 },
//               })
//             })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call onCardDragEnd callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onCardDragEnd).not.toHaveBeenCalled()
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the user moves a card to another position', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             act(() => {
//               callbacks.onDragEnd({
//                 source: { droppableId: '1', index: 0 },
//                 destination: { droppableId: '1', index: 1 },
//               })
//             })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('calls the onCardDragEnd callback passing the modified board, the card and the move coordinates', () => {
//             const expectedBoard = {
//               columns: [
//                 {
//                   id: 1,
//                   title: 'Column Backlog',
//                   cards: [
//                     {
//                       id: 2,
//                       title: 'Card title 2',
//                       description: 'Card content',
//                     },
//                     {
//                       id: 1,
//                       title: 'Card title 1',
//                       description: 'Card content',
//                     },
//                   ],
//                 },
//                 {
//                   id: 2,
//                   title: 'Column Doing',
//                   cards: [
//                     {
//                       id: 3,
//                       title: 'Card title 3',
//                       description: 'Card content',
//                     },
//                   ],
//                 },
//               ],
//             }
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onCardDragEnd).toHaveBeenCalledTimes(1)
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onCardDragEnd).toHaveBeenCalledWith(
//               expectedBoard,
//               { description: 'Card content', id: 1, title: 'Card title 1' },
//               { fromPosition: 0, fromColumnId: 1 },
//               { toPosition: 1, toColumnId: 1 }
//             )
//           })
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe('about the column moving', () => {
//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component receives "onColumnDragEnd" callback', () => {
//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           onColumnDragEnd = jest.fn()
//           // @ts-expect-error TS(2345): Argument of type '{ onColumnDragEnd: any; }' is no... Remove this comment to see the full error message
//           mount({ onColumnDragEnd })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the user cancels the column moving', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             callbacks.onDragEnd({ source: null, destination: null, type: 'BOARD' })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call onColumnDragEnd callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnDragEnd).not.toHaveBeenCalled()
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the user moves a column to same position', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             act(() => {
//               callbacks.onDragEnd({ source: { index: 0 }, destination: { index: 0 }, type: 'BOARD' })
//             })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call onColumnDragEnd callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnDragEnd).not.toHaveBeenCalled()
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the user moves a column to another position', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             act(() => {
//               callbacks.onDragEnd({ source: { index: 0 }, destination: { index: 1 }, type: 'BOARD' })
//             })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('calls the onColumnDragEnd callback passing the modified board, the column, and the column move coordinates', () => {
//             const expectedBoard = {
//               columns: [
//                 {
//                   id: 2,
//                   title: 'Column Doing',
//                   cards: [
//                     {
//                       id: 3,
//                       title: 'Card title 3',
//                       description: 'Card content',
//                     },
//                   ],
//                 },
//                 {
//                   id: 1,
//                   title: 'Column Backlog',
//                   cards: [
//                     {
//                       id: 1,
//                       title: 'Card title 1',
//                       description: 'Card content',
//                     },
//                     {
//                       id: 2,
//                       title: 'Card title 2',
//                       description: 'Card content',
//                     },
//                   ],
//                 },
//               ],
//             }

//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnDragEnd).toHaveBeenCalledTimes(1)
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnDragEnd).toHaveBeenCalledWith(
//               expectedBoard,
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect.objectContaining({ title: 'Column Backlog' }),
//               { fromPosition: 0 },
//               { toPosition: 1 }
//             )
//           })
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe("about the board's custom card", () => {
//       let renderCard: any
//       const board = {
//         columns: [
//           {
//             id: 1,
//             title: 'Column Backlog',
//             cards: [
//               {
//                 id: 1,
//                 title: 'Card title',
//                 content: 'Card content',
//               },
//               {
//                 id: 2,
//                 title: 'Card title',
//                 content: 'Card content',
//               },
//             ],
//           },
//           {
//             id: 2,
//             title: 'Column Doing',
//             cards: [
//               {
//                 id: 3,
//                 title: 'Card title',
//                 content: 'Card content',
//               },
//             ],
//           },
//         ],
//       }

//       // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
//       afterEach(() => {
//         renderCard = undefined
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when it receives a "renderCard" prop', () => {
//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           renderCard = jest.fn((cardContent: any) => (
//             <div>
//               {cardContent.id} - {cardContent.title} - {cardContent.content}
//             </div>
//           ))

//           // @ts-expect-error TS(2322): Type '{ columns: { id: number; title: string; card... Remove this comment to see the full error message
//           mount({ initialBoard: board, renderCard })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it("renders the custom cards on the board's column", () => {
//           const cards = subject.queryAllByText(/\d+ - Card title - Card content$/)
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(cards).toHaveLength(3)
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it('passes the card content and the card bag as a parameter to the renderCard prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(renderCard).toHaveBeenCalledWith(
//             { id: 1, title: 'Card title', content: 'Card content' },
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             { removeCard: expect.any(Function), dragging: false }
//           )
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe("about the column's header", () => {
//       let renderColumnHeader: any
//       const board = {
//         columns: [
//           {
//             id: 1,
//             title: 'Column Backlog',
//             wip: 1,
//             cards: [{ id: 2, title: 'Card title', content: 'Card content' }],
//           },
//         ],
//       }

//       // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
//       afterEach(() => {
//         renderColumnHeader = undefined
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component receives a "renderColumnHeader" prop', () => {
//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           renderColumnHeader = jest.fn((columnContent: any) => (
//             <div>
//               {columnContent.title} ({columnContent.wip})
//             </div>
//           ))

//           // @ts-expect-error TS(2322): Type '{ columns: { id: number; title: string; wip:... Remove this comment to see the full error message
//           mount({ initialBoard: board, renderColumnHeader })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it("renders the custom header on the board's column", () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(subject.queryAllByTestId(/column/)).toHaveLength(1)
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(subject.queryByTestId('column-1')).toHaveTextContent(/Column Backlog \(1\)/)
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it('passes the column content, the "removeColumn" and the "renameColumn" to the "renderColumnHeader" prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(renderColumnHeader).toHaveBeenCalledTimes(1)
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(renderColumnHeader).toHaveBeenCalledWith(
//             {
//               id: 1,
//               title: 'Column Backlog',
//               wip: 1,
//               cards: [{ id: 2, title: 'Card title', content: 'Card content' }],
//             },
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             { removeColumn: expect.any(Function), renameColumn: expect.any(Function), addCard: expect.any(Function) }
//           )
//         })
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component does not receive a "renderColumnHeader" prop', () => {
//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => mount({ initialBoard: board }))

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it("renders the default header on the board's column", () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(subject.queryAllByTestId(/column/)).toHaveLength(1)
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(subject.queryByTestId('column-1')).toHaveTextContent(/Column Backlog/)
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe('about the column adding', () => {
//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('about the default column adder', () => {
//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component does not receive "allowAddColumn" prop', () => {
//           let onColumnNew, onNewColumnConfirm

//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             // @ts-expect-error TS(2304): Cannot find name 'jest'.
//             onColumnNew = jest.fn()
//             // @ts-expect-error TS(2304): Cannot find name 'jest'.
//             onNewColumnConfirm = jest.fn((column: any) => new Promise((resolve) => resolve({ id: 999, ...column })))
//             // @ts-expect-error TS(2345): Argument of type '{ allowAddColumn: boolean; onNew... Remove this comment to see the full error message
//             mount({ allowAddColumn: false, onNewColumnConfirm, onColumnNew })
//           })
//           // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
//           afterEach(() => {
//             onColumnNew = undefined
//             onNewColumnConfirm = undefined
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not render the column adder', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(subject.queryByText('➕')).not.toBeInTheDocument()
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component does not receive "onNewColumnConfirm" prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             // @ts-expect-error TS(2345): Argument of type '{ allowAddColumn: boolean; }' is... Remove this comment to see the full error message
//             mount({ allowAddColumn: true })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not render the column adder', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(subject.queryByText('➕')).not.toBeInTheDocument()
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when it receives the "allowAddColumn" and "onNewColumnConfirm" prop', () => {
//           let onColumnNew: any, onNewColumnConfirm: any

//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             // @ts-expect-error TS(2304): Cannot find name 'jest'.
//             onColumnNew = jest.fn()
//             // @ts-expect-error TS(2304): Cannot find name 'jest'.
//             onNewColumnConfirm = jest.fn((column: any) => new Promise((resolve) => resolve({ id: 999, ...column })))
//             // @ts-expect-error TS(2345): Argument of type '{ allowAddColumn: boolean; onNew... Remove this comment to see the full error message
//             mount({ allowAddColumn: true, onNewColumnConfirm, onColumnNew })
//           })
//           // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
//           afterEach(() => {
//             onColumnNew = undefined
//             onNewColumnConfirm = undefined
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('renders the column placeholder as the last column to add a new column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(subject.queryByText('➕')).toBeInTheDocument()
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the user clicks to add a new column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => fireEvent.click(subject.queryByText('➕')))

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('hides the column placeholder', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(subject.queryByText('➕')).not.toBeInTheDocument()
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('renders the input asking for a column title', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(subject.container.querySelector('input')).toBeInTheDocument()
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//             describe('when the user confirms the new column', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//               beforeEach(async () => {
//                 fireEvent.change(subject.container.querySelector('input'), {
//                   target: { value: 'Column Added by user' },
//                 })
//                 fireEvent.click(subject.queryByText('Add'))
//                 await screen.findByTestId('column-999')
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('calls the "onNewColumnConfirm" passing the new column', () => {
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onNewColumnConfirm).toHaveBeenCalledTimes(1)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onNewColumnConfirm).toHaveBeenCalledWith({ title: 'Column Added by user', cards: [] })
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('renders the new column using the id returned on "onNewColumnConfirm"', () => {
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(subject.queryAllByTestId(/column-\d+/)).toHaveLength(3)
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('renders the column placeholder as the last column to add a new column', () => {
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(subject.queryByText('➕')).toBeInTheDocument()
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('calls the "onColumnNew" passing the modified board and the added column', () => {
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onColumnNew).toHaveBeenCalledTimes(1)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onColumnNew).toHaveBeenCalledWith(
//                   {
//                     columns: [
//                       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                       expect.objectContaining({ id: 1 }),
//                       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                       expect.objectContaining({ id: 2 }),
//                       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                       expect.objectContaining({ id: 999 }),
//                     ],
//                   },
//                   { id: 999, title: 'Column Added by user', cards: [] }
//                 )
//               })
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//             describe('when the user cancels the new column adding', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//               beforeEach(() => {
//                 fireEvent.click(subject.queryByText('Cancel'))
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('does not add any new column', () => {
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(subject.queryAllByTestId(/column-\d+/)).toHaveLength(2)
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('renders the column placeholder as the last column to add a new column', () => {
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(subject.queryByText('➕')).toBeInTheDocument()
//               })
//             })
//           })
//         })
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('about custom column adder', () => {
//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component receives a custom column adder', () => {
//           let onColumnNew: any, renderColumnAdder: any

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the component does not receive "allowAddColumn" prop', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => {
//               // @ts-expect-error TS(2304): Cannot find name 'jest'.
//               renderColumnAdder = jest.fn(() => (
//                 <div>
//                   <input data-testid='columnAdder' />
//                 </div>
//               ))

//               // @ts-expect-error TS(2345): Argument of type '{ renderColumnAdder: any; }' is ... Remove this comment to see the full error message
//               mount({ renderColumnAdder })
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('does not render the custom render adder', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(subject.queryByTestId('columnAdder')).not.toBeInTheDocument()
//             })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the component receives the "allowAddColumn" prop', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => {
//               // @ts-expect-error TS(2304): Cannot find name 'jest'.
//               onColumnNew = jest.fn()
//               // @ts-expect-error TS(2304): Cannot find name 'jest'.
//               renderColumnAdder = jest.fn(({ addColumn }: any) => (
//                 <div data-testid='columnAdder'>
//                   <button onClick={() => addColumn({ id: 99, title: 'New column', cards: [] })}>Add column</button>
//                 </div>
//               ))

//               // @ts-expect-error TS(2345): Argument of type '{ children: { columns: { id: num... Remove this comment to see the full error message
//               mount({ children: board, renderColumnAdder, allowAddColumn: true, onColumnNew })
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('renders the custom column adder as the last column to add a new column', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(subject.queryByTestId('columnAdder')).toBeInTheDocument()
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('passes the "addColumn" to the "renderColumnAdder" prop', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(renderColumnAdder).toHaveBeenCalledTimes(1)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(renderColumnAdder).toHaveBeenCalledWith({ addColumn: expect.any(Function) })
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//             describe('when the "addColumn" callback is called', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//               beforeEach(() => fireEvent.click(within(subject.queryByTestId('columnAdder')).queryByText('Add column')))

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('renders the new column', () => {
//                 const column = subject.queryAllByTestId(/column-\d+/)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(column).toHaveLength(3)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(column[2]).toHaveTextContent('New column')
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('calls the "onColumnNew" callback passing both the updated board and the added column', () => {
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onColumnNew).toHaveBeenCalledTimes(1)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onColumnNew).toHaveBeenCalledWith(
//                   {
//                     columns: [
//                       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                       expect.objectContaining({ id: 1 }),
//                       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                       expect.objectContaining({ id: 2 }),
//                       // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                       expect.objectContaining({ id: 99, title: 'New column' }),
//                     ],
//                   },
//                   // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                   expect.objectContaining({ id: 99, title: 'New column' })
//                 )
//               })
//             })
//           })
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe('about the column removing', () => {
//       // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//       beforeEach(() => {
//         // @ts-expect-error TS(2304): Cannot find name 'jest'.
//         onColumnRemove = jest.fn()
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component uses the default header template', () => {
//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component receives the "allowRemoveColumn" prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => mount({ allowRemoveColumn: true, onColumnRemove }))

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call the "onColumnRemove callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnRemove).not.toHaveBeenCalled()
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the user clicks to remove a column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => {
//               const removeColumnButton = within(subject.queryByTestId('column-1')).queryByText('×')
//               // @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
//               fireEvent.click(removeColumnButton)
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('removes the column', () => {
//               const column = subject.queryAllByTestId(/column-\d+/)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(column).toHaveLength(1)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(column[0]).toHaveTextContent('Column Doing')
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('calls the "onColumnRemove" callback passing both the updated board and the removed column', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onColumnRemove).toHaveBeenCalledTimes(1)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onColumnRemove).toHaveBeenCalledWith(
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 { columns: [expect.objectContaining({ id: 2 })] },
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect.objectContaining({ id: 1 })
//               )
//             })
//           })
//         })
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component receives a custom header column template', () => {
//         let renderColumnHeader: any

//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           renderColumnHeader = jest.fn(({ title }: any, { removeColumn }: any) => (
//             <div onClick={removeColumn}>{title}</div>
//           ))
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           onColumnRemove = jest.fn()
//           // @ts-expect-error TS(2345): Argument of type '{ renderColumnHeader: any; onCol... Remove this comment to see the full error message
//           mount({ renderColumnHeader, onColumnRemove })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it('does not call the "onColumnRemove" callback', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(onColumnRemove).not.toHaveBeenCalled()
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it('passes the column and the column bag to the "renderColumnHeader"', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(renderColumnHeader).toHaveBeenCalledWith(
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect.objectContaining({ id: 1, title: 'Column Backlog' }),
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect.objectContaining({ removeColumn: expect.any(Function), renameColumn: expect.any(Function) })
//           )
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the "removeColumn" callback is called', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => fireEvent.click(within(subject.queryByTestId('column-1')).queryByText('Column Backlog')))

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('removes the column', () => {
//             const column = subject.queryAllByTestId(/column-\d+/)
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(column).toHaveLength(1)
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(column[0]).toHaveTextContent('Column Doing')
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('calls the "onColumnRemove" callback passing both the updated board and the removed column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnRemove).toHaveBeenCalledTimes(1)
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnRemove).toHaveBeenCalledWith(
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               { columns: [expect.objectContaining({ id: 2 })] },
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect.objectContaining({ id: 1 })
//             )
//           })
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe('about the column renaming', () => {
//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component use the default header template', () => {
//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component receives the "allowRenameColumn" prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             // @ts-expect-error TS(2304): Cannot find name 'jest'.
//             onColumnRename = jest.fn()
//             // @ts-expect-error TS(2345): Argument of type '{ allowRenameColumn: boolean; on... Remove this comment to see the full error message
//             mount({ allowRenameColumn: true, onColumnRename })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call the "onColumnRename" callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnRename).not.toHaveBeenCalled()
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the user renames a column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => {
//               // @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
//               fireEvent.click(within(subject.queryByTestId('column-1')).queryByText('Column Backlog'))
//               fireEvent.change(subject.container.querySelector('input'), { target: { value: 'New title' } })
//               fireEvent.click(subject.queryByText('Rename', { selector: 'button' }))
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('renames the column', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(subject.queryByText('Column Backlog')).not.toBeInTheDocument()
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(subject.queryByText('New title')).toBeInTheDocument()
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('calls the "onColumnRename" callback passing both the updated board and the renamed column', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onColumnRename).toHaveBeenCalledTimes(1)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onColumnRename).toHaveBeenCalledWith(
//                 {
//                   columns: [
//                     // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                     expect.objectContaining({ id: 1, title: 'New title' }),
//                     // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                     expect.objectContaining({ id: 2, title: 'Column Doing' }),
//                   ],
//                 },
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect.objectContaining({ id: 1, title: 'New title' })
//               )
//             })
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component does not receive the "allowRenameColumn" prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             // @ts-expect-error TS(2304): Cannot find name 'jest'.
//             onColumnRename = jest.fn()
//             // @ts-expect-error TS(2345): Argument of type '{ onColumnRename: any; }' is not... Remove this comment to see the full error message
//             mount({ onColumnRename })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call the "onColumnRename" callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnRename).not.toHaveBeenCalled()
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not show the button on column header to remove the column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(subject.queryByTestId('column-1').querySelector('button')).not.toBeInTheDocument()
//           })
//         })
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component receives a custom header column template', () => {
//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           const renderColumnHeader = ({ title }: any, { renameColumn }: any) => (
//             <div onClick={() => renameColumn('New title')}>{title}</div>
//           )
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           onColumnRename = jest.fn()
//           // @ts-expect-error TS(2345): Argument of type '{ renderColumnHeader: ({ title }... Remove this comment to see the full error message
//           mount({ renderColumnHeader, onColumnRename })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it('does not call the "onColumnRename" callback', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(onColumnRename).not.toHaveBeenCalled()
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the "renameColumn" callback is called', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => fireEvent.click(within(subject.queryByTestId('column-1')).queryByText('Column Backlog')))

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('renames the column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(subject.queryByTestId('column-1')).toHaveTextContent('New title')
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('calls the "onColumnRename" callback passing both the updated board and the renamed column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnRename).toHaveBeenCalledTimes(1)
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onColumnRename).toHaveBeenCalledWith(
//               {
//                 columns: [
//                   // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                   expect.objectContaining({ id: 1, title: 'New title' }),
//                   // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                   expect.objectContaining({ id: 2, title: 'Column Doing' }),
//                 ],
//               },
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect.objectContaining({ id: 1, title: 'New title' })
//             )
//           })
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe('about the card removing', () => {
//       // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//       beforeEach(() => {
//         // @ts-expect-error TS(2304): Cannot find name 'jest'.
//         onCardRemove = jest.fn()
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component uses the default card template', () => {
//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component receives the "allowRemoveCard" prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => mount({ allowRemoveCard: true, onCardRemove }))

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not call the "onCardRemove" callback', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onCardRemove).not.toHaveBeenCalled()
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the user clicks to remove a card from a column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => {
//               const removeCardButton = within(subject.queryByTestId('card-1')).queryByText('×')
//               // @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
//               fireEvent.click(removeCardButton)
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('removes the card from the column', () => {
//               const cards = subject.queryAllByText(/^Card title/)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(cards).toHaveLength(2)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(cards[0]).toHaveTextContent('Card title 2')
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(cards[1]).toHaveTextContent('Card title 3')
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('calls the "onCardRemove" callback passing the updated board, the updated column and the removed card', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onCardRemove).toHaveBeenCalledTimes(1)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onCardRemove).toHaveBeenCalledWith(
//                 {
//                   columns: [
//                     // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                     expect.objectContaining({ id: 1, cards: [expect.objectContaining({ id: 2 })] }),
//                     // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                     expect.objectContaining({ id: 2, cards: [expect.objectContaining({ id: 3 })] }),
//                   ],
//                 },
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect.objectContaining({ id: 1, title: 'Column Backlog' }),
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect.objectContaining({ id: 1, title: 'Card title 1' })
//               )
//             })
//           })
//         })
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component receives a custom card template', () => {
//         let renderCard: any

//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           renderCard = jest.fn(({ title }: any, { removeCard }: any) => <div onClick={removeCard}>{title}</div>)
//           // @ts-expect-error TS(2304): Cannot find name 'jest'.
//           onCardRemove = jest.fn()
//           // @ts-expect-error TS(2345): Argument of type '{ renderCard: any; onCardRemove:... Remove this comment to see the full error message
//           mount({ renderCard, onCardRemove })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it('does not call the "onCardRemove" callback', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(onCardRemove).not.toHaveBeenCalled()
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it('passes the card and the card bag to the "renderCard"', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(renderCard).toHaveBeenCalledWith(
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect.objectContaining({ title: 'Card title 1' }),
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect.objectContaining({ removeCard: expect.any(Function), dragging: false })
//           )
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the "removeCard" callback is called', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => fireEvent.click(subject.queryByText('Card title 1')))

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('removes the card from the column', () => {
//             const cards = subject.queryAllByText(/^Card title/)
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(cards).toHaveLength(2)
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(cards[0]).toHaveTextContent('Card title 2')
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(cards[1]).toHaveTextContent('Card title 3')
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('calls the "onCardRemove" callback passing the updated board, column and the removed card', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onCardRemove).toHaveBeenCalledTimes(1)
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(onCardRemove).toHaveBeenCalledWith(
//               {
//                 columns: [
//                   // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                   expect.objectContaining({ title: 'Column Backlog' }),
//                   // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                   expect.objectContaining({ title: 'Column Doing' }),
//                 ],
//               },
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect.objectContaining({ id: 1, title: 'Column Backlog' }),
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect.objectContaining({ id: 1, title: 'Card title 1' })
//             )
//           })
//         })
//       })
//     })

//     // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//     describe('about the card adding', () => {
//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component receives a custom header column template', () => {
//         // @ts-expect-error TS(2304): Cannot find name 'jest'.
//         const renderColumnHeader = jest.fn((_: any, { addCard }: any) => {
//           return <button onClick={() => addCard({ id: 99, title: 'New card' })}>New card</button>
//         })
//         // @ts-expect-error TS(2304): Cannot find name 'jest'.
//         const onCardNew = jest.fn()

//         // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//         beforeEach(() => {
//           renderColumnHeader.mockClear()
//           onCardNew.mockClear()
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it('does not call the "onCardNew" callback', () => {
//           // @ts-expect-error TS(2345): Argument of type '{ renderColumnHeader: any; onCar... Remove this comment to see the full error message
//           mount({ renderColumnHeader, onCardNew })
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(onCardNew).not.toHaveBeenCalled()
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//         it('passes the column and the column bag to the "renderColumnHeader"', () => {
//           // @ts-expect-error TS(2345): Argument of type '{ renderColumnHeader: any; onCar... Remove this comment to see the full error message
//           mount({ renderColumnHeader, onCardNew })
//           // @ts-expect-error TS(2304): Cannot find name 'expect'.
//           expect(renderColumnHeader).toHaveBeenCalledWith(
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect.objectContaining({ id: 1, title: 'Column Backlog' }),
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect.objectContaining({
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               removeColumn: expect.any(Function),
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               renameColumn: expect.any(Function),
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               addCard: expect.any(Function),
//             })
//           )
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the "addCard" callback is called', () => {
//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the position is not specified', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => {
//               // @ts-expect-error TS(2345): Argument of type '{ renderColumnHeader: any; onCar... Remove this comment to see the full error message
//               mount({ renderColumnHeader, onCardNew })
//               // @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
//               fireEvent.click(within(subject.queryByTestId('column-1')).queryByText('New card'))
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('adds a new card on the bottom of the column', () => {
//               const cards = within(subject.queryByTestId('column-1')).queryAllByTestId(/card/)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(cards).toHaveLength(3)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(cards[2]).toHaveTextContent('New card')
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('calls the "onCardNew" callback passing the updated board, the updated column and the new card', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onCardNew).toHaveBeenCalledTimes(1)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onCardNew).toHaveBeenCalledWith(
//                 {
//                   // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                   columns: [expect.objectContaining({ id: 1 }), expect.objectContaining({ id: 2 })],
//                 },
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect.objectContaining({
//                   id: 1,
//                   cards: [
//                     // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                     expect.objectContaining({ id: 1 }),
//                     // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                     expect.objectContaining({ id: 2 }),
//                     // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                     expect.objectContaining({ id: 99 }),
//                   ],
//                 }),
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect.objectContaining({ id: 99 })
//               )
//             })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the position is specified to add the card on the top of the column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => {
//               // @ts-expect-error TS(2304): Cannot find name 'jest'.
//               const renderColumnHeader = jest.fn((_: any, { addCard }: any) => {
//                 return <button onClick={() => addCard({ id: 99, title: 'New card' }, { on: 'top' })}>New card</button>
//               })
//               // @ts-expect-error TS(2345): Argument of type '{ renderColumnHeader: any; onCar... Remove this comment to see the full error message
//               mount({ renderColumnHeader, onCardNew })
//               // @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
//               fireEvent.click(within(subject.queryByTestId('column-1')).queryByText('New card'))
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('adds a new card on the top of the column', () => {
//               const cards = within(subject.queryByTestId('column-1')).queryAllByTestId(/card/)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(cards).toHaveLength(3)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(cards[0]).toHaveTextContent('New card')
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('calls the "onCardNew" callback passing the updated board, the updated column and the new card', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onCardNew).toHaveBeenCalledTimes(1)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onCardNew).toHaveBeenCalledWith(
//                 {
//                   // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                   columns: [expect.objectContaining({ id: 1 }), expect.objectContaining({ id: 2 })],
//                 },
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect.objectContaining({
//                   id: 1,
//                   cards: [
//                     // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                     expect.objectContaining({ id: 99 }),
//                     // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                     expect.objectContaining({ id: 1 }),
//                     // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                     expect.objectContaining({ id: 2 }),
//                   ],
//                 }),
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect.objectContaining({ id: 99 })
//               )
//             })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the position is specified to add the card on the bottom of the column', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(() => {
//               // @ts-expect-error TS(2304): Cannot find name 'jest'.
//               const renderColumnHeader = jest.fn((_: any, { addCard }: any) => {
//                 return (
//                   <button onClick={() => addCard({ id: 99, title: 'New card' }, { on: 'bottom' })}>New card</button>
//                 )
//               })
//               // @ts-expect-error TS(2345): Argument of type '{ renderColumnHeader: any; onCar... Remove this comment to see the full error message
//               mount({ renderColumnHeader, onCardNew })
//               // @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
//               fireEvent.click(within(subject.queryByTestId('column-1')).queryByText('New card'))
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('adds a new card on the bottom of the column', () => {
//               const cards = within(subject.queryByTestId('column-1')).queryAllByTestId(/card/)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(cards).toHaveLength(3)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(cards[2]).toHaveTextContent('New card')
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('calls the "onCardNew" callback passing the updated board, the updated column and the new card', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onCardNew).toHaveBeenCalledTimes(1)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onCardNew).toHaveBeenCalledWith(
//                 {
//                   // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                   columns: [expect.objectContaining({ id: 1 }), expect.objectContaining({ id: 2 })],
//                 },
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect.objectContaining({
//                   id: 1,
//                   cards: [
//                     // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                     expect.objectContaining({ id: 1 }),
//                     // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                     expect.objectContaining({ id: 2 }),
//                     // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                     expect.objectContaining({ id: 99 }),
//                   ],
//                 }),
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect.objectContaining({ id: 99 })
//               )
//             })
//           })
//         })
//       })

//       // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//       describe('when the component does not receive a custom header column template', () => {
//         // @ts-expect-error TS(2304): Cannot find name 'jest'.
//         const onCardNew = jest.fn()
//         // @ts-expect-error TS(2304): Cannot find name 'jest'.
//         const onNewCardConfirm = jest.fn((column: any) => new Promise((resolve) => resolve({ id: 999, ...column })))

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component does not receive "allowAddCard" prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             // @ts-expect-error TS(2345): Argument of type '{ allowAddCard: boolean; onNewCa... Remove this comment to see the full error message
//             mount({ allowAddCard: false, onNewCardConfirm, onCardNew })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not render the card adder', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(subject.queryByText('+')).not.toBeInTheDocument()
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component does not receive the "onNewCardConfirm" prop', () => {
//           // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//           beforeEach(() => {
//             // @ts-expect-error TS(2345): Argument of type '{ allowAddCard: boolean; onCardN... Remove this comment to see the full error message
//             mount({ allowAddCard: true, onCardNew: () => {} })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//           it('does not render the column adder', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'expect'.
//             expect(subject.queryByText('+')).not.toBeInTheDocument()
//           })
//         })

//         // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//         describe('when the component receives both the "allowAddCard" and "onNewCardConfirm" props', () => {
//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('when the user adds a new card', () => {
//             // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//             beforeEach(async () => {
//               // @ts-expect-error TS(2345): Argument of type '{ allowAddCard: boolean; onNewCa... Remove this comment to see the full error message
//               mount({ allowAddCard: true, onNewCardConfirm, onCardNew })

//               fireEvent.click(subject.queryAllByText('+')[0])
//               fireEvent.change(subject.container.querySelector('input[name="title"]'), {
//                 target: { value: 'Card title' },
//               })
//               fireEvent.change(subject.container.querySelector('input[name="description"]'), {
//                 target: { value: 'Card description' },
//               })
//               fireEvent.click(subject.queryByText('Add'))
//               await screen.findByTestId('card-999')
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('calls the "onNewCardConfirm" passing the new card', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onNewCardConfirm).toHaveBeenCalledTimes(1)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onNewCardConfirm).toHaveBeenCalledWith({
//                 title: 'Card title',
//                 description: 'Card description',
//               })
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('renders the new card using the id returned on "onNewCardConfirm"', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(subject.queryAllByTestId(/card/)).toHaveLength(4)
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('renders the card placeholder', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(subject.queryAllByText('+')).toHaveLength(2)
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('adds a new card on column', () => {
//               const cards = within(subject.queryByTestId('column-1')).queryAllByTestId(/card/)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(cards).toHaveLength(3)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(cards[2]).toHaveTextContent('Card title')
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//             it('calls the "onCardNew" callback passing the updated board, the updated column and the new card', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onCardNew).toHaveBeenCalledTimes(1)
//               // @ts-expect-error TS(2304): Cannot find name 'expect'.
//               expect(onCardNew).toHaveBeenCalledWith(
//                 {
//                   columns: [
//                     {
//                       id: 1,
//                       title: 'Column Backlog',
//                       cards: [
//                         {
//                           id: 1,
//                           title: 'Card title 1',
//                           description: 'Card content',
//                         },
//                         {
//                           id: 2,
//                           title: 'Card title 2',
//                           description: 'Card content',
//                         },
//                         { id: 999, title: 'Card title', description: 'Card description' },
//                       ],
//                     },
//                     {
//                       id: 2,
//                       title: 'Column Doing',
//                       cards: [
//                         {
//                           id: 3,
//                           title: 'Card title 3',
//                           description: 'Card content',
//                         },
//                       ],
//                     },
//                   ],
//                 },
//                 {
//                   id: 1,
//                   title: 'Column Backlog',
//                   cards: [
//                     {
//                       id: 1,
//                       title: 'Card title 1',
//                       description: 'Card content',
//                     },
//                     {
//                       id: 2,
//                       title: 'Card title 2',
//                       description: 'Card content',
//                     },
//                     { id: 999, title: 'Card title', description: 'Card description' },
//                   ],
//                 },
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect.objectContaining({ id: 999 })
//               )
//             })
//           })

//           // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//           describe('about the card position when it is added', () => {
//             // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//             describe('when the position is not specified', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//               beforeEach(async () => {
//                 // @ts-expect-error TS(2345): Argument of type '{ allowAddCard: boolean; onNewCa... Remove this comment to see the full error message
//                 mount({ allowAddCard: true, onNewCardConfirm, onCardNew })
//                 fireEvent.click(subject.queryAllByText('+')[0])

//                 fireEvent.change(subject.container.querySelector('input[name="title"]'), {
//                   target: { value: 'Card title' },
//                 })
//                 fireEvent.change(subject.container.querySelector('input[name="description"]'), {
//                   target: { value: 'Card description' },
//                 })
//                 fireEvent.click(subject.queryByText('Add'))
//                 await screen.findByTestId('card-999')
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('adds a new card on the bottom of the column', () => {
//                 const cards = within(subject.queryByTestId('column-1')).queryAllByTestId(/card/)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(cards).toHaveLength(3)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(cards[2]).toHaveTextContent('Card description')
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('calls the "onCardNew" callback passing the updated board, the updated column and the new card on the end of the card array', () => {
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onCardNew).toHaveBeenCalledTimes(1)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onCardNew).toHaveBeenCalledWith(
//                   {
//                     columns: [
//                       {
//                         id: 1,
//                         title: 'Column Backlog',
//                         cards: [
//                           {
//                             id: 1,
//                             title: 'Card title 1',
//                             description: 'Card content',
//                           },
//                           {
//                             id: 2,
//                             title: 'Card title 2',
//                             description: 'Card content',
//                           },
//                           { id: 999, title: 'Card title', description: 'Card description' },
//                         ],
//                       },
//                       {
//                         id: 2,
//                         title: 'Column Doing',
//                         cards: [
//                           {
//                             id: 3,
//                             title: 'Card title 3',
//                             description: 'Card content',
//                           },
//                         ],
//                       },
//                     ],
//                   },
//                   {
//                     id: 1,
//                     title: 'Column Backlog',
//                     cards: [
//                       {
//                         id: 1,
//                         title: 'Card title 1',
//                         description: 'Card content',
//                       },
//                       {
//                         id: 2,
//                         title: 'Card title 2',
//                         description: 'Card content',
//                       },
//                       { id: 999, title: 'Card title', description: 'Card description' },
//                     ],
//                   },
//                   // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                   expect.objectContaining({ id: 999 })
//                 )
//               })
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//             describe('when the position is specified to add the card on the top of the column', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//               beforeEach(async () => {
//                 // @ts-expect-error TS(2345): Argument of type '{ allowAddCard: { on: string; };... Remove this comment to see the full error message
//                 mount({ allowAddCard: { on: 'top' }, onNewCardConfirm, onCardNew })
//                 fireEvent.click(subject.queryAllByText('+')[0])

//                 fireEvent.change(subject.container.querySelector('input[name="title"]'), {
//                   target: { value: 'Card title' },
//                 })
//                 fireEvent.change(subject.container.querySelector('input[name="description"]'), {
//                   target: { value: 'Card description' },
//                 })
//                 fireEvent.click(subject.queryByText('Add'))
//                 await screen.findByTestId('card-999')
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('adds a new card on the top of the column', () => {
//                 const cards = within(subject.queryByTestId('column-1')).queryAllByTestId(/card/)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(cards).toHaveLength(3)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(cards[0]).toHaveTextContent('Card description')
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('calls the "onCardNew" callback passing the updated board, the updated column and the new card on the start of the array', () => {
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onCardNew).toHaveBeenCalledTimes(1)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onCardNew).toHaveBeenCalledWith(
//                   {
//                     columns: [
//                       {
//                         id: 1,
//                         title: 'Column Backlog',
//                         cards: [
//                           { id: 999, title: 'Card title', description: 'Card description' },
//                           {
//                             id: 1,
//                             title: 'Card title 1',
//                             description: 'Card content',
//                           },
//                           {
//                             id: 2,
//                             title: 'Card title 2',
//                             description: 'Card content',
//                           },
//                         ],
//                       },
//                       {
//                         id: 2,
//                         title: 'Column Doing',
//                         cards: [
//                           {
//                             id: 3,
//                             title: 'Card title 3',
//                             description: 'Card content',
//                           },
//                         ],
//                       },
//                     ],
//                   },
//                   {
//                     id: 1,
//                     title: 'Column Backlog',
//                     cards: [
//                       { id: 999, title: 'Card title', description: 'Card description' },
//                       {
//                         id: 1,
//                         title: 'Card title 1',
//                         description: 'Card content',
//                       },
//                       {
//                         id: 2,
//                         title: 'Card title 2',
//                         description: 'Card content',
//                       },
//                     ],
//                   },
//                   // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                   expect.objectContaining({ id: 999 })
//                 )
//               })
//             })

//             // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
//             describe('when the position is specified to add the card on the bottom of the column', () => {
//               // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
//               beforeEach(async () => {
//                 // @ts-expect-error TS(2345): Argument of type '{ allowAddCard: { on: string; };... Remove this comment to see the full error message
//                 mount({ allowAddCard: { on: 'bottom' }, onNewCardConfirm, onCardNew })
//                 fireEvent.click(subject.queryAllByText('+')[0])

//                 fireEvent.change(subject.container.querySelector('input[name="title"]'), {
//                   target: { value: 'Card title' },
//                 })
//                 fireEvent.change(subject.container.querySelector('input[name="description"]'), {
//                   target: { value: 'Card description' },
//                 })
//                 fireEvent.click(subject.queryByText('Add'))
//                 await screen.findByTestId('card-999')
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('adds a new card on the bottom of the column', () => {
//                 const cards = within(subject.queryByTestId('column-1')).queryAllByTestId(/card/)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(cards).toHaveLength(3)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(cards[2]).toHaveTextContent('Card description')
//               })

//               // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
//               it('calls the "onCardNew" callback passing the updated board, the updated column and the new card on the end of the array', () => {
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onCardNew).toHaveBeenCalledTimes(1)
//                 // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                 expect(onCardNew).toHaveBeenCalledWith(
//                   {
//                     columns: [
//                       {
//                         id: 1,
//                         title: 'Column Backlog',
//                         cards: [
//                           {
//                             id: 1,
//                             title: 'Card title 1',
//                             description: 'Card content',
//                           },
//                           {
//                             id: 2,
//                             title: 'Card title 2',
//                             description: 'Card content',
//                           },
//                           { id: 999, title: 'Card title', description: 'Card description' },
//                         ],
//                       },
//                       {
//                         id: 2,
//                         title: 'Column Doing',
//                         cards: [
//                           {
//                             id: 3,
//                             title: 'Card title 3',
//                             description: 'Card content',
//                           },
//                         ],
//                       },
//                     ],
//                   },
//                   {
//                     id: 1,
//                     title: 'Column Backlog',
//                     cards: [
//                       {
//                         id: 1,
//                         title: 'Card title 1',
//                         description: 'Card content',
//                       },
//                       {
//                         id: 2,
//                         title: 'Card title 2',
//                         description: 'Card content',
//                       },
//                       { id: 999, title: 'Card title', description: 'Card description' },
//                     ],
//                   },
//                   // @ts-expect-error TS(2304): Cannot find name 'expect'.
//                   expect.objectContaining({ id: 999 })
//                 )
//               })
//             })
//           })
//         })
//       })
//     })
//   })
// })
