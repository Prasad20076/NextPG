import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AddPG from "./pages/AddPG";
import EditPG from "./pages/EditPG";
import PGDetails from "./pages/PGDetails";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddPG />} />
        <Route path="/edit/:id" element={<EditPG />} />
        <Route path="/pg/:id" element={<PGDetails />} />
      </Routes>
    </Router>
  );
}

export default App;