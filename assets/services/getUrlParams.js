import { when } from '@services/utils'

function isBoolean (value) {
  return value === 'true' || value === 'false'
}

function not (fn) {
  return function (value) {
    return !fn(value)
  }
}

export default function () {
  const url = new URL(window.location.href)
  var params = {}

  for (const p of url.searchParams.entries()) {
    const value = p[1]

    when(value, isBoolean)(value => { params[p[0]] = Boolean(value) })
    when(value, not(isBoolean))(value => { params[p[0]] = value })
  }

  return params
}
