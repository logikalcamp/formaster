import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display:flex;
    flex-direction:column;
`

const TextInput = ({part}) => {
    return (
        <Container>
          <label>{part.label}</label>
          <input type="text"/>
        </Container>
    )
}

export default TextInput;