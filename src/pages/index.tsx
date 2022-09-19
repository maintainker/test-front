import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./home";
import HomeLayout from "./home/Layout";
import Login from "./signin";
import Signup from "./signup";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
