import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider,useDrag ,useDrop} from 'react-dnd'
import {MdGamepad} from 'react-icons/md'
import InitialData from '../initial-data'
import Column from './column'
import {DragDropContext} from 'react-beautiful-dnd' 
import Full from '../Full'


const EditorLayout = [
    // {
    //     key: 'Dropdown',
    //     canHaveAnswer: true,
    //     name: 'Dropdown',
    //     icon: 'far fa-caret-square-down',
    //     label: 'Placeholder Label',
    //     field_name: 'dropdown_',
    //     options: [],
    // } from module
    {
        icon:(<MdGamepad/>),
        heb:'כותרת',
        name:'Header',
        label:'טקסט להזנה ככותרת',
        HtmlType:'h2',
        validation:'',
        required:false,
        // type:'item'
    },
    {
        icon:(<MdGamepad/>),
        heb:'קו מפריד',
        name:'Line Breaker',
        label:'',
        HtmlType:'break',
        validation:'',
        required:false,
        // type:'item'
    },
    {
        icon:(<MdGamepad/>),
        heb:'בחירה מרשימה',
        name:'Dropdown',
        label:'יש לבחור מהרשימה',
        HtmlType:'dropdown',
        validation:'',
        required:false,
        // type:'item'
    },
    {
        icon:(<MdGamepad/>),
        name:'text-input',
        heb:'קלט - טקסט',
        label:'טקסט להזנה ככותרת',
        HtmlType:'text',
        validation:'',
        required:false,
        // type:'item'
    },
    {
        icon:(<MdGamepad/>),
        name:'number-input',
        heb:'קלט - מספר',
        label:'טקסט להזנה ככותרת',
        HtmlType:'number',
        validation:'',
        required:false,
        // type:'item'
    },
    {
        icon:(<MdGamepad/>),
        name:'textarea',
        heb:'קלט ארוך',
        label:'טקסט להזנה ככותרת',
        HtmlType:'textarea',
        validation:'',
        required:false,
        // type:'item'
    },
    {
        icon:(<MdGamepad/>),
        name:'date',
        heb:'קלט - תאריך',
        label:'טקסט להזנה ככותרת',
        HtmlType:'date',
        validation:'',
        required:false,
        // type:'item'
    }
]

const Box = ({ name ,icon,prop ,nextId,addTo,setNext}) => {
  return (
    <Tool >
      
      <button onClick={()=>{
        let d = {...prop};
        d.id = (nextId).toString();
        setNext(nextId+1)
        addTo(d);
      }}>
        הוסף
      </button>
      {name}
    </Tool>
  )
}

const Toolbox = ({addTo,list,nextId,setNext}) => {
    return (
        <ToolBoxCon>
            {
                EditorLayout.map((x)=>{
                    return (
                        <Box nextId={nextId} setNext={setNext} prop={x} name={x.heb} addTo={addTo} icon={x.icon}/>
                    )
                })
            }
        </ToolBoxCon>
    )
}




const Builder = () => {
    const [formComponent,setForm] = useState([])
    const [state,setState] = useState([])
    const [nextId,setNext] = useState(0)
    useEffect(()=>{
      console.log(state)
    },[state])
    const addTo = (item)=>{
      let a = [...state]
      a.push(item)
      setState(a)
    }
    return (
        <DndProvider backend={HTML5Backend}>
            <BuilderCon>
                <Header>
                    הרכבת טפסים
                </Header>
                <Main>
                    <Full items={state} setItems={setState}/>
                    <Toolbox nextId={nextId} setNext={setNext} list={state} addTo={addTo}/>
                </Main>
            </BuilderCon>
        </DndProvider>
    )
}

export default Builder

const BuilderCon = styled.div`
`

const Header = styled.div`
    display:flex;
    position:sticky;
    z-index:2;
    text-align:center;
    padding:1rem 0;
    background:#6098ff;
    justify-content:center;
    font-size:26px;
    color:white;
    box-shadow:2px 2px 10px white;
    margin-bottom:2rem;
    font-weight:bold;
    top:0;
    left:0;
    right:0;
`
const Main = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-evenly;
`

const ToolBoxCon = styled.div`
    display:flex;
    flex-direction:column;
    margin-right:4rem;
`
const Tool = styled.div`
    display:flex;
    padding:1rem;
    border-radius:10px;
    margin:5px;
    border: 1px dashed gray;
    justify-content:space-between;
    svg{
        margin-right:5px;
    }
`
const FormBodyCon = styled.div`
    display:flex;
    width:80%;
`