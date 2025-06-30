import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateEmployeePage from "./pages/CreateEmployeePage/CreateEmployeePage";
import AllEmployeesPage from "./pages/AllEmployeesPage/AllEmployeesPage";
import { ToastContainer } from "react-toastify";
import { DepartmentRolesProvider } from "./context/DepartmentRolesContext";
import { CreateEmployeeProvider } from "./context/CreateEmployeeContext";

function App() {
  return (
    <BrowserRouter>
      <main>
        <DepartmentRolesProvider>
          <CreateEmployeeProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/employees" />} />
              <Route path="/employees" element={<AllEmployeesPage />} />
              <Route path="/employees/create" element={<CreateEmployeePage />} />
            </Routes>
          </CreateEmployeeProvider>
        </DepartmentRolesProvider>

        <ToastContainer position="bottom-right" autoClose={2000} />
      </main>
    </BrowserRouter>
  );
}

export default App;
