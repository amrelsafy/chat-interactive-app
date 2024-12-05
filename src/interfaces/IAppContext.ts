import { IUser } from "./IUser";

export interface IAppContext {
  state: {
    users: IUser[];
  },
  updateUsers: (users: IUser[]) => void,
  getUsers: () => IUser[],
}