import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { getForms } from '../../api'
import Preview from './Preview'
import Production from './Producation'
import Loader from './Loader'
import Input from './parts/TextInput'
import NumberInput from './parts/NumberInput'
import UrlParameter from './parts/UrlPart'
import Grid from './parts/Grid'
const Break = styled.span`
    display:block;
    width:100%;
    height:1px;
    background:#828282;
`

const MultipleCon = styled.div`
    width:50%;
    display:flex;
    flex-direction:column;
    margin:10px 0;
    label{
        font-size:16px;
        font-weight:bold;
        margin-bottom:5px;
    }
    select,option{
        font-size:16px;
        padding:5px;
    }
`

const Title = ({value}) => {
    return (
        <h2>
            {value}
        </h2>
    )
}

const Description = ({value}) => {
    return (
        <p>
            {value}
        </p>
    )
}

const BreakLine = () => {
    return (
        <Break/>
    )
}

const Multiple = ({label,options,keys,index,action}) => {
    return (
        <MultipleCon>
            <label> {label}</label>
            <select onChange={(e)=>{
                if(keys!=''){
                    action(keys,e.target.value)
                }else{
                    action(index,e.target.value)
                }
                }}>
                <option value={"undefined"}>יש לבחור</option>
                {options.map((opt)=>{
                    return (
                        <option value={opt.value}>{opt.label}</option>
                    )
                })}
            </select>
        </MultipleCon>
    )
}


const Translator = (part,index,action) => {
    let a = undefined
    // console.log(part)
    switch (part.type){
        case "title":
                a = <Title key={index} value={part.value}/>
            break;
        case "description":
                a = <Description key={index} value={part.value} />
            break;
        case "break_line":
                a = <BreakLine key={index}/>
            break;
        case "multiple":
                a = <Multiple key={index} label={part.label} keys={part.keys} options={part.options} index={index} action={action}/>
            break;
        case "text":
                a = <Input  key={index} label={part.label} keys={part.keys} options={part.options} index={index} action={action}/>
            break;
        case "number":
                a = <NumberInput key={index} label={part.label} keys={part.keys} options={part.options} index={index} action={action}/>
            break;
        case "url_parameter":
                a = <UrlParameter key={index} part={part} index={index} action={action}/>
            break;
        case "grid":
            a= <Grid key={index} part={part} index={index} action={action}/>
            break;
            }   
    return a;
}



const Main = ({data,back,match}) => {
    const [state,setState] = useState({})
    const [id,setId] = useState(match.params.id)
    const [loader,setLoader] = useState(true)
    const [preview,setPreview] = useState(false)
    const [form,setForm] = useState(data)
    const [fullDetails,setFullDetails] = useState({})

    useEffect(()=>{ 
        async function getState(id){
            let d = await getForms({formID:id})
            await console.log(d)
            if( await d.data.length != 0){
                await setFullDetails(d.data[0])
                await setForm(d.data[0].stracture)
                await setLoader(false)
            }
        }
        if(!data){
            setPreview(false)
            getState(id)
        }else{
            setPreview(true)
        }

    },[])

    const setChange = (key,value) => {
        let s = {...state}
        s[key] = value
        setState(s)
        // console.log(s)
    }

    return (
        <React.Fragment>
            {
                preview ? 
                <React.Fragment>
                    <Preview form={form} setChange={setChange} Translator={Translator} back={back}/>
                </React.Fragment>    
                :
                <React.Fragment>
                    {
                        loader ? 
                        <Loader/>
                        :
                        <Production form={form} id={id} state={state} setChange={setChange} Translator={Translator}  />
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Main;


/*
generateFormState = [
  {
    type:'title',
    value:'the title itself'
  },{
    type:'description',
    value:'the description istself'
  },{
    type:'break_line'
  },{
    type:'text',
    label:'the label'
  },{
    type:'number',
    label:'the label'
  },{
    type:'textarea',
    label:'the label'
  },{
    type:'date',
    label:'the label'
  },{
    type:'url_parameter',
    key:'the key of the url parameter'
  },{
    type:'multiple',
    label:'the label',
    option:[
      {
        value:'',
        label:''
      }
    ]
  }
]
*/