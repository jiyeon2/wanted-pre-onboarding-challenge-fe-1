import CreateTodo from "../components/CreateTodo";
import TodoDetail from "../components/TodoDetail";
import TodoList from "../components/TodoList";
import { TodoProvider } from "../context/todoContext";

function Todos() {
  return (
    <div className="Todos" style={{ width: "300px" }}>
      <TodoProvider>
        <CreateTodo />
        <hr />
        <TodoList />
        <hr />
        <TodoDetail />
      </TodoProvider>
    </div>
  );
}

export default Todos;
