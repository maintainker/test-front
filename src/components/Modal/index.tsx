import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children?: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: Props) {
  return (
    <ModalContainer>
      <Dim onClick={onClose} />
      <Content>{children}</Content>
    </ModalContainer>
  );
}

export default Modal;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
`;

const Dim = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;
const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  min-height: 100px;
  min-width: 100px;
`;
