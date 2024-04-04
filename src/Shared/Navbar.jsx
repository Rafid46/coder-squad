/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import swal from "sweetalert";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { user, logOut } = useContext(AuthContext);
  // console.log(user);
  const handleSignOut = () => {
    logOut()
      .then((result) => {
        // console.log(result.user);
        return swal("", "Logout successfully", "success");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const location = useLocation();

  const links = (
    <>
      <NavLink
        to=""
        className={
          location.pathname === "/"
            ? "text-green-500"
            : " py-2 font-medium text-zinc-900 transition-all duration-200 focus:text-opacity-70"
        }
      >
        My tasks
      </NavLink>
      <NavLink
        to="/login"
        className={
          location.pathname === "/login"
            ? "text-green-500"
            : " py-2 font-medium text-zinc-900 transition-all duration-200 focus:text-opacity-70"
        }
      >
        Login
      </NavLink>
    </>
  );
  return (
    <div>
      <header className="">
        <div className="px-4 mx-auto max-w-screen-xl sm:px-6 lg:px-0">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <a href="/" className="flex">
                <p className="text-3xl font-grotest font-bold text-green-500">
                  <span className="font-thin text-[#124076]">Task</span>{" "}
                  Management
                </p>
              </a>
            </div>

            <button
              type="button"
              className="p-2 text-black transition-all duration-200 rounded-md md:hidden hover:text-white hover:bg-gray-800"
              onClick={toggleMobileMenu}
            >
              <CiMenuBurger />
            </button>

            <div className="hidden md:flex md:items-center md:space-x-10 cursor-pointer">
              {links}
              {user ? (
                <>
                  <div className="dropdown dropdown-end">
                    <summary
                      tabIndex={0}
                      className="btn btn-ghost rounded-btn hover:rounded-xl"
                    >
                      <div className="">
                        <div className="flex items-center">
                          <p className="text-green-900 mr-5 border-[1px] border-opacity-30 border-gray-600 rounded-full px-5 pt-2 pb-[6px]">
                            {user?.displayName}
                          </p>
                          {user?.photoURL ? (
                            <div className="flex items-center justify-evenly">
                              <img
                                className="rounded-full w-[40px] border-2 border-blue-400"
                                src={user?.photoURL}
                              />
                            </div>
                          ) : (
                            <div className="text-3xl">
                              <FaRegUserCircle />
                            </div>
                          )}
                        </div>
                      </div>
                    </summary>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content z-[1] p-2 text-sm w-52 mt-4"
                    >
                      <div className="bg-gray-900 font-thin rounded-lg">
                        <Link>
                          <li className="flex justify-between text-base">
                            <button
                              className="text-white font-medium hover:text-green-500"
                              onClick={handleSignOut}
                            >
                              Logout
                              <IoMdLogOut className="ml-20" />
                            </button>
                          </li>
                        </Link>
                      </div>
                    </ul>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </nav>

          {isMobileMenuOpen && ( // Render mobile menu only if isMobileMenuOpen is true
            <nav className="h-screen px-4 py-10 flex flex-col items-center mt-10 space-y-2">
              {links}
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
