import { useLayoutEffect } from "react";
import Dashboard from "./Dashboard";
import Complaints from "./Complaints";

function Portal() {

  return (
    <>
      <Dashboard />
      <Complaints />
    </>
  );
}

export default Portal;