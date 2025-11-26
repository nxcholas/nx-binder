import {Routes, Route} from 'react-router-dom';

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Homepage from './pages/Homepage';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
