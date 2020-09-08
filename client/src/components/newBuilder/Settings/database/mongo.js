import React,{useState} from 'react'
import styled from 'styled-components'
import {ConnectionDetailsAtom} from '../../state'
import {useRecoilState} from 'recoil'
const Container = styled.div`
    display:flex;
    flex-direction:column;
    width:50%;
    margin:0 auto;
    padding:2rem;
    input{
        boredr:1px solid #828282;
        outline:none;
        border-radius:6px;
        padding:5px;
        direction:ltr;
    }
    button{
        background:#6098ff;
        margin:1rem 0;
        border:0;
        color:white;
        font-weight:bold;
        border-radius:6px;
        padding:.5rem;
        cursor:pointer;
        &:hover{
            background:#8cb5ff;
        }
    }
`

const MongoPart = ({toggle}) => {
    const [config,setConfig] = useRecoilState(ConnectionDetailsAtom)

    return (
        <Container>
            <label>שם הדטהבייס</label>
            <input type="text" value={config.db} 
            onChange={(e)=>setConfig({
                ...config,
                'db':e.target.value
            })}/>
            <label>שם הקולקצייה</label>
            <input type="text" value={config.table} 
            onChange={(e)=>{
                setConfig({
                    ...config,
                    'table':e.target.value
                })
            }
            }/>
            <button onClick={()=>{
                toggle()
            }}>
                שמירה
            </button>
        </Container>
    )
}

export default MongoPart;