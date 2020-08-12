import React from "react"
import { Box } from "./Box"
import { MdGamepad } from "react-icons/md"
import styled from "styled-components"

const fieldsAvailable = [
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
]

const Toolbox = () => {
  return (
    <Container>
      {fieldsAvailable.map((field, i) => (
        <Box key={i} prop={field} name={field.heb} icon={field.icon} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 4rem;
`

export default Toolbox
