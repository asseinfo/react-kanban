export default function ({ children: card, dragging, allowRemoveCard, onCardRemove }) {
  return (
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'div'.
    <div className={`react-kanban-card ${dragging ? 'react-kanban-card--dragging' : ''}`}>
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'span'.
      <span>
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'div'.
        <div className='react-kanban-card__title'>
          // @ts-expect-error TS(2304) FIXME: Cannot find name 'span'.
          <span>{card.title}</span>
          // @ts-expect-error TS(2304) FIXME: Cannot find name 'allowRemoveCard'.
          {allowRemoveCard && (
            // @ts-expect-error TS(2304) FIXME: Cannot find name 'span'.
            <span style={{ cursor: 'pointer' }} onClick={() => onCardRemove(card)}>
              ×
            </span>
          )}
        </div>
      </span>
      // @ts-expect-error TS(2304) FIXME: Cannot find name 'div'.
      <div className='react-kanban-card__description'>{card.description}</div>
    </div>
  )
}
