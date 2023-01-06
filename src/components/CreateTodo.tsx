import { useMemo, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { useFetchTodoList } from "./TodoList";

function CreateTodo() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { token } = useAuthContext();
  const fetchTodoList = useFetchTodoList();

  const submitDisabled = useMemo(() => {
    if (!title || !content) return true;
    return false;
  }, [title, content]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ title, content }));

    if (token) {
    }

    fetch("http://localhost:8080/todos", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
    }).then((res) => {
      console.log(res);
      if (token) fetchTodoList();
      setTitle("");
      setContent("");
    });
  };
  if (!token) return <p>투두 생성은 로그인 이후 가능합니다</p>;
  return (
    <div>
      <p>투두 생성하기</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
            value={title}
          />
        </div>
        <div>
          <label>내용</label>
          <textarea
            style={{ resize: "none" }}
            onChange={(e) => {
              setContent(e.currentTarget.value);
            }}
            value={content}
          />
        </div>

        <button type="submit" disabled={submitDisabled}>
          생성
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;
