import React from "react";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
