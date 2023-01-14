import { createContext, useState, useEffect, useMemo, useContext } from "react";
import tokenHelper from "../util/tokenHelper";

export type AuthStateType = {
  token: string | null;
  actions: {
    saveToken: (token: string) => void;
    removeToken: () => void;
  };
};
//https://velog.io/@velopert/react-context-tutorial
const MyAuthContext = createContext<AuthStateType>({
  token: null,
  actions: {
    saveToken: (token) => {},
    removeToken: () => {},
  },
});

//https://itchallenger.tistory.com/394
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = tokenHelper.getToken();
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const actions = useMemo(
    () => ({
      saveToken(token: string) {
        setToken(token);
        tokenHelper.saveToken(token);
      },
      removeToken() {
        setToken(null);
        tokenHelper.removeToken();
      },
    }),
    []
  );

  const value = useMemo(() => ({ token, actions }), [token, actions]);

  return (
    <MyAuthContext.Provider value={value}>{children}</MyAuthContext.Provider>
  );
}

export function useAuthContext() {
  const state = useContext(MyAuthContext);
  if (state === undefined) {
    throw new Error("useAuthState should be used within MyAuthContextProvider");
  }
  return state;
}
