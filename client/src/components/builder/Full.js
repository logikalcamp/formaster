import React, { Component,useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components'
import TextInput from './Parts/TextInput'
import NumberInput from './Parts/NumberInput'
import TextArea from './Parts/TextArea'
import LineBreaker from './Parts/Linebreaker'
import Header from './Parts/Header'
import Dropdown from './Parts/Dropdown'
import Description from './Parts/Description'
import URLparamerter from './Parts/UrlPart'
import GridComp from './Parts/Grid'
import {MdEdit,MdDelete} from 'react-icons/md'
import _ from 'lodash'

const BoxProp = styled.div`
  display:flex;
  position:absolute;
  left:10px;
  justify-content:flex-end;
  svg{
    width:1.5rem;
    height:1.5rem;
    margin:0 5px;
    cursor:pointer;
  }
`

const FormPart = ({part,provided,snapshot,removePart,EditPart}) => {
    const [open,setOpen] = useState(false)
    const closeModal = () => setOpen(false)
    let a = <div>undefined</div>
    switch(part.HtmlType){
        case "h2":
            a = <Header open={open} EditPart={EditPart} clm={closeModal} part={part} />
            break;
        case "break":
            a = <LineBreaker/>
            break;
        case "text":
            a = <TextInput open={open} clm={closeModal} EditPart={EditPart} part={part} />
            break;
        case "number":
            a = <NumberInput open={open} clm={closeModal} EditPart={EditPart} part={part}/>
            break;
        case "textarea":
            a = <TextArea open={open} clm={closeModal} part={part} EditPart={EditPart}/>
            break;
        case "date":
            a = <input type="date"/>
            break;
        case "dropdown":
            a = <Dropdown open={open} clm={closeModal} part={part} EditPart={EditPart}/>
            break;
        case "p":
            a = <Description open={open} EditPart={EditPart} clm={closeModal} part={part} />
            break;
        case "url_var":
            a = <URLparamerter open={open} clm={closeModal} EditPart={EditPart} part={part} />
            break;
        case "grid":
            a = <GridComp open={open} clm={closeModal} EditPart={EditPart} part={part} />
      }
    // return a
    return(
        <div
            className={open ? "pbof":"abof"}
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
  marginBottom:"10px",
  padding: "1%" ,
  // margin: `0 0 ${grid}px 0`,
  direction:'rtl',
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",
  alignItems: "center",
  display:" flex",
  background: "white",
  flexDirection: "row-reverse",
  justifyContent: "space-between",
  zIndex:"2",
      /* max-height: 60px; */
   minHeight: "60px",
    // overflowY: 'overlay',
  // position: "absolute",
  // width: "96%",
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "50%",
  position:'relative',
  margin:"0 auto"
});


const App = ({items,setItems,form,setForm}) => {

    // const AddState = (val) => {
    //   let d = [...state]
    //   d.push(val)
    //   setState(d)
    // }

    // const EditState = (val,index) => {
    //   let d = [...state]
    //   d[index] = val
    //   setState(d)
    // } 

    const EditPart = (id,newVal) => {
      let a = [...items]
      a.map((z)=>{
        if(z.id == id){
          z = newVal
        }
      })
      setItems(a)
    }
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
                        EditPart={EditPart}
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



/*
generateFormState = [
  {
    type:'title',
    value:'the title itself'
  },{
    type:'description',
    value:'the description istself'
  },{
    type:'break_line'
  },{
    type:'text',
    label:'the label'
  },{
    type:'number',
    label:'the label'
  },{
    type:'textarea',
    label:'the label'
  },{
    type:'date',
    label:'the label'
  },{
    type:'url_parameter',
    key:'the key of the url parameter'
  },{
    type:'multiple',
    label:'the label',
    option:[
      {
        value:'',
        label:''
      }
    ]
  }
]
*/