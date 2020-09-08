import React,{useState} from 'react'
import styled from 'styled-components'
import MongoPart from './mongo'
import MssqlPart from './mssql'
import {useRecoilState} from 'recoil'
import {ConnectionDetailsAtom} from '../../state'
const Container = styled.div`
    display:flex;
    direction:rtl;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const DbButton = styled.button`
    background:${props=>props.active ? "#8cb5ff":"#e0e0e0"};
    border:0;
    outline:none;
    cursor:pointer;
    padding:7px;
    &:hover{
        background:#e7e7e7;
    }
`

const Database = ({toggle}) => {
    const [db,setDB] = useRecoilState(ConnectionDetailsAtom)

    return (
        <Container>
            <h2>בסיס נתונים לטופס</h2>
            <label>יש לבחור סוג בסיס נתונים</label>
            <div>
                <DbButton active={1==db.service} onClick={()=>{
                    if(db.service!= 1 ){
                        setDB({
                            service:1,
                            server:'',
                            db:'',
                            table:''
                        })
                    }
                }}> 
                    MongoDB
                </DbButton>
                <DbButton active={2==db.service} onClick={()=>setDB({
                    service:2,
                    server:'',
                    db:'',
                    table:''
                })}>
                    MsSQL
                </DbButton>
            </div>
            {
                db.service != 0 &&
                (
                    db.service == 1 ?
                    <MongoPart toggle={toggle}/>
                    :
                    <MssqlPart toggle={toggle}/>
                ) 
            }
        </Container>
    )
}

export default Database