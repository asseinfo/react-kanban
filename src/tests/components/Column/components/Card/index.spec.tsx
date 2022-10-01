import { render } from '@testing-library/react'
// @ts-expect-error TS(2305): Module '"react-beautiful-dnd"' has no exported mem... Remove this comment to see the full error message
import { callbacks } from 'react-beautiful-dnd'
import Card from '@/components/Board/components/DefaultCard'

// @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<Card />', () => {
  let subject

  const card = {
    id: 1,
    title: 'Card title',
    description: 'Card content',
  }

  // @ts-expect-error TS(2304): Cannot find name 'jest'.
  const defaultCard = jest.fn(() => <div>Card title</div>)

  function mount({ children = card, ...otherProps } = {}) {
    subject = render(
      <Card renderCard={defaultCard} {...otherProps}>
        {children}
      </Card>
    )
    return subject
  }

  function reset() {
    subject = undefined
    defaultCard.mockClear()
  }

  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(reset)

  // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('renders the specified card', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(mount().queryByText('Card title')).toBeInTheDocument()
  })

  // @ts-expect-error TS(2593): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when the card is being dragging', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      callbacks.isDragging(true)
      mount()
    })
    // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
    afterEach(() => {
      callbacks.isDragging(false)
    })

    // @ts-expect-error TS(2593): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('calls the "renderCard" prop passing the dragging value', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(defaultCard).toHaveBeenCalledTimes(1)
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(defaultCard).toHaveBeenCalledWith(true)
    })
  })
})
