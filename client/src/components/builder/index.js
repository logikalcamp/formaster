import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { MdGamepad } from "react-icons/md";
import InitialData from "../initial-data";
import Modal from "../utils/Modal";
// import Column from './column'
import { DragDropContext } from "react-beautiful-dnd";
import Full from "./Full";
import Generator from "../Generator";
import { setForms } from "../../api";
import { useRecoilState, atom } from "recoil";

const FinalBut = styled.button`
  width: 51%;
  margin: 2rem 30% 2rem 19%;
  padding: 0.5rem;
  border-radius: 10px;
`;

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
`;

export const builderPropsAtom = atom({
  key: "builderPropsAtom",
  default: {
    fields: [],
    currentId: 0,
  },
});

const EditorLayout = [
  // {
  //     key: 'Dropdown',
  //     canHaveAnswer: true,
  //     name: 'Dropdown',
  //     icon: 'far fa-caret-square-down',
  //     label: 'Placeholder Label',
  //     field_name: 'dropdown_',
  //     options: [],
  // } from module
  {
    icon: <MdGamepad />,
    heb: "כותרת",
    name: "title",
    label: "טקסט להזנה ככותרת",
    // HtmlType: "h2",
    validation: "",
    required: false,
    generate: {
      type: "title",
      value: "יש להזין את הכותרת",
    },
    // type:'item'
  },
  {
    icon: <MdGamepad />,
    heb: "קו מפריד",
    name: "break_line",
    label: "",
    // HtmlType: "break",
    validation: "",
    generate: {
      type: "break_line",
    },
    required: false,
    // type:'item'
  },
  {
    icon: <MdGamepad />,
    name: "description",
    heb: "תיאור",
    label: "טקסט להזנה ככותרת",
    // HtmlType: "p",
    validation: "",
    generate: {
      type: "description",
      value: "יש להזין את ההסבר",
    },
    required: false,
    // type:'item'
  },
  {
    icon: <MdGamepad />,
    name: "url",
    heb: "כותרת מURL",
    label: "טקסט להזנה ככותרת",
    HtmlType: "url",
    generate: {
      type: "url",
      label: "יש להזין את הכותרת",
      key: "the key of the url parameter",
    },
    validation: "",
    required: false,
    // type:'item'
  },
  {
    icon: <MdGamepad />,
    heb: "בחירה מרשימה",
    name: "select",
    label: "יש לבחור מהרשימה",
    // HtmlType: "select",
    validation: "",
    generate: {
      type: "select",
      label: "כותרת לבחירה מרשימה",
      options: [],
    },
    required: false,
  },
  {
    icon: <MdGamepad />,
    name: "text",
    heb: "קלט - טקסט",
    label: "טקסט להזנה ככותרת",
    // HtmlType: "text",
    validation: "",
    generate: {
      type: "text",
      label: "כותרת להזנת טקסט",
    },
    required: false,
    // type:'item'
  },
  {
    icon: <MdGamepad />,
    name: "number",
    heb: "קלט - מספר",
    label: "טקסט להזנה ככותרת",
    // HtmlType: "number",
    validation: "",
    generate: {
      type: "number",
      label: "כותרת להזנת מספר",
    },
    required: false,
    // type:'item'
  },
  // {
  //   icon: <MdGamepad />,
  //   name: "textarea",
  //   heb: "קלט ארוך",
  //   label: "טקסט להזנה ככותרת",
  //   HtmlType: "textarea",
  //   validation: "",
  //   required: false,
  //   generate: {
  //     type: "textarea",
  //     label: "aaa",
  //   },
  // },
  // {
  //     icon:(<MdGamepad/>),
  //     name:'date',
  //     heb:'קלט - תאריך',
  //     label:'טקסט להזנה ככותרת',
  //     HtmlType:'date',
  //     validation:'',
  //     required:false,
  //     generate: {
  //       type: "date",
  //       label: "date it",
  //     }
  //     // type:'item'
  // },
  {
    icon: <MdGamepad />,
    name: "grid",
    heb: "טבלה",
    label: "כותרת הטבלה",
    // HtmlType: "grid",
    validation: "",
    required: false,
    generate: {
      type: "grid",
      label: "כותרת הטבלה",
      columns: [],
    },
    // type:'item'
  },
];

const Box = ({ name, icon, prop }) => {
  const [builderProps, setBuilderProps] = useRecoilState(builderPropsAtom);
  return (
    <Tool>
      <button
        onClick={() => {
          setBuilderProps({
            ...builderProps,
            currentId: builderProps.currentId + 1,
            fields: [
              ...builderProps.fields,
              { ...prop, id: String(builderProps.currentId) },
            ],
          });
        }}
      >
        הוסף
      </button>
      {name}
    </Tool>
  );
};

const Toolbox = () => {
  return (
    <ToolBoxCon>
      {EditorLayout.map((x, i) => (
        <Box key={i} prop={x} name={x.heb} icon={x.icon} />
      ))}
    </ToolBoxCon>
  );
};

const Builder = () => {
  const [isModal, setModal] = useState(false);
  const [formNewID, setFormID] = useState("");
  const [builderProps, setBuilderProps] = useRecoilState(builderPropsAtom);

  // const addTo = (newField) =>
  //   setBuilderProps({
  //     ...builderProps,
  //     fields: [...builderProps.fields, newField],
  //   });

  async function SaveToDb(data) {
    let d = await setForms(data);
    await console.log(d);
    if (await d.status) {
      await setFormID(d.data._id);
      await setModal(true);
    }
  }
  const finishIt = () => {
    let d = [...builderProps];
    let data = [];
    d.map((part) => {
      data.push(part.generate);
    });
    console.log(data);
    let finalState = {};
    finalState.stracture = data;
    finalState.user = {
      pn: "8110595",
      fullname: "aviram roisman",
      email: "aviram7168@gmail.com",
    };

    SaveToDb(finalState);

    // setFinal(data)
    // setView(true)
  };
  return (
    <React.Fragment>
      <Header>הרכבת טפסים</Header>
      <DndProvider backend={HTML5Backend}>
        <BuilderCon>
          <Main>
            <Full />
            <Toolbox />
          </Main>
        </BuilderCon>
        <FinalBut onClick={finishIt}>צור טופס</FinalBut>
      </DndProvider>
      {isModal && (
        <Modal
          clm={() => {
            window.location.href = window.location.href;
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
                window.location.href = window.location.href;
              }}
            >
              סגור
            </button>
          </SuccessPopup>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Builder;

const BuilderCon = styled.div``;

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
`;
const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ToolBoxCon = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 4rem;
`;
const Tool = styled.div`
  display: flex;
  padding: 1rem;
  border-radius: 10px;
  margin: 5px;
  border: 1px dashed gray;
  direction: rtl;
  flex-direction: row-reverse;
  justify-content: space-between;
  svg {
    margin-right: 5px;
  }
`;
const FormBodyCon = styled.div`
  display: flex;
  width: 80%;
`;
