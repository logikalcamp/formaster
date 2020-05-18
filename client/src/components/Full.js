import React, { Component,useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components'
import TextInput from './Parts/TextInput'
import NumberInput from './Parts/NumberInput'
import TextArea from './Parts/TextArea'
import LineBreaker from './Parts/Linebreaker'
import {MdEdit,MdDelete} from 'react-icons/md'
import _ from 'lodash'

const BoxProp = styled.div`
  display:flex;
  justify-content:flex-end;
  svg{
    width:1.5rem;
    height:1.5rem;
    margin:0 5px;
    cursor:pointer;
  }
`

const FormPart = ({part,provided,snapshot,removePart}) => {
    const [open,setOpen] = useState(false)
    let a = <div>undefined</div>
    switch(part.HtmlType){
        case "h2":
            a = <h2 style={{margin:"0"}}>{part.label}</h2>
            break;
        case "break":
            a = <LineBreaker/>
            break;
        case "text":
            a = <TextInput open={open} part={part} />
            break;
        case "number":
            a = <NumberInput open={open} part={part}/>
            break;
        case "textarea":
            a = <TextArea open={open} part={part}/>
            break;
        case "date":
            a = <input type="date"/>
            break;
    }
    // return a
    return(
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
            )}
        >
          {part.HtmlType != "break" ?
            <BoxProp>
              <MdEdit onClick={()=>setOpen(true)}/>
              <MdDelete onClick={()=>removePart(part.id)}/>
            </BoxProp>
          :
            <BoxProp>
              <MdDelete onClick={()=>removePart(part.id)}/>
            </BoxProp>
          }
            {a}
        </div>
    )
}



// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  direction:'rtl',
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "50%",
  margin:"0 auto"
});


const App = ({items,setItems}) => {

    const removePart = (id) =>{
      let a = [...items]
      let d = _.filter(a,function(o){return o.id != id})
      setItems(d)
    }

    const onDragEnd = (result) =>{
        console.log(result)
        if (!result.destination) {
          return;
        }
    
        const itemsArr = reorder(
        items,
          result.source.index,
          result.destination.index
        );
    
        setItems(itemsArr)
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <FormPart 
                        removePart={removePart}
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

export default App;