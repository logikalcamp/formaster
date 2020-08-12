import React,{useEffect,useState} from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width:50%;
    display:flex;
    flex-direction:column;
    margin:10px 0 15px 0;
`

function getVar(key){
    // console.log(key)
    let str = window.location.search
    let vars = str.split('&')
    // console.log(vars)
    let result = ''
    vars.map((x)=>{
        x = x.replace('?','')
        if(x.includes(key)){
            // console.log(x)
            x = x.replace(`${key}=`,'')
            result = x
        }
    })
    // console.log(result)
    return result
}

const Input = ({part,index,action}) => {
    const [val,setValue] = useState(getVar(part.key))
    // console.log(part)
    useEffect(()=>{
        if(val!=''){
            if(part.keys!=''){
                action(part.keys,val)
            }else{
                action(index,val)
            }
        }
    },[])

    return (
        <Container>
            <label> {part.label}</label>
            <input 
            type="text"
            placeholder="להזנה"
            value={val}
            onChange={(e)=>{

                if(part.keys!=''){
                    action(part.keys,e.target.value)
                }else{
                    action(index,e.target.value)
                }
            }}/>
        </Container>
    )
}


export default Input