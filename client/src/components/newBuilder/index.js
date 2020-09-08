import React,{Fragment,useState} from 'react'
import styled from 'styled-components'
import Menu from './Menu'
import BuildForm from './BuildForm'
import Preview from './Preview'
import Settings from './Settings'
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
import {ComponentsAtom} from './state'


const Container = styled.div`
    display:flex;
    width:100%;
    justify-content:space-around;
    flex-direction:row-reverse;
`


const Builder = () => {
    const [components,setComponents] = useRecoilState(ComponentsAtom)

    const setChange = (index,key,val) => {
        let newObj = {...components[index]}
        newObj[key] = val
        const newArray = [
            ...components.map((item,i)=>{
                if(i == index) return newObj
                return item
            })
        ]
        setComponents(newArray)
    }



    return (
        <Container>
            <Menu/>
            <BuildForm setChange={setChange} components={components}/>
            <Preview/>
            <Settings />
        </Container>
    )
}

export default Builder