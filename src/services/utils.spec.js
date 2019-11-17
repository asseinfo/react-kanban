import {
  addInArrayAtPosition,
  removeFromArrayAtPosition,
  changeElementOfPositionInArray,
  when,
  replaceElementOfArray,
  partialRight
} from './utils'

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

describe('#when', () => {
  describe('when there is no predicate', () => {
    describe('when the value is a truthy value', () => {
      it('calls the callback passing the value', () => {
        const callback = jest.fn()
        when(1)(callback)

        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenCalledWith(1)
      })
    })

    describe('when the value is a falsy value', () => {
      it('does not call the callback', () => {
        const callback = jest.fn()
        when(0)(callback)

        expect(callback).not.toHaveBeenCalled()
      })
    })
  })

  describe('when there is a predicate', () => {
    describe('when the predicate is true', () => {
      it('calls the callback passing the value', () => {
        const callback = jest.fn()
        when(1, value => value === 1)(callback)

        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenCalledWith(1)
      })
    })

    describe('when the predicate is false', () => {
      it('does not call the callback', () => {
        const callback = jest.fn()
        when(1, value => value !== 1)(callback)

        expect(callback).not.toHaveBeenCalled()
      })
    })
  })
})

describe('#replaceElementOfArray', () => {
  it('returns an array with the specified element replacing an element that matches the predicate', () => {
    const predicate = value => value === 2
    expect(replaceElementOfArray([0, 1, 2, 3])({ when: predicate, for: _ => 999 })).toEqual([0, 1, 999, 3])
  })
})

describe('#partialRight', () => {
  it('returns a function with the arguments partially applied on the right', () => {
    const mock = jest.fn()
    partialRight(mock, 'right')('left')
    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith('left', 'right')
  })
})
