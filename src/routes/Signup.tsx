import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");

  const submitDisabled = useMemo(() => {
    if (!email || !password) return true;
    if (!email.match(/\w+@\w*.\w*/gi)) return true;
    if (password.length < 8) return true;
    return false;
  }, [email, password]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email, password }));

    try {
      const response = await (
        await fetch("http://localhost:8080/users/create", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      console.log(response);

      if (
        response.message === "계정이 성공적으로 생성되었습니다" &&
        !!response.token
      ) {
        navigate("/auth"); // 로그인 화면으로 이동
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="Signup">
      <div>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>이메일</label>
            <input
              type="email"
              name="email"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              value={email}
            />
          </div>
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              value={password}
            />
          </div>

          <button type="submit" disabled={submitDisabled}>
            가입하기
          </button>
        </form>
      </div>
      <hr />

      <button onClick={() => navigate("/auth")}>로그인 화면으로 이동</button>
    </div>
  );
}

export default Signup;
