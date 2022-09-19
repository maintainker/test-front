import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

type InputVarient = "primary" | "secondary";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  varient?: InputVarient;
}

function Button({ varient = "primary", children, ...props }: Props) {
  return (
    <ButtonComp varient={varient} {...props}>
      {children}
    </ButtonComp>
  );
}

export default Button;

const ButtonComp = styled.button<{ varient: InputVarient }>`
  background-color: ${(p) =>
    p.varient === "secondary" ? "#ffffff" : "#293462"};
  color: ${(p) => (p.varient === "secondary" ? "#111111" : "#ffffff")};
  padding: 8px 12px;
  font-size: 1.2em;
  width: 100%;
  border-radius: 4px;
  border: 1px solid ${(p) => (p.varient === "secondary" ? "#111111" : "none")};
`;
