import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Binder from "./pages/Binder";
import Register from "./pages/Register";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/binder" element={<Binder />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
