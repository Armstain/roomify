import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider.jsx";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navLinkStyles = ({ isActive }) =>
    `relative transition-all duration-200 hover:text-primary
     after:content-[''] after:absolute after:w-0 after:h-0.5 
     after:bg-primary after:left-0 after:bottom-0
     after:transition-all after:duration-300
     hover:after:w-full ${
       isActive ? "font-bold text-primary after:w-full" : ""
     }`;

  const Links = (
    <>
      <li>
        <NavLink className={navLinkStyles} to="/rooms">
          Rooms
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkStyles} to="/myBookings">
          My Bookings
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkStyles} to="/about">
          About
        </NavLink>
      </li>
      <li>
        <NavLink className={navLinkStyles} to="/contact">
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 w-full z-50">
      <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200">
        <div to="/" className="navbar-start">
          <div className="dropdown">
            <Link
              to="/"
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </Link>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow-lg bg-base-100 rounded-lg w-52
              border border-base-200 animate-slideDown"
            >
              {Links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            Roomify
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Links}</ul>
        </div>
        <div className="navbar-end gap-2">
          <div className="mx-2"></div>

          {user && user.email ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar tooltip tooltip-left z-30 ring-2 ring-primary ring-offset-2 ring-offset-base-100"
                data-tip={user.displayName || "User Profile"}
              >
                <div className="w-10 rounded-full">
                  <img
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    alt="User Avatar"
                    src={
                      user?.photoURL ||
                      "https://api.lorem.space/image/face?hash=33791"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow-lg bg-base-100 rounded-lg w-52
                  border border-base-200 animate-slideDown"
              >
                <li>
                  <button
                    onClick={logOut}
                    className="text-error hover:bg-error/10"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm md:btn-md">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
