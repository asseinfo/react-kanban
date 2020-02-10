import Board, { moveColumn, moveCard, addColumn, removeColumn, changeColumn, addCard, removeCard } from './'

it('exports the Component and the helpers', () => {
  expect(Board).toEqual(expect.any(Function))
  expect(moveColumn).toEqual(expect.any(Function))
  expect(moveCard).toEqual(expect.any(Function))
  expect(addColumn).toEqual(expect.any(Function))
  expect(removeColumn).toEqual(expect.any(Function))
  expect(changeColumn).toEqual(expect.any(Function))
  expect(addCard).toEqual(expect.any(Function))
  expect(removeCard).toEqual(expect.any(Function))
})
