import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display:flex;
    flex-direction:column;
`

const NumberInput = ({open,part}) => {
    return (
        <Container>
          <label>{part.label}</label>
          <input type="number"/>
        </Container>
    )
}

export default NumberInput;