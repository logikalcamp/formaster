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
        name:'Header',
        label:'טקסט להזנה ככותרת',
        HtmlType:'h2',
        validation:'',
        required:false,
        // type:'item'
    },
    {
        icon:(<MdGamepad/>),
        name:'Line Breaker',
        label:'',
        HtmlType:'break',
        validation:'',
        required:false,
        // type:'item'
    },
    {
        icon:(<MdGamepad/>),
        name:'Dropdown',
        label:'',
        HtmlType:'dropdown',
        validation:'',
        required:false,
        // type:'item'
    },
    {
        icon:(<MdGamepad/>),
        name:'text-input',
        label:'טקסט להזנה ככותרת',
        HtmlType:'text',
        validation:'',
        required:false,
        // type:'item'
    },
    {
        icon:(<MdGamepad/>),
        name:'number-input',
        label:'טקסט להזנה ככותרת',
        HtmlType:'number',
        validation:'',
        required:false,
        // type:'item'
    },
    {
        icon:(<MdGamepad/>),
        name:'textarea',
        label:'טקסט להזנה ככותרת',
        HtmlType:'textarea',
        validation:'',
        required:false,
        // type:'item'
    },
    {
        icon:(<MdGamepad/>),
        name:'date',
        label:'טקסט להזנה ככותרת',
        HtmlType:'date',
        validation:'',
        required:false,
        // type:'item'
    }
]

const EmptyForm = []

const fullForm = [
    {
        name:'Header',
        label:'טקסט להזנה ככותרת',
        HtmlType:'h2',
        validation:'',
        required:false
    }
]





const Box = ({ name ,icon,prop ,nextId,addTo}) => {
  const item = { name, type: 'item'}
  const [{ opacity }, drag] = useDrag({
    item,
    end(item, monitor) {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        let alertMessage = ''
        const isDropAllowed =
          dropResult.allowedDropEffect === 'any' ||
          dropResult.allowedDropEffect === dropResult.dropEffect
        if (isDropAllowed) {
          const isCopyAction = dropResult.dropEffect === 'copy'
          const actionName = isCopyAction ? 'copied' : 'moved'
          alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`
        } else {
          alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`
        }
        alert(alertMessage)
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })
  return (
    <Tool ref={drag} style={{ opacity }}>
      {icon}
      {name}
      <button onClick={()=>{
        let d = {...prop}
        d.id = (nextId+1).toString()
        console.log(d)
        addTo(d)
      }}>
        add it
      </button>
    </Tool>
  )
}

const Toolbox = ({addTo,list}) => {
    return (
        <ToolBoxCon>
            {
                EditorLayout.map((x)=>{
                    return (
                        <Box nextId={list.length} prop={x} name={x.name} addTo={addTo} icon={x.icon}/>
                    )
                })
            }
        </ToolBoxCon>
    )
}




const initalState = [

]


const Builder = () => {
    const [formComponent,setForm] = useState([])
    const [state,setState] = useState([])


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
                <Header>header</Header>
                <Main>
                    <Full items={state} setItems={setState}/>
                    <Toolbox list={state} addTo={addTo}/>
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
`
const Tool = styled.div`
    display:flex;
    padding:1rem;
    border-radius:10px;
    margin:5px;
    border: 1px dashed gray;
    align-items:center;
    svg{
        margin-right:5px;
    }
`
const FormBodyCon = styled.div`
    display:flex;
    width:80%;
`