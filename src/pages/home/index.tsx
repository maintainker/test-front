import { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import apiInstant from "../../shared/api";

function Home() {
  const jsonUser = localStorage.getItem("userData") as string;
  const user = JSON.parse(jsonUser);
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(String(user.age));
  const [hobby, setHobby] = useState(user.hobby);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };
  const handleChangeHobby = (idx: number, value: string) => {
    const newHobby = [...hobby];
    newHobby[idx] = value;
    setHobby(newHobby);
  };
  const handleDeleteHobby = (idx: number) => {
    setHobby(hobby.filter((_: any, hobbyIdx: number) => hobbyIdx !== idx));
  };
  const handleAddHobby = () => {
    if (hobby.length === 10) {
      alert("취미는 10개까지만 가능합니다.");
      return;
    }
    setHobby([...hobby, ""]);
  };
  const handleEditCloseModal = () => {
    const isChangeName = user.name !== name;
    const isChangeAge = user.age !== age;
    const isChangeHobby = user.hobby.join(",") !== hobby.join(",");
    if (isChangeName || isChangeAge || isChangeHobby) {
      const confirm = window.confirm("변경사항이 있습니다. 종료하시겠습니까?");
      if (!confirm) return;
    }
    setName(user.name);
    setAge(String(user.age));
    setHobby(user.hobby);
    setIsEditModalOpen(false);
  };
  const handlePasswordCloseModal = () => {
    // return
    setIsPasswordModalOpen(false);
  };
  const handeEditSubmit = async () => {
    try {
      if (name === "") {
        alert("이름은 필수 사항입니다.");
        return;
      }
      if (isNaN(Number(age))) {
        alert("나이는 숫자만 입력가능합니다.");
        return;
      }
      if (!hobby.every((el: string) => el !== "")) {
        alert("취미에 비어있는 칸이 있습니다.");
        return;
      }
      const { status } = await apiInstant.patch("/user", {
        name,
        age: Number(),
        hobby,
      });
      if (status !== 201) {
        alert("회원정보 수정이 되지 않았습니다.");
        return;
      }
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name,
          age: Number(age),
          hobby,
        })
      );
      setIsEditModalOpen(false);
    } catch (error: any) {
      alert(error?.response?.data || "변경에 실패하였습니다.");
    }
  };
  const handlePasswordSubmit = async () => {
    /** 비밀번호 수정 로직
     * post /user/password
     * body
     * password:string - 기존 비밃번호
     * newPassword: string- 새 비밀번호
     *
     * 성공시 status 201 data 없음
     */
  };
  return (
    <>
      <UserContainer>
        <ul>
          <li>이름 : {name}</li>
          <li>나이 : {age}</li>
          <li>취미 : {hobby.map((el: string) => `${el}, `)}</li>
        </ul>
        <Button onClick={handleEdit} style={{ marginTop: "12px" }}>
          수정하기
        </Button>
        <Button
          onClick={() => setIsPasswordModalOpen(true)}
          style={{ marginTop: "12px" }}
        >
          비밀번호 변경
        </Button>
        <Button style={{ marginTop: "12px" }}>로그아웃</Button>
      </UserContainer>
      {isEditModalOpen && (
        <Modal onClose={handleEditCloseModal}>
          <ModalContainer>
            <h1>정보 변경하기</h1>
            <Input
              name="name"
              label="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="age"
              label="나이"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <div className="hobby-title">
              <span>취미</span>
              <button onClick={handleAddHobby}>추가</button>
            </div>
            {hobby.map((el: string, idx: number) => (
              <HobbyList key={`hobby-${idx}`}>
                <div style={{ width: "calc(100% - 40px)" }}>
                  <Input
                    name={`hobby-${idx}`}
                    value={el}
                    onChange={(e) => handleChangeHobby(idx, e.target.value)}
                  />
                </div>
                <button
                  className="delete"
                  onClick={() => handleDeleteHobby(idx)}
                >
                  삭제
                </button>
              </HobbyList>
            ))}
            <Button onClick={handeEditSubmit}>변경완료</Button>
          </ModalContainer>
        </Modal>
      )}
      {isPasswordModalOpen && (
        <Modal onClose={handlePasswordCloseModal}>
          <ModalContainer>
            <h1>비밀번호 변경하기</h1>
            <Input
              name="password"
              label="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <Input
              name="new-password"
              label="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />
            <Input
              name="new-password-check"
              label="새 비밀번호 확인"
              value={newPasswordCheck}
              onChange={(e) => setNewPasswordCheck(e.target.value)}
              type="password"
            />
            <Button onClick={handlePasswordSubmit}>변경완료</Button>
          </ModalContainer>
        </Modal>
      )}
    </>
  );
}

export default Home;

const UserContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 300px;
  width: calc(100% - 50px);
  padding: 20px 24px;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ModalContainer = styled.div`
  padding: 20px 24px;
  min-width: 300px;
  .hobby-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      background: none;
    }
  }
  h1 {
    margin-bottom: 12px;
    text-align: center;
  }
`;
const HobbyList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .delete {
    width: 30px;
    background: none;
  }
`;
