import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:black;
    opacity:0.3;
    z-index:3;
`
const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    margin: auto;
    width: 600px;
    margin-top: -300px;
    height: 600px;
    margin-left: -300px;
    background: white;
    border-radius: 10px;
    z-index: 4;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    opacity: 1;

`

const SettingsCon = styled.div`
    position: absolute;
    width: 95.8%;
    left: 0;
    margin-left: 8px;
    background: white;
    align-items:center;
    display:flex;
    justify-content:center;
    transition:${props=>props.open ? " all .5s ease ":"all .1s ease"};
    margin-top:${props=>props.open ? "5rem":"0"};
    height:${props=>props.open ? "6rem":"0"};
    opacity:${props=>props.open ? "1":"0"};
    z-index:${props=>props.open ? "5":"-1"};
    border:${props=>props.open ? "1px solid red":"none"};
    border-top:none;
`

const Modal = ({children,clm}) => {
    return (
        <React.Fragment>
            <Background onClick={()=>clm()}/>
             <Container>{children}</Container> 
        </React.Fragment>
    )
}

export default Modal