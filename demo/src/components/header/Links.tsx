import { FC } from 'react'
import { Link as NavLink } from '@tanstack/react-location'
import { Link, styled } from '@mui/material'

export const Links: FC = () => {
  return (
    <>
      <Link
        component={() => (
          <NotUglyLocationLink to='/controlled' getActiveProps={getActiveProps} activeOptions={{ exact: true }}>
            Controlled
          </NotUglyLocationLink>
        )}
      />
      <Link
        component={() => (
          <NotUglyLocationLink to='/uncontrolled' getActiveProps={getActiveProps} activeOptions={{ exact: true }}>
            Uncontrolled
          </NotUglyLocationLink>
        )}
      />
      <Link
        component={() => (
          <NotUglyLocationLink to='/custom-elements' getActiveProps={getActiveProps} activeOptions={{ exact: true }}>
            Custom Elements
          </NotUglyLocationLink>
        )}
      />
    </>
  )
}

const NotUglyLocationLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  margin-right: 20px;
`

function getActiveProps() {
  return {
    style: {
      fontWeight: 'bold'
      // textDecoration: 'underline'
    }
  }
}
