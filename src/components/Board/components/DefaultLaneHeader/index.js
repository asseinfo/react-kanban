import React, { useState } from 'react'
import styled from 'styled-components'
import CursorPointer from '../CursorPointer'

const LaneHeaderSkeleton = styled.div`
  padding-bottom: 10px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;

  span:nth-child(2) {
    cursor: pointer;
  }
`

const DefaultButton = styled.button`
  color: #333333;
  background-color: #ffffff;
  border-color: #cccccc;

  :hover,
  :focus,
  :active {
    background-color: #e6e6e6;
  }
`

const Input = styled.input`
  :focus {
    outline: none;
  }
`

function LaneTitle({ allowRenameLane, onClick, children: title }) {
  return allowRenameLane ? <CursorPointer onClick={onClick}>{title}</CursorPointer> : <span>{title}</span>
}

function useRenameMode(state) {
  const [renameMode, setRenameMode] = useState(state)

  function toggleRenameMode() {
    setRenameMode(!renameMode)
  }

  return [renameMode, toggleRenameMode]
}

export default function({ children: lane, allowRemoveLane, onLaneRemove, allowRenameLane, onLaneRename }) {
  const [renameMode, toggleRenameMode] = useRenameMode(false)
  const [titleInput, setTitleInput] = useState('')

  function handleRenameLane(event) {
    event.preventDefault()

    onLaneRename(lane, titleInput)
    toggleRenameMode()
  }

  function handleRenameMode() {
    setTitleInput(lane.title)
    toggleRenameMode()
  }

  return (
    <LaneHeaderSkeleton>
      {renameMode ? (
        <form onSubmit={handleRenameLane}>
          <span>
            <Input
              type='text'
              value={titleInput}
              onChange={({ target: { value } }) => setTitleInput(value)}
              autoFocus
            />
          </span>
          <span>
            <DefaultButton type='submit'>Rename</DefaultButton>
            <DefaultButton type='button' onClick={handleRenameMode}>
              Cancel
            </DefaultButton>
          </span>
        </form>
      ) : (
        <>
          <LaneTitle allowRenameLane={allowRenameLane} onClick={handleRenameMode}>
            {lane.title}
          </LaneTitle>
          {allowRemoveLane && <span onClick={() => onLaneRemove(lane)}>×</span>}
        </>
      )}
    </LaneHeaderSkeleton>
  )
}
