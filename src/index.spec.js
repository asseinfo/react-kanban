import Board, { moveLane, moveCard, addLane, removeLane, changeLane, addCard, removeCard } from './'

it('exports the Component and the helpers', () => {
  expect(Board).toEqual(expect.any(Function))
  expect(moveLane).toEqual(expect.any(Function))
  expect(moveCard).toEqual(expect.any(Function))
  expect(addLane).toEqual(expect.any(Function))
  expect(removeLane).toEqual(expect.any(Function))
  expect(changeLane).toEqual(expect.any(Function))
  expect(addCard).toEqual(expect.any(Function))
  expect(removeCard).toEqual(expect.any(Function))
})
