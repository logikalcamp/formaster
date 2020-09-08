import React from 'react'
import styled from 'styled-components'
import {Generator} from 'hatal-utils'
import 'hatal-utils/dist/index.css'

const Background = styled.div`
    width:100%;
    ${'' /* z-index:1; */}
    height:100vh;
    position:fixed;
    background:-webkit-linear-gradient(90deg,#eaeaea 66%,#6098ff 66%)
`

const Main = ({match}) => {
    return (
        <React.Fragment>
            {/* <Background /> */}
            <Generator id={match.params.id}/>
        </React.Fragment>
    )
}

export default Main;