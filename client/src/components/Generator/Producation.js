import React,{Fragment,useState,useEffect} from 'react'
import styled from 'styled-components'
import {setAnswer} from '../../api'
import moment from 'moment'
import Modal from '../utils/Modal'


const Container = styled.div`
    width:100%;
    z-index:1;
    height:100vh;
    position:fixed;
    background:-webkit-linear-gradient(90deg,#eaeaea 66%,#6098ff 66%)
`


const SuccessPopup = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    direciton:rtl;
    padding-top:5rem;
    h1{
        width:100%;
        text-align:center;
        direction:rtl;
        color:#4f4f4f;
    }
    h3{
        width:100%;
        text-align:center;
        direction:rtl;
        color:#4f4f4f;
        margin-top:0;
    }
    div{
        display:flex;
        flex-direction:row-reverse;
        justify-content:space-around;
        width:80%;
        margin:2rem 10% 0 10%;
        a{
            padding:1rem;
            background:#6098ff;
            border:none;
            border-radius:6px;
            font-weight:bold;
            color:white;
            text-decoration:none;
            &:hover{
                background:#497bd6;
            }
        }
    }
    button{
        position: absolute;
        bottom: 2rem;
        left: 2rem;
        padding: .5rem 3rem;
        border:0;
        border-radius:6px;
        background:#e0e0e0;
        cursor:pointer;
        font-size:16px;
        &:hover{
            background:#b7b7b7;
        }
    }
`


const ContainerProd = styled.div`
    margin: 3rem auto;
    max-width: 800px;
    padding: 2rem;
    background:white;
    direction: rtl;
    z-index:2;
    box-shadow: 0 0 6px rgba(0,0,0,0.2);
    position:absolute;
    border-radius:6px;
    top: 40%;
    left: 50%;
    min-height:600px;
    margin-left: -400px;
    width: 800px;
    margin-top:-300px;
    h2{
        text-align:center;
        width:100%;
    }
    p{
        width:100%;
        text-align:right;
    }
`

const Submit = styled.div`
    border: 0;
    position: absolute;
    bottom: 2rem;
    left:2rem;
    padding: 1rem 2rem;
    background: #2d81ff;
    color:white;
    font-weight:bold;
    border-radius: 10px;
    width: 100px;
    text-align: center;
    cursor:pointer;
    &:hover{
        background:#5c9dff;
    }
`


const Main = ({form,setChange,Translator,state,id}) => {
    const [user,setUser] = useState({
        fullname:'aviram roisman',
        email:'aviram7168@gmail.com',
        pn:'8110595'
    })
    const [isModalOpen,setModalOpen] = useState(false)
    const SaveForm = () =>{
        async function Saveit(){
            let newState = state
            newState.formID = id
            newState.timestamp = moment().format()
            newState.fullname = user.fullname
            newState.email = user.email
            newState.pn = user.pn
            

            let d = await setAnswer(newState)
            await console.log(d)
            if(await d.status == 200){
                setModalOpen(true)
            }
        }
        Saveit()
    }

    useEffect(()=>{
        console.log(window.location)
    },[])

    return (
        <Fragment>
            <Container/>
            <ContainerProd>
                {
                    form.map((x,index)=>{
                        return Translator(x,index,setChange)
                    })
                }
                <Submit onClick={()=>SaveForm()}>שלח טופס</Submit>
            </ContainerProd>
            {
                isModalOpen &&
                <Modal clm={()=>{
                    window.location.href = window.location.href
                    // setModalOpen(false)
                    }}
                    >
                     <SuccessPopup>
                        <h1>הטופס נשלח בהצלחה!</h1>
                        <h3>בלחיצה על סגור - הטופס יתאפס</h3>
                        <button onClick={()=>{window.location.href = window.location.href}}>סגור</button>
                    </SuccessPopup>
                </Modal>
            }
        </Fragment>
    )

}

export default Main;