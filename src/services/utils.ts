// @ts-expect-error TS(7019) FIXME: Rest parameter 'fns' implicitly has an 'any[]' typ... Remove this comment to see the full error message
function compose(...fns) {
  // @ts-expect-error TS(7006) FIXME: Parameter 'arg' implicitly has an 'any' type.
  return (arg) => fns.reduce((acc, fn) => fn(acc), arg)
}

// @ts-expect-error TS(7006) FIXME: Parameter 'fn' implicitly has an 'any' type.
function partialRight(fn, ...args) {
  // @ts-expect-error TS(7019) FIXME: Rest parameter 'leftArgs' implicitly has an 'any[]... Remove this comment to see the full error message
  return (...leftArgs) => fn(...leftArgs, ...args)
}

// @ts-expect-error TS(7006) FIXME: Parameter 'array' implicitly has an 'any' type.
function addInArrayAtPosition(array, element, position) {
  const arrayCopy = [...array]
  arrayCopy.splice(position, 0, element)
  return arrayCopy
}

// @ts-expect-error TS(7006) FIXME: Parameter 'array' implicitly has an 'any' type.
function removeFromArrayAtPosition(array, position) {
  // @ts-expect-error TS(7006) FIXME: Parameter 'acc' implicitly has an 'any' type.
  return array.reduce((acc, value, idx) => (idx === position ? acc : [...acc, value]), [])
}

// @ts-expect-error TS(7006) FIXME: Parameter 'array' implicitly has an 'any' type.
function changeElementOfPositionInArray(array, from, to) {
  const removeFromArrayAtPositionFrom = partialRight(removeFromArrayAtPosition, from)
  const addInArrayAtPositionTo = partialRight(addInArrayAtPosition, array[from], to)

  return compose(removeFromArrayAtPositionFrom, addInArrayAtPositionTo)(array)
}

// @ts-expect-error TS(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
function identity(value) {
  return value
}

// @ts-expect-error TS(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
function when(value, predicate = identity) {
  // @ts-expect-error TS(7006) FIXME: Parameter 'callback' implicitly has an 'any' type.
  return function callback(callback) {
    if (predicate(value)) return callback(value)
  }
}

// @ts-expect-error TS(7006) FIXME: Parameter 'array' implicitly has an 'any' type.
function replaceElementOfArray(array) {
  // @ts-expect-error TS(7006) FIXME: Parameter 'options' implicitly has an 'any' type.
  return function (options) {
    // @ts-expect-error TS(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
    return array.map((element) => (options.when(element) ? options.for(element) : element))
  }
}

// @ts-expect-error TS(7006) FIXME: Parameter 'object' implicitly has an 'any' type.
function pickPropOut(object, prop) {
  return Object.keys(object).reduce((obj, key) => {
    return key === prop ? obj : { ...obj, [key]: object[key] }
  }, {})
}

export {
  addInArrayAtPosition,
  removeFromArrayAtPosition,
  changeElementOfPositionInArray,
  when,
  replaceElementOfArray,
  partialRight,
  pickPropOut,
}
