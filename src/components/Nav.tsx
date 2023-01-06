import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

function Nav() {
  const { token, actions } = useAuthContext();

  const isLoggedIn = useMemo(() => !!token, [token]);

  return (
    <div style={{ width: "300px" }}>
      <h1>투두앱</h1>
      {isLoggedIn && (
        <button onClick={() => actions.removeToken()}>로그아웃하기</button>
      )}
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/auth">로그인</Link>
        </li>
        <li>
          <Link to="/signup">회원가입</Link>
        </li>
        <li>
          <Link to="/todos">투두목록</Link>
        </li>
      </ul>
      <hr />
    </div>
  );
}

export default Nav;
