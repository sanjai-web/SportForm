import { NavLink } from "react-router-dom";

import "../styles/navbar.css";

const NavBar = () => {
  return (
    <>
      <div className="Topnav">
        <h1 className="title2">
          Sports{" "}
          <span className="pro">
           
              League 
          </span>
          
        </h1>
      </div>
      <div className="Sidenav">
        <NavLink to="/home" className="link1">
          Home
        </NavLink>
        <NavLink to="/league" className="link2">
          League
        </NavLink>
        <NavLink to="/about" className="link3">
          About
        </NavLink>
      </div>
    </>
  );
};

export default NavBar;
