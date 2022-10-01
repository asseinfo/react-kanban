function compose(...fns: any[]) {
  return (arg: any) => fns.reduce((acc, fn) => fn(acc), arg)
}

function partialRight(fn: any, ...args: any[]) {
  return (...leftArgs: any[]) => fn(...leftArgs, ...args)
}

function addInArrayAtPosition(array: any, element: any, position: any) {
  const arrayCopy = [...array]
  arrayCopy.splice(position, 0, element)
  return arrayCopy
}

function removeFromArrayAtPosition(array: any, position: any) {
  return array.reduce((acc: any, value: any, idx: any) => (idx === position ? acc : [...acc, value]), [])
}

function changeElementOfPositionInArray(array: any, from: any, to: any) {
  const removeFromArrayAtPositionFrom = partialRight(removeFromArrayAtPosition, from)
  const addInArrayAtPositionTo = partialRight(addInArrayAtPosition, array[from], to)

  return compose(removeFromArrayAtPositionFrom, addInArrayAtPositionTo)(array)
}

const identity = <TValue>(value: TValue): TValue => {
  return value
}

export const when = <TValue>(value: TValue, predicate = identity) => {
  return (callback: (...args: any) => void) => {
    if (predicate(value)) return callback(value)
  }
}
type NonNullable<T> = Exclude<T, null | undefined>
export const when2 = <TValue>(
  value: TValue,
  callback: (verifiedValue: NonNullable<TValue>) => void,
  predicate = identity
) => {
  const shouldRun = predicate(value) && !!value
  if (shouldRun) callback(value as NonNullable<TValue>)
}

export const replaceElementOfArray = (array: any) => {
  return function (options: any) {
    return array.map((element: any) => (options.when(element) ? options.for(element) : element))
  }
}

export const pickPropOut = (object: any, prop: any) => {
  return Object.keys(object).reduce((obj, key) => {
    return key === prop ? obj : { ...obj, [key]: object[key] }
  }, {})
}

export { addInArrayAtPosition, removeFromArrayAtPosition, changeElementOfPositionInArray, partialRight }
