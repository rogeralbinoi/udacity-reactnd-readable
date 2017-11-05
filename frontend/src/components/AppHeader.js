import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.h1`
  background: #673ab7;
  color: #fff;
  padding: 0.5em;
`

const AppHeader = ({ children }) => <Wrapper size="huge">{children}</Wrapper>

export default AppHeader
