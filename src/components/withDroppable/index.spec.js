import React from 'react'
import { render } from 'react-testing-library'
import withDroppable from './'

describe('#withDroppable', () => {
  let subject

  beforeEach(() => {
    const Droppable = withDroppable('span')
    subject = render(
      <Droppable>
        <div id='children' />
      </Droppable>
    )
  })

  afterEach(() => { subject = undefined })

  it('returns a droppable component', () => {
    expect(subject.container.querySelector('span > #children')).toBeInTheDocument()
    expect(subject.container.querySelector('span > #placeholder')).toBeInTheDocument()
  })
})
