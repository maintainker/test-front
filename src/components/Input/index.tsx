import React, { InputHTMLAttributes, useRef } from "react";
import styled from "styled-components";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: string;
  label?: string;
  onClear?: () => void;
  error?: string;
}

function Input({ label, name, onClear, error, ...props }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isValue = inputRef.current?.value && inputRef.current?.value !== "";

  return (
    <Container>
      <Label htmlFor={name}>
        {label && <InputLabel>{label}</InputLabel>}
        <InputContainer>
          <InputComp ref={inputRef} id={name} name={name} {...props} />
          {isValue && onClear && (
            <RemoveAll
              aria-label={`${label} 모두 제거`}
              type="button"
              onClick={onClear}
            />
          )}
        </InputContainer>
      </Label>
      {error && <Error>{error}</Error>}
    </Container>
  );
}

export default Input;
const Container = styled.div`
  margin-bottom: 12px;
`;
const Label = styled.label`
  display: block;
`;
const InputComp = styled.input`
  border: none;
  width: 100%;
  background: none;
`;
const InputContainer = styled.div`
  border: 1px solid #cdcdcd;
  padding: 8px 12px;
  position: relative;
  margin-top: 8px;
  background: #fff;
  border-radius: 4px;
`;
const InputLabel = styled.span`
  font-size: 16px;
`;
const RemoveAll = styled.button`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  border-radius: 50%;
  &::before {
    content: "";
    width: 66%;
    height: 1px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background: #000;
  }
  &::after {
    content: "";
    width: 66%;
    height: 1px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    background: #000;
  }
`;
const Error = styled.span`
  font-size: 0.8em;
  color: #ed4337;
`;
