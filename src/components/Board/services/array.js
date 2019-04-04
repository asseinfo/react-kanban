function swapElementsOfArray (array, from, to) {
  return array.map((item, idx) => {
    if (idx === from) return array[to]
    if (idx === to) return array[from]
    return item
  })
}

function addInArray (array, element, position) {
  return [...array.slice(0, position), element, ...array.slice(position)]
}

function removeFromArray (array, position) {
  return array.reduce((acc, value, idx) => idx === position ? acc : [...acc, value], [])
}

export { swapElementsOfArray, addInArray, removeFromArray }
