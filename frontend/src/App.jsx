import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Portal from "./pages/Portal";
import LodgeComplaint from "./pages/LodgeComplaint";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/lodge-complaint" element={<LodgeComplaint />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;