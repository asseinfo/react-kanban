import { MouseEventHandler, useRef } from 'react'

import { when } from '@services/utils'
import { Card } from '@/types'

export const CardForm = function <TCard = Card>({ onConfirm, onCancel }: Props<TCard>) {
  const inputCardTitle = useRef()
  const inputCardDescription = useRef()

  function addCard(event: any) {
    event.preventDefault()
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    when(inputCardTitle.current.value)((value: any) => {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      onConfirm({ title: value, description: inputCardDescription.current.value })
    })
  }

  return (
    <div className='react-kanban-card-adder-form'>
      <form onSubmit={addCard}>
        <input
          className='react-kanban-card-adder-form__title'
          name='title'
          autoFocus
          defaultValue='Title'
          // @ts-expect-error TS(2322): Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message
          ref={inputCardTitle}
        />
        <input
          className='react-kanban-card-adder-form__description'
          name='description'
          defaultValue='Description'
          // @ts-expect-error TS(2322): Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message
          ref={inputCardDescription}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
          <button className='react-kanban-card-adder-form__button' type='submit'>
            Add
          </button>
          <button className='react-kanban-card-adder-form__button' type='button' onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

interface Props<TCard = Card> {
  onConfirm: (card: TCard) => void
  onCancel: MouseEventHandler<HTMLButtonElement>
}
