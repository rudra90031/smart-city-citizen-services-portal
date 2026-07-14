import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
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
import AdminNotifications from "./pages/AdminNotifications";
import AdminSettings from "./pages/AdminSettings";
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
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <AdminProtectedRoute>
              <AdminComplaints />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints/:id"
          element={
            <AdminProtectedRoute>
              <AdminComplaintDetails />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/certificates"
          element={
            <AdminProtectedRoute>
              <AdminCertificates />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/bills"
          element={
            <AdminProtectedRoute>
              <AdminBills />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/gis"
          element={
            <AdminProtectedRoute>
              <AdminGISMap />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <AdminProtectedRoute>
              <AdminNotifications />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminProtectedRoute>
              <AdminSettings />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/certificates/:id"
          element={
            <AdminProtectedRoute>
              <AdminCertificateDetails />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;