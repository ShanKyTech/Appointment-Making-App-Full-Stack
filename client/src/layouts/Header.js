import React from "react";
import { Link, withRouter } from "react-router-dom";
import authenticate from "../services/auth";
import AuthService from "../services/auth-service";
function Header(props) {
  let auth = authenticate();
  const logout = () => {
    AuthService.logout();
    let path = `/`;
    props.history.push(path);
  };
  return (
    <header className=" bg-indigo-600 p-2">
      <nav className="container mx-auto px-10 flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-serif text-4xl tracking-tight text-white">
            ShanKyTech
          </span>
        </div>

        <label
          className="md:hidden cursor-pointer flex items-center px-3 py-2 border rounded text-white"
          htmlFor="menu-toggle"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div
          className="hidden w-full flex-grow md:flex md:items-center md:w-auto md:justify-end"
          id="menu"
        >
          <div className="text-sm">
            {!auth && (
              <>
                <Link
                  to="/"
                  className="text-xl font-serif block mt-4 md:inline-block md:mt-0 text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-xl font-serif block mt-4 md:inline-block md:mt-0 text-white ml-5"
                >
                  Register
                </Link>
              </>
            )}
            {auth && (
              <>
                
                <button
                  className="font-serif text-xl py-3 md:py-0 md:ml-5 text-white focus:outline-none "
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
export default withRouter(Header);
