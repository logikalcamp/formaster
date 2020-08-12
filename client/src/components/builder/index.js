import React, { useState, useEffect } from "react"
import styled from "styled-components"
import HTML5Backend from "react-dnd-html5-backend"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { MdGamepad } from "react-icons/md"
import InitialData from "../initial-data"
import Modal from "../utils/Modal"
// import Column from './column'
import { DragDropContext } from "react-beautiful-dnd"
import Full from "./Editor"
import { setForms } from "../../api"
import { useRecoilState, atom } from "recoil"
import Toolbox from "./Toolbox"

export const builderPropsAtom = atom({
  key: "builderPropsAtom",
  default: {
    fields: [],
    currentId: 0,
  },
})

const Builder = () => {
  const [isModal, setModal] = useState(false)
  const [formNewID, setFormID] = useState("")
  const [builderProps, setBuilderProps] = useRecoilState(builderPropsAtom)

  // const addTo = (newField) =>
  //   setBuilderProps({
  //     ...builderProps,
  //     fields: [...builderProps.fields, newField],
  //   });

  async function SaveToDb(data) {
    let d = await setForms(data)
    await console.log(d)
    if (await d.status) {
      await setFormID(d.data._id)
      await setModal(true)
    }
  }
  const finishIt = () => {
    let d = [...builderProps]
    let data = []
    d.map((part) => {
      data.push(part.generate)
    })
    console.log(data)
    let finalState = {}
    finalState.stracture = data
    finalState.user = {
      pn: "8110595",
      fullname: "aviram roisman",
      email: "aviram7168@gmail.com",
    }

    SaveToDb(finalState)

    // setFinal(data)
    // setView(true)
  }
  return (
    <React.Fragment>
      <Header>הרכבת טפסים</Header>
      <DndProvider backend={HTML5Backend}>
        <Main>
          <Full />
          <Toolbox />
        </Main>
        <FinalBut onClick={finishIt}>צור טופס</FinalBut>
      </DndProvider>
      {isModal && (
        <Modal
          clm={() => {
            window.location.href = window.location.href
            // setModalOpen(false)
          }}
        >
          <SuccessPopup>
            <h1>הטופס נוצר בהצלחה!</h1>
            <h3>ניתן למצוא את הטופס בקישורים הבאים</h3>
            <div>
              <a target="_blank" href={`/form/${formNewID}`}>
                מעבר לטופס
              </a>
              <a target="_blank" href={`/report/${formNewID}`}>
                מעבר לדוח
              </a>
            </div>
            <button
              onClick={() => {
                window.location.href = window.location.href
              }}
            >
              סגור
            </button>
          </SuccessPopup>
        </Modal>
      )}
    </React.Fragment>
  )
}

export default Builder

const Header = styled.div`
  display: flex;
  position: sticky;
  z-index: 2;
  text-align: center;
  padding: 1rem 0;
  background: #6098ff;
  justify-content: center;
  font-size: 26px;
  color: white;
  box-shadow: 2px 2px 10px white;
  margin-bottom: 2rem;
  font-weight: bold;
  top: 0;
  left: 0;
  right: 0;
`
const FinalBut = styled.button`
  width: 51%;
  margin: 2rem 30% 2rem 19%;
  padding: 0.5rem;
  border-radius: 10px;
`

const SuccessPopup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  direction: rtl;
  padding-top: 3rem;
  h1 {
    width: 100%;
    text-align: center;
    direction: rtl;
    color: #4f4f4f;
  }
  h3 {
    width: 100%;
    text-align: center;
    direction: rtl;
    color: #4f4f4f;
    margin-top: 0;
  }
  div {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    width: 80%;
    margin: 2rem 10% 0 10%;
    a {
      padding: 1rem;
      background: #6098ff;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      color: white;
      text-decoration: none;
      &:hover {
        background: #497bd6;
      }
    }
  }
  button {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    padding: 0.5rem 3rem;
    border: 0;
    border-radius: 6px;
    background: #e0e0e0;
    cursor: pointer;
    font-size: 16px;
    &:hover {
      background: #b7b7b7;
    }
  }
`

const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`
