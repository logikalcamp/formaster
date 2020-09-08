import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'

const ModalBlurBackground = styled.div`
    position: fixed;
    z-index: 120;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-filter: blur(1px);
    -moz-filter: blur(1px);
    -o-filter: blur(1px);
    -ms-filter: blur(1px);
    background-color: gray;
    filter: blur(1px);
    filter: opacity(0.7);

`
const ModalContent = styled.div`
    border-radius: 3px;
    max-width: 500px;
    width: 1000px;
    position: fixed;
    left: 50%;
    overflow-y: auto !important;
    top: 50%;
    max-height: 70%;
    padding: 0 1rem 1rem 1rem;
    z-index: 121;
    background-color: white;
    transform: translate(-50%, -50%);

`

export const Modal = ({
  isShowing,
  toggle,
  children,
  isDismissable = true,
}) => {
  useEffect(() => {
    let body = document.getElementsByTagName("BODY")[0];
    if (isShowing) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [isShowing]);
  
  return isShowing
    ? ReactDOM.createPortal(
        <>
          <ModalBlurBackground
            onClick={() => (isDismissable ? toggle() : undefined)}
          />
          <ModalContent>{children}</ModalContent>
        </>,
        document.body
      )
    : null;
};

