import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateEmployeePage from "./pages/CreateEmployeePage/CreateEmployeePage";
import AllEmployeesPage from "./pages/AllEmployeesPage/AllEmployeesPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter basename="/">
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" />} />
          <Route path="/employees" element={<AllEmployeesPage />} />
          <Route path="/employees/create" element={<CreateEmployeePage />} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={2000} />
      </main>
    </BrowserRouter>
  );
}

export default App;
