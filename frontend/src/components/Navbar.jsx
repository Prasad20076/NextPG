import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "white" }}>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        NextPG
      </Link>
    </nav>
  );
}

export default Navbar;