import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Account/Login";
import Register from "./Components/Account/Register";
import Nav from "./Components/Navbar/Nav";
import ManagerPage from "./Components/Manager/ManagerPage";
import Employee from "./Components/Employee/Employee";
import AddPage from "./Components/Employee/ADD/AddPage";
import UpdatePage from "./Components/Employee/Update/UpdatePage";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/addPage" element={<AddPage />} />
        <Route path="/update/:addTimeArrangeId" element={<UpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
