import React,{useEffect,useState} from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width:50%;
    display:flex;
    flex-direction:column;
    margin:10px 0 15px 0;
`

const Table = styled.table`
    thead{
        tr{
            td,th{
                text-align: right;
                font-weight: 700;
                font-size: 12px;
            }
        }
    }
`

const Button = styled.button`
    padding: .5rem 2rem;
    width: 150px;
    margin-top: 1rem;
    border-radius: 6px;
    border: 1px solid #828282;
    outline: none;
    cursor:pointer;
    background:#e0e0e0;
    &:hover{
        background:#cacaca;
    }
`

const Main = ({part,index,action}) => {
    const [innerUse,setUse] = useState([])
    useEffect(() => {
        let arr = []
        let obj = {}
        part.columns.map((z,i)=>{
            obj[i] = ''
        })
        arr.push(obj)
        setUse(arr)
    }, [])

    useEffect(() => {
        if(part.keys != ''){
            action(part.keys,innerUse)
        }
        else{

            action(index,innerUse)
        }
    }, [innerUse])
    return(
        <Container>
            <label> {part.label}</label>
            <Table>
                <thead>
                    <tr>
                        {part.columns.map((x)=>{
                            return (
                                <th>
                                    {x.label}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        innerUse.map((z,ind)=>{
                            return (
                                <tr>
                                {part.columns.map((x,l)=>{
                                    return (
                                        <td>
                                            <input value={z[l]} onChange={(e)=>{
                                                let a = [...innerUse]
                                                a[ind][l] = e.target.value
                                                setUse(a)
                                            }} type="text"/>
                                        </td>
                                    )
                                })}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <Button onClick={()=>{
                let obj = {}
                part.columns.map((z,i)=>{
                    obj[i] = ''
                })
                let d = [...innerUse]
                d.push(obj)
                setUse(d)
            }}>
                הוספת שורה
            </Button>
        </Container>
    )
}

export default Main;