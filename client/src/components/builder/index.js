import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider,useDrag ,useDrop} from 'react-dnd'
import {MdGamepad} from 'react-icons/md'
import InitialData from '../initial-data'
import Modal from '../utils/Modal'
// import Column from './column'
import {DragDropContext} from 'react-beautiful-dnd' 
import Full from './Full'
import Generator from '../Generator'
import {setForms} from '../../api'

const FinalBut = styled.button`
    width: 51%;
    margin: 2rem 30% 2rem 19%;
    padding: .5rem;
    border-radius: 10px;
`

const SuccessPopup = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    direciton:rtl;
    padding-top:3rem;
    h1{
        width:100%;
        text-align:center;
        direction:rtl;
        color:#4f4f4f;
    }
    h3{
        width:100%;
        text-align:center;
        direction:rtl;
        color:#4f4f4f;
        margin-top:0;
    }
    div{
        display:flex;
        flex-direction:row-reverse;
        justify-content:space-around;
        width:80%;
        margin:2rem 10% 0 10%;
        a{
            padding:1rem;
            background:#6098ff;
            border:none;
            border-radius:6px;
            font-weight:bold;
            color:white;
            text-decoration:none;
            &:hover{
                background:#497bd6;
            }
        }
    }
    button{
        position: absolute;
        bottom: 2rem;
        left: 2rem;
        padding: .5rem 3rem;
        border:0;
        border-radius:6px;
        background:#e0e0e0;
        cursor:pointer;
        font-size:16px;
        &:hover{
            background:#b7b7b7;
        }
    }
`

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
    }, {
        icon:(<MdGamepad/>),
        name:'description',
        heb:'תיאור',
        label:'טקסט להזנה ככותרת',
        HtmlType:'p',
        validation:'',
        required:false,
        // type:'item'
    },
    {
        icon:(<MdGamepad/>),
        name:'url',
        heb:'כותרת מURL',
        label:'טקסט להזנה ככותרת',
        HtmlType:'url_var',
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
    // {
    //     icon:(<MdGamepad/>),
    //     name:'textarea',
    //     heb:'קלט ארוך',
    //     label:'טקסט להזנה ככותרת',
    //     HtmlType:'textarea',
    //     validation:'',
    //     required:false,
    //     // type:'item'
    // },
    // {
    //     icon:(<MdGamepad/>),
    //     name:'date',
    //     heb:'קלט - תאריך',
    //     label:'טקסט להזנה ככותרת',
    //     HtmlType:'date',
    //     validation:'',
    //     required:false,
    //     // type:'item'
    // },
    {
        icon:(<MdGamepad/>),
        name:'grid',
        heb:'טבלה',
        label:'כותרת הטבלה',
        HtmlType:'grid',
        validation:'',
        required:false,
        // type:'item'
    }
]



const Box = ({ name ,icon,prop ,nextId,addTo,setNext,form,setForm}) => {
  return (
    <Tool >
      
      <button onClick={()=>{
        let d = {...prop};
        d.id = (nextId).toString();
        setNext(nextId+1)
        switch(d.HtmlType){
            case "h2":
                d.formCase = {
                    type:'title',
                    value:'יש להזין את הכותרת'
                }
                break;
            case 'url_var':
                d.formCase={
                    type:'url_parameter',
                    label:'יש להזין את הכותרת',
                    key:'the key of the url parameter'
                }
                break;
            case "p":
                d.formCase = {
                    type:'description',
                    value:'יש להזין את ההסבר'
                }
                break;
            case "break":
                d.formCase = {
                    type:'break_line',
                }
                break;
            case "text":
                d.formCase = {
                    type:'text',
                    label:'כותרת להזנת טקסט'
                }
                break;
            case "number":
                d.formCase = {
                    type:'number',
                    label:'כותרת להזנת מספר'
                }
                break;
            case "textarea":
                d.formCase = {
                    type:'textarea',
                    label:'aaa'
                }
                break;
            case "date":
                d.formCase = {
                    type:'date',
                    label:'date it'
                }
                break;
            case "dropdown":
                d.formCase = {
                    type:'multiple',
                    label:'כותרת לבחירה מרשימה',
                    options:[]
                }
                break;
            case "grid":
                d.formCase = {
                    type:'grid',
                    label:'כותרת הטבלה',
                    columns:[],
                    rows:[]
                }
        }

        addTo(d);
      }}>
        הוסף
      </button>
      {name}
    </Tool>
  )
}

const Toolbox = ({addTo,list,nextId,setNext,form,setForm}) => {
    return (
        <ToolBoxCon>
            {
                EditorLayout.map((x)=>{
                    return (
                        <Box nextId={nextId} form={form} setForm={setForm} setNext={setNext} prop={x} name={x.heb} addTo={addTo} icon={x.icon}/>
                    )
                })
            }
        </ToolBoxCon>
    )
}




const Builder = () => {
    const [state,setState] = useState([])
    const [form,setForm] = useState([])
    const [nextId,setNext] = useState(0)
    const [final,setFinal] = useState([])
    const [isModal,setModal] = useState(false)
    const [formNewID,setFormID] = useState('')
    const [generatorView,setView] = useState(false)
    
    useEffect(()=>{
      console.log(state)
    },[state])

    const addTo = (item)=>{
      let a = [...state]
      a.push(item)
      setState(a)
    }

    async function SaveToDb(data){
        let d = await setForms(data)
        await console.log(d)
        if(await d.status){
            await setFormID(d.data._id)
            await setModal(true)
        }
    }
    const finishIt = () => {
        let d = [...state]
        let data = []
        d.map((part)=>{
            data.push(part.formCase)
        })
        console.log(data)
        let finalState = {}
        finalState.stracture = data
        finalState.user = {
            pn:"8110595",
            fullname:"aviram roisman",
            email:"aviram7168@gmail.com"
        }
        
        SaveToDb(finalState)
        
        
        // setFinal(data)
        // setView(true)
    }
    return (
        <React.Fragment>
                <Header>
                    הרכבת טפסים
                </Header>
            {
                generatorView ? 
                <Generator data={final} back={()=>setView(false)}/>
                :
                <DndProvider backend={HTML5Backend}>
                    <BuilderCon>
                        <Main>
                            <Full items={state} setItems={setState} form={form} setForm={setForm}/>
                            <Toolbox nextId={nextId} setNext={setNext} list={state} addTo={addTo} form={form} setForm={setForm}/>
                        </Main>
                    </BuilderCon>
                    <FinalBut onClick={()=>finishIt()}>
                        צור טופס
                    </FinalBut>
                </DndProvider>
            }
            {
                isModal &&
                <Modal clm={()=>{
                    window.location.href = window.location.href
                    // setModalOpen(false)
                    }}
                    >
                    <SuccessPopup>
                        <h1>הטופס נוצר בהצלחה!</h1>
                        <h3>ניתן למצוא את הטופס בקישורים הבאים</h3>
                        <div>
                            <a target="_blank" href={`/form/${formNewID}`}>מעבר לטופס</a>
                            <a target="_blank" href={`/report/${formNewID}`}>מעבר לדוח</a>
                        </div>
                        <button onClick={()=>{window.location.href = window.location.href}}>סגור</button>
                    </SuccessPopup>
                </Modal>
            }
        </React.Fragment>
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
    direction:rtl;
    flex-direction:row-reverse;
    justify-content:space-between;
    svg{
        margin-right:5px;
    }
`
const FormBodyCon = styled.div`
    display:flex;
    width:80%;
`