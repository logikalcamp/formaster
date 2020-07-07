import React,{useState} from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display:flex;
    flex-direction:column;
`

const DropDown = ({open,part}) => {
    const [options,setOptions] = useState(['1','2','3'])
    return(
        <Container>
            <label>{part.label}</label>
            <select>
                {
                    options.map((x)=>{
                        return (
                            <option value={x}>{x}</option>
                        )
                    })
                }
            </select>
        </Container>
    )
}

export default DropDown;
