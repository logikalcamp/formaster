import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    margin: 0 auto;
    max-width: 800px;
    padding: 2rem;
    direction: rtl;
    box-shadow: 0 0 6px rgba(0,0,0,0.6);
    h2{
        text-align:center;
        width:100%;
    }
    p{
        width:100%;
        text-align:right;
    }
`

const Main = ({state,Translator,back,setChange}) => {
    return (
        <Container>
            {
                state.map((x,index)=>{
                    return Translator(x,index,setChange)
                })
            }
            <button onClick={()=>back()}>חזור</button>
        </Container>
    )
}

export default Main;