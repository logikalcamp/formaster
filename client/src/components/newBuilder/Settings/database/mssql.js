import React,{useState} from 'react'
import styled from 'styled-components'
import {useRecoilState} from 'recoil'
import {ConnectionDetailsAtom} from '../../state'
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
        padding:.5rem;
        cursor:pointer;
        border-radius:6px;
        &:hover{
            background:#8cb5ff;
        }
    }
`

const MssqlPart = ({toggle}) => {
    const [server,setServer] = useState('')
    const [dbName,setDBName] = useState('')
    const [table,setTable] = useState('')
    const [config,setConfig] = useRecoilState(ConnectionDetailsAtom)

    return (
        <Container>
            <label>כתובת השרת</label>
            <input type="text" value={config.server} 
            onChange={(e)=>setConfig({
                ...config,
                server:e.target.value
            })}/>
            <label>שם הדטהבייס</label>
            <input type="text" value={config.db} 
            onChange={(e)=>setConfig({
                ...config,
                db:e.target.value
            })}/>
            <label>שם הטבלה</label>
            <input type="text" value={config.table} 
            onChange={(e)=>setConfig({
                ...config,
                table:e.target.value
            })}/>
            <button onClick={()=>{
                toggle()
                console.log(dbName,table)
            }}>
                שמירה
            </button>
        </Container>
    )
}

export default MssqlPart