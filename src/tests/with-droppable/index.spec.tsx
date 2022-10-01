import { render } from '@testing-library/react'
import { forwardRef } from 'react'
import { withDroppable } from '../../features/with-droppable'

describe('#withDroppable', () => {
  let subject: any
  beforeEach(() => {
    const ref = forwardRef<HTMLSpanElement>(() => <span />)
    const Droppable = withDroppable(ref)
    subject = render(
      <Droppable>
        <div id='children' />
      </Droppable>
    )
  })
  afterEach(() => {
    subject = undefined
  })
  it('returns a droppable component', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subject.container.querySelector('span > #children')).toBeInTheDocument()
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(subject.container.querySelector('span > #placeholder')).toBeInTheDocument()
  })
})
