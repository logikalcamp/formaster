import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    text-align:center;
    margin-top:4rem;
    flex-direction:column;
    h2{
        width:100%;
        text-align:center;
        font-size:25px;
        color:#4f4f4f;
    }
`

const Main = () => {
    return(
        <Container>
            <h2>מכינים את הטופס עבורך</h2>
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </Container>
    )
}

export default Main;