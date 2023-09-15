import { User } from "../types/auth.types";
import { useAuthContext } from "../context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";

export const useUser = () => {
  const { user, setUser } = useAuthContext();
  const { setItem } = useLocalStorage();

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return { user, addUser, removeUser };
};
