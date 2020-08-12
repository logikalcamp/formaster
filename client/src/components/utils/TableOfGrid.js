import React from 'react'
import styled from 'styled-components'

const Table = styled.table`
    thead{
        tr{
            th{
                text-align:right
            }
        }
    }
`

const Main = ({arr,setArr}) => {
    console.log("start",arr)
    return (
        <React.Fragment>
            <Table>
                <thead>
                    <tr>
                        {
                            arr.map((z,i)=>{
                                return (
                                    <th>
                                        עמודה {i+1}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    {arr.map((x,i)=>{
                        return (
                            <td><input type="text" placeholder="הזנת שם העמודה" value={x.label} onChange={(e)=>{
                                let d = [...arr]
                                d[i].label = e.target.value
                                setArr(d)
                            }} /></td>
                        )   
                    })}
                    </tr>   
                    <tr>
                         {arr.map((x,i)=>{
                            return (
                                <td>
                                    <button onClick={()=>{
                                        let d = [...arr]
                                        d.splice(i,1)
                                        setArr(d)
                                    }}>
                                    מחק 
                                    </button>
                                </td>
                                )   
                            })}
                    </tr>
                </tbody>
            </Table>
            <button onClick={()=>{
                let d = [...arr]
                d.push({label:''})
                setArr(d)
            }}>
                הוסף עמודה
            </button>
        </React.Fragment>
    )
}

export default Main;