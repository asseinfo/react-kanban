import React, { Fragment, useState } from 'react'
import styled from 'styled-components'

const SkeletonLaneHeader = styled.div`
  padding-left: 10px;
  padding-bottom: 10px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;

  span:nth-child(2) {
    cursor: pointer;
  }
`

const InvisibleInput = styled.input`

`

function useRenameMode (state) {
  const [renameMode, setRenameMode] = useState(state)

  function toggleRenameMode () {
    setRenameMode(!renameMode)
  }

  return [renameMode, toggleRenameMode]
}

export default function ({ children: lane, allowRemoveLane, onLaneRemove, allowRenameLane, onLaneRename }) {
  const [renameMode, toggleRenameMode] = useRenameMode(false)
  const [title, setTitle] = useState(lane.title)
  const [titleInput, setTitleInput] = useState('')

  function handleRenameLane (title) {
    onLaneRename(lane.id, title)
    setTitle(title)
    toggleRenameMode()
  }

  function handleRenameMode () {
    setTitleInput(title)
    toggleRenameMode()
  }

  return (
    <SkeletonLaneHeader>
      {allowRenameLane && renameMode ? (
        <Fragment>
          <span>
            <input type='text' value={titleInput} onChange={({ target: { value } }) => setTitleInput(value)} autoFocus />
          </span>
          <span>
            <button type='button' onClick={() => handleRenameLane(titleInput)}>Rename</button>
            <button type='button' onClick={handleRenameMode}>Cancel</button>
          </span>
        </Fragment>
      ) : (
        <Fragment>
          <span onClick={handleRenameMode}>
            {title}
          </span>
          {allowRemoveLane && <span onClick={() => onLaneRemove(lane)}>×</span>}
        </Fragment>
      )}
    </SkeletonLaneHeader>
  )
}
