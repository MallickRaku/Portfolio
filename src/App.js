import React, { useState, lazy, Suspense, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./Components/Login";
import "./style.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { Header } from "./Components/Header/Header";
import { UserContext } from "./UserContext";
const LazyHome = lazy(() => import("./Components/Home/Home"));
const LazyAdminPanel = lazy(() => import("./Components/UpdateForm/AdminPanel"));

function App() {
  const [module, setModule] = useState(false);
  const user = useContext(UserContext);
  const ProtectedRoute = ({ children }) => (Object.keys(user).length !== 0 ? children : <LazyHome />);

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="mainContainer">
          <Header setModule={setModule}></Header>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense>
                  <LazyHome />
                </Suspense>
              }
            ></Route>
            <Route
              path="/AdminPanel"
              element={
                <Suspense>
                  <ProtectedRoute>
                    <LazyAdminPanel />
                  </ProtectedRoute>
                </Suspense>
              }
            ></Route>
          </Routes>
        </div>
        {module && <Login setModule={() => setModule(false)} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
