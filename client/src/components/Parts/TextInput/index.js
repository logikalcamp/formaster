import React,{useState} from 'react'
import styled from 'styled-components'
import Modal from '../../utils/Modal'

const Container = styled.div`
    display:flex;
    flex-direction:column;
`

const TextInput = ({open,part,clm}) => {
    const [label,setLabel] = useState(part.label)
    const [placeHolder,setPlaceHolder] = useState('טקסט לבחירתך')
    return (
        <React.Fragment>
            <Container>
                <label>{label}</label>
                <input type="text" placeholder={placeHolder}/>
            </Container>
            <Modal open={open}>
                <button onClick={()=>clm()}>close</button>
                <div>
                    <label>שינוי כותרת</label>
                    <input type="text" value={label} onChange={(e)=>setLabel(e.target.value)}/>
                </div>
                <div>
                    <label>שינוי טקסט בתוך התיבה</label>
                    <input type="text" value={placeHolder} onChange={(e)=>setPlaceHolder(e.target.value)}/>
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default TextInput;