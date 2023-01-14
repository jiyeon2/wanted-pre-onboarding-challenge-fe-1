import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Signup from "./routes/Signup";
import Todos from "./routes/Todos";

import { AuthProvider } from "./context/authContext";
import TodoQueryClientProvider from "./context/todoQueryClientContext";

// https://sevda.com.au/how-to-use-react-router-v6-in-a-react-typescript-application
function App() {
  return (
    <TodoQueryClientProvider>
      <AuthProvider>
        <div
          className="App"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/todos" element={<Todos />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </TodoQueryClientProvider>
  );
}

export default App;
