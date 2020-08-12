import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width:50%;
    display:flex;
    flex-direction:column;
    margin:10px 0 15px 0;
`

const Input = ({label,options,keys,index,action}) => {
    return (
        <Container>
            <label> {label}</label>
            <input 
            type="text"
            placeholder="להזנה"
            // value={}
            onChange={(e)=>{
                if(keys!=''){
                    action(keys,e.target.value)
                }else{
                    action(index,e.target.value)
                }
            }}/>
        </Container>
    )
}


export default Input