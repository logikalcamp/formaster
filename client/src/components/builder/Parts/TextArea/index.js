import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 50%;
    margin-left: 48%;
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