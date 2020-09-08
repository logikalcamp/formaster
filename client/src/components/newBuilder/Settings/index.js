import React,{useState} from 'react'
import styled from 'styled-components'
import {MdSettings} from 'react-icons/md'
import {Modal} from '../../utils/newModal'
import {useModal} from '../../utils/newModal/useModal'
import Datebase from './database'
const Container = styled.div`
    position:fixed;
    top:50px;
    left:50px;
    svg{
        height:2rem;
        width:2rem;
        color:#828282;
        cursor:pointer;
    }
`

const SubContainer = styled.div`
    section{
        display:flex;
        direction:rtl;
        flex-direction:column;
    }
`

const TabHeader = styled.div`
    display: flex;
    direction: rtl;
    border-bottom: 1px solid #828282;
    margin-top: 1rem;
`

const Tab = styled.button`
    background:${props=>props.active ? "#e0e0e0":"transparent"};
    border:0;
    outline:none;
    cursor:pointer;
    padding:5px;
`

const Settings = () => {
    const {isShowing,toggle} = useModal()
    const [tab,setTab] = useState(0)
    return (
        <Container>
            <MdSettings onClick={()=>toggle()}/>
            <Modal isShowing={isShowing} toggle={toggle}>
                <SubContainer>
                    <TabHeader>
                        <Tab active={0==tab} onClick={()=>setTab(0)}>בסיס נתונים</Tab>
                        <Tab active={1==tab} onClick={()=>setTab(1)}>עיצוב</Tab>
                    </TabHeader>
                    {
                        tab == 0 &&
                        <Datebase toggle={toggle}/>
                    }
                    {
                        tab == 1 &&
                        <section>
                            Styling
                        </section>
                    }
                    
                </SubContainer>
            </Modal>
        </Container>
    )
}

export default Settings;