import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEmployeePage from "./pages/CreateEmployeePage/CreateEmployeePage";
import UpdateEmployeePage from "./pages/UpdateEmployeePage";
import AllEmployeesPage from "./pages/AllEmployeesPage";

function App() {
  return (
    <BrowserRouter basename="/employees">
      <main>
        <Routes>
          <Route path="/" element={<AllEmployeesPage />} />
          <Route path="/create" element={<CreateEmployeePage />} />
          <Route path="/:id/edit" element={<UpdateEmployeePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
