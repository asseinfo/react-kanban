import Board, { moveColumn, moveCard, addColumn, removeColumn, changeColumn, addCard, removeCard, changeCard } from './'

// @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
it('exports the Component and the helpers', () => {
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(Board).toEqual(expect.any(Function))
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(moveColumn).toEqual(expect.any(Function))
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(moveCard).toEqual(expect.any(Function))
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(addColumn).toEqual(expect.any(Function))
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(removeColumn).toEqual(expect.any(Function))
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(changeColumn).toEqual(expect.any(Function))
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(addCard).toEqual(expect.any(Function))
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(removeCard).toEqual(expect.any(Function))
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(changeCard).toEqual(expect.any(Function))
})
