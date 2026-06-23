import { useLayoutEffect } from "react";
import Dashboard from "./Dashboard";
import Complaints from "./Complaints";
import Certificates from "./Certificates";
import Bills from "./Bills";

function Portal() {

  return (
    <>
      <Dashboard />
      <Complaints />
      <Certificates />
      <Bills />
    </>
  );
}

export default Portal;