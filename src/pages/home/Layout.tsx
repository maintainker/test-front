import { Outlet, useNavigate } from "react-router";

function HomeLayout() {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("user");

  if (!loggedIn) {
    alert("비정상적인 접근입니다. 로그인페이지로 이동합니다.");
    navigate("/");
    return <></>;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default HomeLayout;
