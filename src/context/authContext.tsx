import { createContext, useState } from "react";
import type { User } from "../types/user";

export const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (data: User) => {
    setUser(data);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;