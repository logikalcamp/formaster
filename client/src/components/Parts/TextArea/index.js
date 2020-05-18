import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display:flex;
    flex-direction:column;
`
const Textarea = ({part,open}) => {
    return (
        <React.Fragment>
            <Container>
                {open && "open"}
                <label>{part.label}</label>
                <textarea/>
            </Container>
        </React.Fragment>
    )
}

export default Textarea