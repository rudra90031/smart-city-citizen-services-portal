import Dashboard from "./Dashboard";
import Complaints from "./Complaints";
import Certificates from "./Certificates";
import Bills from "./Bills";
import Profile from "./Profile";

function Portal() {

  return (
    <>
      <div id="dashboard">
        <Dashboard />
      </div>

      <div id="complaints">
        <Complaints />
      </div>

      <div id="certificates">
        <Certificates />
      </div>

      <div id="bills">
        <Bills />
      </div>

      <div id="profile">
        <Profile />
      </div>
    </>
  );
}

export default Portal;