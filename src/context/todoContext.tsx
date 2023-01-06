import { createContext, useState, useEffect, useMemo, useContext } from "react";

export type TodoData = {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TodoStateType = {
  todos: TodoData[];
  actions: {
    saveTodos: (todos: TodoData[]) => void;
  };
};

const MyTodoContext = createContext<TodoStateType>({
  todos: [],
  actions: {
    saveTodos: (todos: TodoData[]) => {},
  },
});

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<TodoData[]>([]);

  const actions = useMemo(
    () => ({
      saveTodos(todos: TodoData[]) {
        setTodos(todos);
      },
    }),
    []
  );

  const value = useMemo(() => ({ todos, actions }), [todos, actions]);

  return (
    <MyTodoContext.Provider value={value}>{children}</MyTodoContext.Provider>
  );
}

export function useTodoContext() {
  const state = useContext(MyTodoContext);
  if (state === undefined) {
    throw new Error("useTodoContext should be used within TodoProvider");
  }
  return state;
}
