import { swapElementsOfArray, addInArray, removeFromArray } from './array'

describe('#swapElementsOfArray', () => {
  it('returns an array with two elements swaped on specified positions', () => {
    expect(swapElementsOfArray([0, 1, 2, 3], 1, 2)).toEqual([0, 2, 1, 3])
  })
})

describe('#addInArray', () => {
  it('returns an array with an element added in the specified position', () => {
    expect(addInArray([0, 1, 2, 3], 1, 3)).toEqual([0, 1, 2, 1, 3])
  })

  describe('when the position is the end of the array', () => {
    it('adds the element in the end of array', () => {
      expect(addInArray([0, 1, 2, 3], 1, 4)).toEqual([0, 1, 2, 3, 1])
    })
  })

  describe('when the position is the begin of the array', () => {
    it('adds the element in the begin of array', () => {
      expect(addInArray([0, 1, 2, 3], 1, 0)).toEqual([1, 0, 1, 2, 3])
    })
  })
})

describe('#removeFromArray', () => {
  it('returns an array with an element removed from the specified position', () => {
    expect(removeFromArray([0, 1, 2, 3], 1)).toEqual([0, 2, 3])
  })
})
