import React, { Component, useState } from "react"
import ReactDOM from "react-dom"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import styled from "styled-components"
import TextInput from "../Fields/TextInput"
import NumberInput from "../Fields/NumberInput"
import TextArea from "../Fields/TextArea"
import LineBreaker from "../Fields/Linebreaker"
import Header from "../Fields/Header"
import Select from "../Fields/Select"
import Description from "../Fields/Description"
import URLparamerter from "../Fields/UrlPart"
import GridComp from "../Fields/Grid"
import { MdEdit, MdDelete } from "react-icons/md"
import { useRecoilState } from "recoil"
import { builderPropsAtom } from ".."

const BoxProp = styled.div`
  display: flex;
  position: absolute;
  left: 10px;
  justify-content: flex-end;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 5px;
    cursor: pointer;
  }
`

const FormPart = ({ part, provided, snapshot, removeField, editField }) => {
  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)
  let a = <div>undefined</div>
  switch (part.name) {
    case "title":
      a = <Header open={open} editField={editField} clm={closeModal} part={part} />
      break
    case "break_line":
      a = <LineBreaker />
      break
    case "text":
      a = <TextInput open={open} clm={closeModal} editField={editField} part={part} />
      break
    case "number":
      a = <NumberInput open={open} clm={closeModal} editField={editField} part={part} />
      break
    case "textarea":
      a = <TextArea open={open} clm={closeModal} part={part} editField={editField} />
      break
    case "date":
      a = <input type="date" />
      break
    case "select":
      a = <Select open={open} clm={closeModal} part={part} editField={editField} />
      break
    case "description":
      a = <Description open={open} editField={editField} clm={closeModal} part={part} />
      break
    case "url":
      a = <URLparamerter open={open} clm={closeModal} editField={editField} part={part} />
      break
    case "grid":
      a = <GridComp open={open} clm={closeModal} editField={editField} part={part} />
  }
  // return a
  return (
    <div
      // className={open ? "pbof" : "abof"}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      {part.name != "break_line" ? (
        <BoxProp>
          <MdEdit onClick={() => setOpen(true)} />
          <MdDelete onClick={() => removeField(part.id)} />
        </BoxProp>
      ) : (
        <BoxProp>
          <MdDelete onClick={() => removeField(part.id)} />
        </BoxProp>
      )}
      {a}
    </div>
  )
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  marginBottom: "10px",
  padding: "1%",
  // margin: `0 0 ${grid}px 0`,
  direction: "rtl",
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",
  alignItems: "center",
  display: " flex",
  background: "white",
  flexDirection: "row-reverse",
  justifyContent: "space-between",
  zIndex: "2",
  /* max-height: 60px; */
  minHeight: "60px",
  // overflowY: 'overlay',
  // position: "absolute",
  // width: "96%",
  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "50%",
  position: "relative",
  margin: "0 auto",
})

const App = () => {
  const [builderProps, setBuilderProps] = useRecoilState(builderPropsAtom)

  const editField = (id, newVal) => {
    setBuilderProps({
      ...builderProps,
      fields: builderProps.fields.map((field) => {
        if (field.id === id) {
          field = newVal
        }
      }),
    })
  }

  const removeField = (id) => {
    setBuilderProps({
      ...builderProps,
      fields: builderProps.fields.filter((field) => field.id !== id),
    })
  }

  console.log(builderProps)

  const onDragEnd = (result) => {
    console.log(result)
    if (!result.destination) {
      return
    }

    const itemsArr = reorder(builderProps.fields, result.source.index, result.destination.index)

    setBuilderProps({ ...builderProps, fields: itemsArr })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
            {builderProps.fields.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <FormPart
                    removePart={removeField}
                    editField={editField}
                    provided={provided}
                    snapshot={snapshot}
                    part={item}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default App
