import { createContext, ReactNode, useState } from "react";
import { IAppContext } from "../interfaces/IAppContext";
import { IUser } from "../interfaces/IUser";

const initialContext = {
  state: {
    users: [],
  },
  updateUsers: () => {},
  getUsers: () => {
    return [];
  },
};

export const AppContext = createContext<IAppContext>(initialContext);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{ users: IUser[]; socket?: WebSocket }>({
    users: [],
    socket: undefined,
  });

  const updateUsers = (newUsers: IUser[]) =>
    setState((prevState) => {
      return { ...prevState, users: newUsers };
    });

  const getUsers = () => state.users;

  return (
    <AppContext.Provider value={{ state, updateUsers, getUsers }}>
      {children}
    </AppContext.Provider>
  );
};
