import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Inquilinos } from "./pages/Inquilinos";
import { Acuerdos } from "./pages/Acuerdos";
import { Inquilino } from "./pages/Inquilino";
export const App = () => {
  return (
    <div className="flex w-full h-screen">
      <BrowserRouter>
        <Navbar />
        <div className="p-5 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inquilinos" element={<Inquilinos />} />
            <Route path="/inquilinos/:id" element={<Inquilino />} />
            <Route path="/acuerdos" element={<Acuerdos />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
