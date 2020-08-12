import React,{useState} from 'react'
import styled from 'styled-components'
import DropDownSettings from '../../../utils/DropDownSettings'
import Table from '../../../utils/TableOfGrid'

const Container = styled.div`
    width: 50%;
    margin-left: 48%;
    display:flex;
    flex-direction:column;
`


const Setting = styled.div`
    position: relative;
    width: 100%;
    top: -8%;
    left:10px;
    padding:0 8px;
`
const Div = styled.div`
    display:flex;
    flex-direction:column;
    width:30%;
    margin-bottom:10px;
`


const TableS = styled.table`
    thead{
        tr{
            th{
                text-align:right
            }
        }
    }
`

const Main = ({open,part,clm,EditPart}) => {
    const [realOpt,setReal] = useState([])
    const [options,setOptions] = useState([])
    const [labe,setLabel] = useState('')
    const [keyof,setKey] = useState('')
    // const [newArr,setArr] = useState(arr)
    return(
        <React.Fragment>
            <Container>
                <label>{part.formCase.label}</label>
                <TableS>
                    <thead>
                        <tr>
                            {realOpt.map((x)=>{
                                return <th>{x.label}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {realOpt.map((a)=>{
                                return <td><input type="text"/></td>
                            })}
                        </tr>
                    </tbody>
                </TableS>
            </Container>
            <Setting>
                {
                    open &&
                    <DropDownSettings callback={clm}>
                        <div>
                            <Div>
                                <label>הכותרת שתוצג מעל השדה</label>
                                <input type="text" placeholder="הזנת כותרת " value={labe} onChange={(e)=>setLabel(e.target.value)}/>
                            </Div>
                            <Div>
                                <label>שם הפרמטר</label>
                                <input type="text" placeholder="הזנת שם פרמטר כפי שיופיע בDB" value={keyof} onChange={(e)=>setKey(e.target.value)}/>
                            </Div>
                            <Table arr={options} setArr={setOptions} />
                            <button onClick={()=>{
                                console.log(part)
                                // setLabel(val)
                                clm()
                                let d = {...part}
                                d.formCase.keys = keyof
                                d.formCase.label = labe
                                d.formCase.columns = options
                                EditPart(d.id,d)
                                // let newVal = [...options]
                                let newVal = JSON.parse(JSON.stringify(options))
                                setReal(newVal)
                            }}>
                                שמירה
                            </button>
                            <button onClick={()=>clm()}>ביטול</button>
                        </div>
                    </DropDownSettings>
                }
            </Setting>
        </React.Fragment>
    )
}

export default Main;
