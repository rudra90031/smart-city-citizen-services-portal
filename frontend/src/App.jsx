import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Portal from "./pages/Portal";
import LodgeComplaint from "./pages/LodgeComplaint";
import TrackComplaint from "./pages/TrackComplaint";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/lodge-complaint" element={<LodgeComplaint />} />
        <Route
          path="/track-complaint"
          element={<TrackComplaint />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;