import React,{useEffect,useState,useRef} from 'react'
import RemWrapper from './RemWrapper'
import styled from 'styled-components'
import Draggable from 'react-draggable';
import {DnD} from '../../utils/SVG'

import {useRecoilState} from 'recoil'
import {ComponentsAtom} from '../state'

const Container = styled.div`
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
`

const Box = styled.div`

    direction:rtl;

    background: #fff;
    position:absolute;
    border: 1px solid transparent;
    border-radius: 6px;
    width: ${props=>props.dimensions.width +"px"};
    height:${props=>props.dimensions.height +"px"};
    margin: 10px;
    padding: 5px;
    padding-right:22px;
    padding-left:22px;
    overflow-x:hidden !important;
    float: left;
    resize: horizontal;
    text-align:right;
    z-index:2;
    svg{
        display:none;
    }
    &:active{
        border:1px dashed #828282;
        svg{
            display:block;
        }
        ::-webkit-scrollbar {
            width: 8px;
        }
    }
    &:hover{
        border:1px dashed #828282;
        svg{
            display:block;
        }
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-resizer{
            border-width: 8px;
            border-style: solid;
            border-color:  transparent transparent #E0E0E0 #E0E0E0;
        }
    }
    ::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: transparent; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: transparent; 
    }
    ::-webkit-resizer{
        display:none;
    }

    strong{
        position: absolute;
        top: 10px;
        right: -5px;
    }
    div{
        display: flex;
        flex-direction: column;
        width:100%;
        input{
            width:100%;
        }
    }
    
`

const InputLabel = styled.input`
    border:none;
    outline:none !important;
    font-size:16px;
    font-weight:bold;
    width:100%;
    padding:5px 0;
    color:#4f4f4f;
    text-align:right;
    direction:rtl;
    &::placeholder{
        color:#9597A1 !important;
    }
`

const Line = styled.span`
    position:absolute;
    background:transparent;
    display:block;
    border-top:${props=>props.dir == "sides" ? "0 dotted black" : "1px dotted black"};
    border-right:${props=>props.dir == "sides" ? "1px dotted black" : " 0 dotted black"};
    width:${props=>props.dir == "sides" ? "20px":"1000px"};
    height:${props=>props.dir == "sides" ? "1000px":"20px"};
    right:${props=>props.left + "px"};
    top:${props=>props.top + "px"};
    opacity:0.5;
    z-index:3;
`

const Element = ({containerPosition,state,handleDrop,setElement,index,showLines,setShowLines,setChange}) => {
    const [activeDrags,setActiveDrags] = useState(0)
    // const [dimensions,setDimensions] = useState({width:200,height:50})
    const [elementPosition,setElementPosition] = useState({x:0,y:0})
    const [deltaPosition,setDeltaPosition] = useState({x:0,y:0})
    const [controlledPosition,setControlledPosition] = useState({x:-400,y:200})
    const [itSelf,setItSelf] = useState(false)
    const [title,setTitle] = useState('')
    const elementRef = useRef()
    const [components,setComponents] = useRecoilState(ComponentsAtom)


    const [borders,setBorders] = useState([0,0,0,0])

    const handleDrag = (e, ui) => {
        const {x, y} = elementPosition;
        // setElement(elementRef)
        // console.log(elementPosition)
        // console.log(ui.deltaX)
        setElementPosition({x:x+ui.deltaX,y:y+ui.deltaY})
        // setChange(index,'position',{x:x+ui.deltaX,y:y+ui.deltaY})
    };

    const onStart = () => {
        setActiveDrags(activeDrags+1)
        setElement(index)
        console.log("is it self" , itSelf)
        console.log("show lines",showLines)
    }
    
    const onStop = () => {
        // console.log("stopppeeeddd")
        setActiveDrags(activeDrags-1)
        setItSelf(false)
        setShowLines(true)

        // console.log("show it all")
        setChange(index,'position',{x:elementPosition.x,y:elementPosition.y})
    }

    const adjustXPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = controlledPosition;
        setControlledPosition({x: x - 10, y});
    };

    const adjustYPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = controlledPosition;
        setControlledPosition({x, y:y-10});
    };

    const onControlledDrag = (e, position) => {
        const {x, y} = position;
        setControlledPosition({x,y})
    };
    
    const onControlledDragStop = (e, position) => {
        onControlledDrag(e, position);
        onStop();
    };

    useEffect(()=>{
        let newBorders = [
            elementPosition.y,//top
            -1 * elementPosition.x +50, //right
            elementPosition.y + state.dimensions.height +10,//bottom
            -1 * (elementPosition.x - state.dimensions.width)+90  //left
        ]
        setBorders(newBorders)
    },[state.dimensions,elementPosition])

    const dragHandlers = {onStart: onStart, onStop:onStop};

    useEffect(()=>{

        if(containerPosition.x!=0){
            console.log("damn")
            let thisPosition = elementRef.current.getBoundingClientRect()
            setElementPosition({x:containerPosition.right-thisPosition.right,y:thisPosition.y-containerPosition.y})        
            setChange(index,'position',{x:containerPosition.right-thisPosition.right,y:thisPosition.y-containerPosition.y})
        }
    },[containerPosition])
    


    const Resized = () => {
        let {width,height} =  elementRef.current.style;
        if(width == ''){
            width = "200px"
        }
        if(height == ''){
            height = "50px"
        }
        width = width.replace("px","")
        height = height.replace("px","")
        // setDimensions({width:+width,height:+height})
        setChange(index,'dimensions',{width:+width,height:+height})
    }

    return (
        <>
        <Draggable
         onDrag={handleDrag} handle="strong" bounds="parent" {...dragHandlers}>
            <Box id={index} onClick={()=>Resized()} dimensions={state.dimensions} ref={elementRef} className="no-cursor" >
                <div>
                    <InputLabel type="text" placeholder="כותרת שתופיע מעל התא" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    <strong
                    onMouseDown={()=>{
                        setItSelf(true)
                        setShowLines(true)
                        }} 
                    onMouseUp={()=>{
                        setItSelf(false)
                        setShowLines(false)
                        console.log("work?")
                        }}
                    className="cursor"><DnD/></strong>
                    <input type="text" 
                    // value={showLines.toString() + " | " + itSelf.toString() + " | " + index}
                    // value={`${elementPosition.x +" | " +elementPosition.y}`} 
                    disabled={true}/>
                </div>
            </Box>
        </Draggable>
        
        {
            showLines && !itSelf && 
            <>
                <Line
                onMouseUp={()=>{
                    handleDrop("sides",borders[3]-11)
                    setItSelf(false)
                    setShowLines(false)
                }}
                 dir={"sides"} height={1000} left={borders[3]-18} top={0} width={1} />
                <Line  
                onMouseUp={()=>{
                    handleDrop("sides",borders[1]-11)
                    setItSelf(false)
                    setShowLines(false)
                }}
                dir={"sides"} height={1000} left={borders[1]-11} top={0} width={1}/>
                <Line  
                onMouseUp={()=>{
                    handleDrop("updown",borders[0])
                    setItSelf(false)
                    setShowLines(false)
                }}
                dir={"updown"} top={borders[0]} width={800} left={0} height={1}/>
                <Line  
                onMouseUp={()=>{
                    handleDrop("updown",borders[2])
                    setItSelf(false)
                    setShowLines(false)
                }}
                dir={"updown"} top={borders[2]} width={800} left={0} height={1}/>
            </>
        }
        </>
    )
}

export default Element;
/*{elementPosition.x + " | " + elementPosition.y}*/
/*  */