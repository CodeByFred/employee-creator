import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEmployeePage from "./pages/CreateEmployeePage/CreateEmployeePage";
import UpdateEmployeePage from "./pages/UpdateEmployeePage";
import AllEmployeesPage from "./pages/AllEmployeesPage";
import ContractForm from "./components/ContractForm/ContractForm";

function App() {
  return (
    <BrowserRouter basename="/">
      <main>
        <Routes>
          <Route path="/employees" element={<AllEmployeesPage />} />
          <Route path="/employees/create" element={<CreateEmployeePage />} />
          <Route path="/employees/:id/edit" element={<UpdateEmployeePage />} />
          <Route path="/contracts/:id" element={<ContractForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
