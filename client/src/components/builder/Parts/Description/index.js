import React, { useState } from "react";
import styled from "styled-components";
import DropDownSettings from "../../../utils/DropDownSettings";
import Textarea from "react-textarea-autosize";

const TextA = styled(Textarea)`
  resize: none;
  width: 100%;
  outline: none;
`;
const Setting = styled.div`
  position: relative;
  width: 100%;
  top: -8%;
  left: 10px;
  padding: 0 8px;
`;

const Con = styled.p`
  margin: 0;
  text-align: right;
  width: 100%;
  white-space: pre-wrap;
`;

const EditorCon = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = ({ open, part, clm, EditPart }) => {
  const [val, setValue] = useState("");
  return (
    <React.Fragment>
      <Con>{part.generate.value}</Con>
      <Setting>
        {open && (
          <DropDownSettings callback={clm}>
            <EditorCon>
              <TextA
                value={val}
                placeholder={"הזנת תיאור"}
                onChange={(e) => setValue(e.target.value)}
              />
              <div>
                <button
                  onClick={() => {
                    console.log(part);
                    // setLabel(val)
                    clm();
                    let d = { ...part };
                    d.generate.value = val;
                    EditPart(d.id, d);
                  }}
                >
                  שמירה
                </button>
                <button onClick={() => clm()}>ביטול</button>
              </div>
            </EditorCon>
          </DropDownSettings>
        )}
      </Setting>
    </React.Fragment>
  );
};

export default Description;

/*
    <Modal open={open}>
        <button onClick={()=>clm()}>close</button>
        <input value={label} type="text" onChange={(e)=>setLabel(e.target.value)}/>
    </Modal>
*/
