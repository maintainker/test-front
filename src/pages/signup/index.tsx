import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import apiInstant from "../../shared/api";

function Signup() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassord] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const { status } = await apiInstant.post("/", { name, userId, password });
      if (status !== 201) {
        alert("회원가입에 실패하였습니다.");
        return;
      }
      alert("회원가입 성공. 로그인 페이지로 이동합니다.");
      navigate("/");
    } catch (error: any) {
      alert(error?.response?.data || "회원가입에 실패하였습니다.");
    }
  };
  return (
    <Container>
      <h1>회원가입</h1>
      <Input
        name="name"
        label="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        name="userId"
        label="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <Input
        name="password"
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassord(e.target.value)}
      />
      <Button onClick={handleSubmit}>회원가입</Button>
    </Container>
  );
}

export default Signup;
const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px 24px;
  min-width: 300px;
  h1 {
    text-align: center;
  }
`;
