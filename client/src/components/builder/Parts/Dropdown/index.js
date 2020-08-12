import React,{useState} from 'react'
import styled from 'styled-components'
import DropDownSettings from '../../../utils/DropDownSettings'
import Table from '../../../utils/TableWithOpt'

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


const DropDown = ({open,part,clm,EditPart}) => {
    const [realOpt,setReal] = useState([])
    const [options,setOptions] = useState([])
    const [labe,setLabel] = useState('')
    const [keyof,setKey] = useState('')
    // const [newArr,setArr] = useState(arr)
    return(
        <React.Fragment>
            <Container>
                <label>{part.formCase.label}</label>
                <select>
                    {
                        realOpt.map((x)=>{
                            return (
                                <option value={x.value}>{x.label}</option>
                            )
                        })
                    }
                </select>
            </Container>
            <Setting>
                {
                    open &&
                    <DropDownSettings callback={clm}>
                        <div>
                            <Div>
                                <label>כותרת שתופיע מעל התא</label>
                                <input type="text" placeholder="יש להזין את הכותרת" value={labe} onChange={(e)=>setLabel(e.target.value)}/>
                            </Div>
                            <Div>
                                <label>שם הפרמטר שיופיע בדטה בייס</label>
                                <input type="text" placeholder="הזן שם פרמטר" value={keyof} onChange={(e)=>setKey(e.target.value)}/>
                            </Div>
                            <Table arr={options} setArr={setOptions} />
                           
                            <button onClick={()=>{
                                console.log(part)
                                // setLabel(val)
                                clm()
                                let d = {...part}
                                d.formCase.keys = keyof
                                d.formCase.label = labe
                                d.formCase.options = options
                                EditPart(d.id,d)
                                setReal(options)
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

export default DropDown;
