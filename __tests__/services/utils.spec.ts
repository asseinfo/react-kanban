import {
  addInArrayAtPosition,
  removeFromArrayAtPosition,
  changeElementOfPositionInArray,
  when,
  replaceElementOfArray,
  partialRight,
  pickPropOut,
} from '../../services/utils'

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#addInArrayAtPosition', () => {
  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('returns an array with an element added in the specified position', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(addInArrayAtPosition([0, 1, 2, 3], 1, 3)).toEqual([0, 1, 2, 1, 3])
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the position is the end of the array', () => {
    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('adds the element in the end of array', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(addInArrayAtPosition([0, 1, 2, 3], 1, 4)).toEqual([0, 1, 2, 3, 1])
    })
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the position is the begin of the array', () => {
    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('adds the element in the begin of array', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(addInArrayAtPosition([0, 1, 2, 3], 1, 0)).toEqual([1, 0, 1, 2, 3])
    })
  })
})

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#removeFromArrayAtPosition', () => {
  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('returns an array with an element removed from the specified position', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(removeFromArrayAtPosition([0, 1, 2, 3], 1)).toEqual([0, 2, 3])
  })
})

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#changeElementOfPositionInArray', () => {
  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('returns an array with an element positioned in the specified position', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(changeElementOfPositionInArray([0, 1, 2, 3, 4], 1, 2)).toEqual([0, 2, 1, 3, 4])
  })
})

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#when', () => {
  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when there is no predicate', () => {
    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the value is a truthy value', () => {
      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('calls the callback passing the value', () => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        const callback = jest.fn()
        when(1)(callback)

        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(callback).toHaveBeenCalledTimes(1)
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(callback).toHaveBeenCalledWith(1)
      })
    })

    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the value is a falsy value', () => {
      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not call the callback', () => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        const callback = jest.fn()
        when(0)(callback)

        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(callback).not.toHaveBeenCalled()
      })
    })
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when there is a predicate', () => {
    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the predicate is true', () => {
      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('calls the callback passing the value', () => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        const callback = jest.fn()
        when(1, (value) => value === 1)(callback)

        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(callback).toHaveBeenCalledTimes(1)
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(callback).toHaveBeenCalledWith(1)
      })
    })

    // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when the predicate is false', () => {
      // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('does not call the callback', () => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        const callback = jest.fn()
        when(1, (value) => value !== 1)(callback)

        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(callback).not.toHaveBeenCalled()
      })
    })
  })
})

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#replaceElementOfArray', () => {
  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('returns an array with the specified element replacing an element that matches the predicate', () => {
    const predicate = (value: any) => value === 2
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(replaceElementOfArray([0, 1, 2, 3])({ when: predicate, for: (_: any) => 999 })).toEqual([0, 1, 999, 3])
  })
})

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#partialRight', () => {
  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('returns a function with the arguments partially applied on the right', () => {
    // @ts-expect-error TS(2304): Cannot find name 'jest'.
    const mock = jest.fn()
    partialRight(mock, 'right')('left')
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mock).toHaveBeenCalledTimes(1)
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mock).toHaveBeenCalledWith('left', 'right')
  })
})

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#takePropOut', () => {
  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('takes the prop out of the object', () => {
    const object = { name: 'Leandro', surname: 'Lourenci' }
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(pickPropOut(object, 'surname')).toEqual({ name: 'Leandro' })
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the prop does not exist in the object', () => {
    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('does not take any prop of the object', () => {
      const object = { name: 'Leandro', surname: 'Lourenci' }
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(pickPropOut(object, 'last')).toEqual({ name: 'Leandro', surname: 'Lourenci' })
    })
  })
})
