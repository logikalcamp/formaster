import React,{useState} from 'react'
import styled from 'styled-components'
import Modal from '../../utils/Modal'

const Container = styled.div`

`

const Header = ({open,part,clm}) => {
    const [label,setLabel] = useState(part.label)
    return (
        <React.Fragment>
            <h2>{label}</h2> 
            <Modal open={open}>
                <button onClick={()=>clm()}>close</button>
                <input value={label} type="text" onChange={(e)=>setLabel(e.target.value)}/>
            </Modal>
        </React.Fragment>
    )
}

export default Header