import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar_custom">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          CatchUp
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className="d-flex">
            <NavLink
              to="/blog/create"
              className="btn text-white rounded me-2"
              style={{ backgroundColor: "#000000" }}
            >
              <i className="bi bi-file-earmark-plus"></i> Create Post
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
