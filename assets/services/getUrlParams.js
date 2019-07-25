export default function () {
  const url = new URL(window.location.href)
  var params = {}

  for (const p of url.searchParams.entries()) {
    const value = p[1]

    if (value === 'true' || value === 'false') {
      params[p[0]] = Boolean(value)
    } else {
      params[p[0]] = value
    }
  }

  return params
}
