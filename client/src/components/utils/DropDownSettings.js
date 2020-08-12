import React,{useRef,useEffect} from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position:absolute;
    background:white;
    width:97%;
    left:-1.5%;
    padding:${props=>props.padding!=undefined ? props.padding+"rem" : "1rem"};
    ${'' /* border-radius:${props=>props.radius!=undefined ? props.radius + "px" : "20px"}; */}
    ${'' /* box-shadow:2px 2px 12px rgba(0,0,0,0.25); */}
    z-index:3;
    border: 1px red solid;
    margin-bottom: 1rem;
    border-top:0;

`

function useOutsideAlerter(ref,call) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                call()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


const Main = ({children,callback,radius,padding}) =>{
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef,()=>callback());
    return (
        <Container radius={radius} padding={padding} ref={wrapperRef}>
            {children}
        </Container>
    )
}

export default Main;