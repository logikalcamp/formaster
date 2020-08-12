import React, { useState } from "react";
import styled from "styled-components";
import DropDownSettings from "../../../utils/DropDownSettings";

const Setting = styled.div`
  position: relative;
  width: 100%;
  top: -8%;
  left: 10px;
  padding: 0 8px;
`;

const Container = styled.div`
  width: 50%;
  margin-left: 48%;
  display: flex;
  flex-direction: column;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-bottom: 10px;
`;

const TextInput = ({ open, part, clm, EditPart }) => {
  const [label, setLabel] = useState("");
  const [keyof, setKey] = useState("");
  // const [placeHolder,setPlaceHolder] = useState('טקסט לבחירתך')
  console.log(part);
  return (
    <React.Fragment>
      <Container>
        <label>{part.generate.label}</label>
        <input type="number" placeholder={"הזנת משהו"} />
      </Container>
      <Setting>
        {open && (
          <DropDownSettings callback={clm}>
            <Div>
              <label>שינוי כותרת</label>
              <input
                type="text"
                value={label}
                placeholder="הזנת כותרת "
                onChange={(e) => setLabel(e.target.value)}
              />
            </Div>
            <Div>
              <label>שם פרטמר</label>
              <input
                type="text"
                placeholder="הזנת שם פרמטר כפי שיופיע בDB"
                value={keyof}
                onChange={(e) => setKey(e.target.value)}
              />
            </Div>
            <button
              onClick={() => {
                console.log(part);
                // setLabel(val)
                clm();
                let d = { ...part };
                d.generate.keys = keyof;
                d.generate.label = label;
                // d.generate.options = options
                EditPart(d.id, d);
                // setReal(options)
              }}
            >
              שמירה
            </button>
            <button onClick={() => clm()}>ביטול</button>
          </DropDownSettings>
        )}
      </Setting>
    </React.Fragment>
  );
};

export default TextInput;
