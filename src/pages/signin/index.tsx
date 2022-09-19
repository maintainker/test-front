import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import apiInstant from "../../shared/api";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await apiInstant.post("/user/login", {
        userId,
        password,
      });
      const today = Math.floor(new Date().valueOf() / 1000);
      const user = {
        access: data["access"],
        refresh: data["refresh"],
        accessExpire: today + 1800,
        refreshExpire: today + 3600 * 24 * 2,
      };
      localStorage.setItem("user", JSON.stringify(user));
      const { data: userData } = await apiInstant.get("/user");
      localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/home");
    } catch (error: any) {
      alert(error?.response?.data || "로그인에 실패하였습니다.");
    }
    return;
  };
  return (
    <Container>
      <h1>로그인</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          name="userId"
          label="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          onClear={() => setUserId("")}
        />
        <Input
          name="password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClear={() => setPassword("")}
        />
        <Button style={{ marginTop: "20px" }}>로그인</Button>
      </Form>
      <Button
        onClick={() => navigate("/sign-up")}
        style={{ marginTop: "20px" }}
      >
        회원가입
      </Button>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 24px 20px;
  text-align: center;
`;
const Form = styled.form`
  text-align: left;
  margin-top: 20px;
  min-width: 300px;
  width: calc(100% - 50px);
`;
