import { addInArrayAtPosition, removeFromArrayAtPosition, changeElementOfPositionInArray } from './utils'

describe('#addInArrayAtPosition', () => {
  it('returns an array with an element added in the specified position', () => {
    expect(addInArrayAtPosition([0, 1, 2, 3], 1, 3)).toEqual([0, 1, 2, 1, 3])
  })

  describe('when the position is the end of the array', () => {
    it('adds the element in the end of array', () => {
      expect(addInArrayAtPosition([0, 1, 2, 3], 1, 4)).toEqual([0, 1, 2, 3, 1])
    })
  })

  describe('when the position is the begin of the array', () => {
    it('adds the element in the begin of array', () => {
      expect(addInArrayAtPosition([0, 1, 2, 3], 1, 0)).toEqual([1, 0, 1, 2, 3])
    })
  })
})

describe('#removeFromArrayAtPosition', () => {
  it('returns an array with an element removed from the specified position', () => {
    expect(removeFromArrayAtPosition([0, 1, 2, 3], 1)).toEqual([0, 2, 3])
  })
})

describe('#changeElementOfPositionInArray', () => {
  it('returns an array with an element positioned in the specified position', () => {
    expect(changeElementOfPositionInArray([0, 1, 2, 3, 4], 1, 2)).toEqual([0, 2, 1, 3, 4])
  })
})
