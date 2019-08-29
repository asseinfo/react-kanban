import React from 'react'
import { render } from '@testing-library/react'
import CardSkeleton from './'

describe('<CardSkeleton />', () => {
  it("renders a card's skeleton", () => {
    expect(render(<CardSkeleton />).container.querySelector('div')).toBeInTheDocument()
  })
})
