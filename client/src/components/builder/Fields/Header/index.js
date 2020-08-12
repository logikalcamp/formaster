import React, { useState } from "react"
import styled from "styled-components"
import DropDownSettings from "../../../utils/DropDownSettings"

const Header = ({ open, part, clm, editField }) => {
  const [val, setValue] = useState("")
  return (
    <React.Fragment>
      <h2 style={{ margin: 0 }}>{part.generate.value}</h2>
      <Setting>
        {open && (
          <DropDownSettings callback={clm}>
            <div>
              <Div>
                <label>הכותרת שתוצג בטופס</label>
                <input
                  value={val}
                  placeholder={"יש להזין כותרת"}
                  type="text"
                  onChange={(e) => setValue(e.target.value)}
                />
              </Div>

              <button
                onClick={() => {
                  console.log(part)
                  // setLabel(val)
                  clm()
                  let d = { ...part }
                  d.generate.value = val
                  editField(d.id, d)
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

export default Header

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
