import React from "react"
import styled from "styled-components"
import { useRecoilState } from "recoil"
import { builderPropsAtom } from ".."

export const Box = ({ name, icon, prop }) => {
  const [builderProps, setBuilderProps] = useRecoilState(builderPropsAtom)
  return (
    <Container>
      <button
        onClick={() => {
          setBuilderProps({
            ...builderProps,
            fields: [...builderProps.fields, { ...prop, id: String(builderProps.currentId) }],
            currentId: builderProps.currentId + 1,
          })
        }}
      >
        הוסף
      </button>
      {name}
    </Container>
  )
}

const Container = styled.div`
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
`
