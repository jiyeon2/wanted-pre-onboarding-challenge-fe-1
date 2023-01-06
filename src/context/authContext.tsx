import { createContext, useState, useEffect, useMemo, useContext } from "react";

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
    const savedToken = localStorage.getItem("todo_app_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const actions = useMemo(
    () => ({
      saveToken(token: string) {
        setToken(token);
        localStorage.setItem("todo_app_token", token);
      },
      removeToken() {
        setToken(null);
        localStorage.removeItem("todo_app_token");
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
