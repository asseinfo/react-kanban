import { render } from '@testing-library/react'
import withDroppable from './'

// @ts-expect-error TS(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('#withDroppable', () => {
  let subject

  // @ts-expect-error TS(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(() => {
    const Droppable = withDroppable('span')
    subject = render(
      // @ts-expect-error TS(2749) FIXME: 'Droppable' refers to a value, but is being used a... Remove this comment to see the full error message
      <Droppable>
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'div'.
        <div id='children' />
      </Droppable>
    )
  })

  // @ts-expect-error TS(2304) FIXME: Cannot find name 'afterEach'.
  afterEach(() => {
    subject = undefined
  })

  // @ts-expect-error TS(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('returns a droppable component', () => {
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
    expect(subject.container.querySelector('span > #children')).toBeInTheDocument()
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'expect'.
    expect(subject.container.querySelector('span > #placeholder')).toBeInTheDocument()
  })
})
