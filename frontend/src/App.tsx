import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEmployeePage from "./pages/CreateEmployeePage/CreateEmployeePage";
import UpdateEmployeePage from "./pages/UpdateEmployeePage/UpdateEmployeePage";
import AllEmployeesPage from "./pages/AllEmployeesPage/AllEmployeesPage";

function App() {
  return (
    <BrowserRouter basename="/">
      <main>
        <Routes>
          <Route path="/employees" element={<AllEmployeesPage />} />
          <Route path="/employees/create" element={<CreateEmployeePage />} />
          <Route path="/employees/edit/:id" element={<UpdateEmployeePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
