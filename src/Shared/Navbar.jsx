import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { NavLink, useLocation } from "react-router-dom";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const location = useLocation();
  const links = (
    <>
      {/* <NavLink
        to=""
        className={
          location.pathname === "/"
            ? "text-zinc-900"
            : " py-2 font-medium text-zinc-900 transition-all duration-200 focus:text-opacity-70"
        }
      >
        Home
      </NavLink> */}
      <NavLink
        to=""
        className={
          location.pathname === "/"
            ? "text-zinc-900"
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
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              {/* <a href="#" title="" className="flex">
                <img
                  className="w-auto h-8 lg:h-10"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/logo-alt.svg"
                  alt=""
                />
              </a> */}
            </div>

            <button
              type="button"
              className="p-2 text-black transition-all duration-200 rounded-md md:hidden hover:text-white hover:bg-gray-800"
              onClick={toggleMobileMenu} // Toggle mobile menu on button click
            >
              <CiMenuBurger />
            </button>

            <div className="hidden md:flex md:items-center md:space-x-10 cursor-pointer">
              {links}
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
