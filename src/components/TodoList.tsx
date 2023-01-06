import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { TodoData, useTodoContext } from "../context/todoContext";

export function useFetchTodoList() {
  const { actions } = useTodoContext();
  const { token } = useAuthContext();

  async function fetchTodoList() {
    try {
      const response = await (
        await fetch("http://localhost:8080/todos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token || "",
          },
        })
      ).json();

      console.log(response);
      actions.saveTodos(response.data.reverse());
    } catch (error) {
      console.error(error);
    }
  }

  return fetchTodoList;
}

function TodoList() {
  const { todos } = useTodoContext();
  const { token } = useAuthContext();
  const fetchTodoList = useFetchTodoList();

  useEffect(() => {
    if (token) {
      fetchTodoList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) return <p>투두 목록 조회는 로그인 이후 사용가능합니다</p>;

  return (
    <div>
      <p>투두 목록</p>
      <div style={{ maxHeight: "250px", overflowY: "auto" }}>
        {todos.map((todo) => {
          return <TodoListItem key={todo.id} todo={todo} />;
        })}
      </div>
    </div>
  );
}

function TodoListItem({ todo }: { todo: TodoData }) {
  return (
    <div key={todo.id} style={{ border: "1px solid #ddd" }}>
      <p>제목 : {todo.title}</p>
      <p>내용 : {todo.content}</p>
    </div>
  );
}

export default TodoList;
