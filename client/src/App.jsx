import { Routes, Route } from "react-router-dom";
import { Landing, Login } from "./Pages/exports";
import Signup from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import Transactions from "./components/Transactions.jsx";
import Layout from "./Layout.jsx";
import Groups from "./components/Groups.jsx";
import Reports from "./components/Reports.jsx";

import { Nav } from "./components/exports.js";
function App() {
  return (
    <div className={`font-pops light`}>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/*temporarily removed private route functionality for ease of work while working on different routes */}
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
