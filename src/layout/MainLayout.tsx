import { Outlet } from "react-router-dom";
import UserList from "../components/UserList/UserList";

const MainLayout = () => {
  return (
    <>
      <UserList />
      <Outlet />
    </>
  );
};

export default MainLayout;
