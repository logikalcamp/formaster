import React, { useState } from "react"
import styled from "styled-components"
import DropDownSettings from "../../../utils/DropDownSettings"
import Table from "../../../utils/TableWithOpt"

const Select = ({ open, part, clm, editField }) => {
  const [realOpt, setReal] = useState([])
  const [options, setOptions] = useState([])
  const [labe, setLabel] = useState("")
  const [name, setName] = useState("")
  // const [newArr,setArr] = useState(arr)
  return (
    <React.Fragment>
      <Container>
        <label>{part.generate.label}</label>
        <select>
          {realOpt.map((x) => {
            return <option value={x.value}>{x.label}</option>
          })}
        </select>
      </Container>
      <Setting>
        {open && (
          <DropDownSettings callback={clm}>
            <div>
              <Div>
                <label>כותרת שתופיע מעל התא</label>
                <input
                  type="text"
                  placeholder="יש להזין את הכותרת"
                  value={labe}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </Div>
              <Div>
                <label>שם הפרמטר שיופיע בדטה בייס</label>
                <input type="text" placeholder="הזן שם פרמטר" value={name} onChange={(e) => setName(e.target.value)} />
              </Div>
              <Table arr={options} setArr={setOptions} />

              <button
                onClick={() => {
                  console.log(part)
                  // setLabel(val)
                  clm()
                  let d = { ...part }
                  d.generate.name = name
                  d.generate.label = labe
                  d.generate.options = options
                  editField(d.id, d)
                  setReal(options)
                }}
              >
                שמירה
              </button>
              <button onClick={() => clm()}>ביטול</button>
            </div>
          </DropDownSettings>
        )}
      </Setting>
    </React.Fragment>
  )
}

const Container = styled.div`
  width: 50%;
  margin-left: 48%;
  display: flex;
  flex-direction: column;
`

const Setting = styled.div`
  position: relative;
  width: 100%;
  top: -8%;
  left: 10px;
  padding: 0 8px;
`
const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-bottom: 10px;
`

export default Select
