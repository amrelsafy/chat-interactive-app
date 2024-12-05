import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IAppContext } from "../../interfaces/IAppContext";
import { AppContext } from "../../contexts/AppContext";
import data from "../../data.json";
import { IUser } from "../../interfaces/IUser";
import "./UserList.css";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

const UserList = () => {
  const { updateUsers } = useContext<IAppContext>(AppContext);
  const [users, setUsers] = useState<IUser[]>([]);
  const [hideList, setHideList] = useState(true);

  const handleShowList = () => {
    console.log("Clicked");
    setHideList(!hideList);
  };

  useEffect(() => {
    const { usersData } = data;
    updateUsers(usersData);
    setUsers(usersData);
  }, []);

  return (
    <nav className="user-list-nav">
      <button className="user-list-show-btn" onClick={handleShowList}>
        <FaBars />
      </button>
      {hideList ? (
        <></>
      ) : (
        <motion.ul
          className="user-list-ul"
          initial={{ y: 15, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {users.map((user, index) => {
            let username = `/users/${user.name}`;
            return (
              <NavLink
                className="user-link"
                key={index}
                to={username}
                onClick={handleShowList}
              >
                {user.name}
              </NavLink>
            );
          })}
        </motion.ul>
      )}
      <motion.ul
        className="user-list-ul show-tb"
        initial={{ y: 15, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {users.map((user, index) => {
          let username = `/users/${user.name}`;
          return (
            <NavLink className="user-link" key={index} to={username}>
              {user.name}
            </NavLink>
          );
        })}
      </motion.ul>
    </nav>
  );
};

export default UserList;
