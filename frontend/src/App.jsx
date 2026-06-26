import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Portal from "./pages/Portal";
import LodgeComplaint from "./pages/LodgeComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import Certificates from "./pages/Certificates";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaints from "./pages/AdminComplaints";
import AdminComplaintDetails from "./pages/AdminComplaintDetails";
import AdminCertificates from "./pages/AdminCertificates";
import AdminCertificateDetails from "./pages/AdminCertificateDetails";
import AdminBills from "./pages/AdminBills";
import AdminGISMap from "./pages/AdminGISMap";
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
        <Route
          path="/certificates"
          element={<Certificates />}
        />
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route path="/admin/complaints" element={<AdminComplaints />} />
        <Route
          path="/admin/complaints/:id"
          element={<AdminComplaintDetails />}
        />
        <Route
          path="/admin/certificates"
          element={<AdminCertificates />}
        />
        <Route
          path="/admin/bills"
          element={<AdminBills />}
        />
        <Route
          path="/admin/gis"
          element={<AdminGISMap />}
        />
        <Route
          path="/admin/certificates/:id"
          element={<AdminCertificateDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;