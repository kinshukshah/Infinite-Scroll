import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Pages/LoginPage/loginPage";
import { InfiniteList } from "./Pages/InfiniteList/infiniteList";
import PrivateRoute from "./PrivateRoute";
function App() {
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <InfiniteList />
            </PrivateRoute>
          }
        />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
