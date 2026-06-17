import { useLayoutEffect } from "react";
import Dashboard from "./Dashboard";
import Complaints from "./Complaints";
import Certificates from "./Certificates";

function Portal() {

  return (
    <>
      <Dashboard />
      <Complaints />
      <Certificates />
    </>
  );
}

export default Portal;