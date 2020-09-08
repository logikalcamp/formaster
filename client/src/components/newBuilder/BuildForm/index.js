import React,{useState,useRef,useEffect} from 'react'
import RemWrapper from './RemWrapper'
import styled from 'styled-components'
import Draggable from 'react-draggable';
import Element from './Element'
const Container = styled.div`
    display:flex;
    flex-direction:column;
    .cursor-x{
        cursor: ew-resize;
    }
    .cursor-y{
        cursor: ns-resize;
    }
    .react-draggable{
        cursor: move;
    }
    .no-cursor{
        cursor: auto;
    }

    .cursor{
        cursor:move;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
    h1{
        text-align:center;
    }
`

const Box = styled.div`
    background: #fff;
    border: 1px solid #999;
    border-radius: 3px;
    width: 200px;
    height: 50px;
    margin: 10px;
    padding: 10px;
    direction:rtl;
    overflow-x:hidden !important;
    float: right;


    ::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
`


const TitleInput = styled.input`
    border:0;
    outline:0;
    font-size:42px;
    margin:1rem auto;
    direction:rtl;
    text-align:center;
    width:100%;
`



const Builder = ({components,setChange}) => {
    const [containerPosition,setContainerPosition] = useState({x:0,y:0})
    const [showLines,setShowLines] = useState(false)
    const [elementMoved,setElement] = useState(null)
    const [title,setTitle] = useState('')
    const ContainerRef = useRef()

    useEffect(()=>{
        let container = ContainerRef.current.getBoundingClientRect()
        setContainerPosition(container)
    },[])

    const handleDrop = (type,pos) => {
        let d = [...components]
        let {x,y} = d[elementMoved].position
        if(type == "sides"){
            document.getElementById(elementMoved).style.transform = `translate(${-pos+18}px,${y-21}px)`
        }
        else{
            document.getElementById(elementMoved).style.transform = `translate(${x-29}px,${pos-21}px)`
        }
        setShowLines(false)
    }

    return (
        <Container>
            <TitleInput type="text" value={title} placeholder="כותרת לטופס" onChange={(e)=>{
                setTitle(e.target.value)
                }}/>
            <Box 
            ref={ContainerRef} style={{height: '500px', width: '800px', position: 'relative', overflow: 'auto', padding: '0'}}>
                <div style={{height: '1000px',direction:'rtl', width: '780px', padding: '10px'}}>
                    {components.map((component,index)=>{
                        return (
                            <Element handleDrop={handleDrop} setChange={setChange} setElement={setElement} setShowLines={setShowLines} showLines={showLines} containerPosition={containerPosition} state={component} index={index}/>
                        )
                    })}
                </div>
                
            </Box>
        </Container>
    )
}

export default Builder