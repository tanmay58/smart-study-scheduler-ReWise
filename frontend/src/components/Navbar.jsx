import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
      {/* Logo */}
      <img
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="ReWise"
        onClick={() => navigate("/")}
      />

      {/* Nav Links */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
        </NavLink>

        <NavLink to="/all-topics">
          <li className="py-1">ALL TOPICS</li>
        </NavLink>

        <NavLink to="/notifications">
          <li className="py-1">NOTIFICATIONS</li>
        </NavLink>

        <NavLink to="/history">
          <li className="py-1">HISTORY</li>
        </NavLink>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={assets.profile_pic}
                alt="Profile"
              />
              <img
                className="w-2.5"
                src={assets.dropdown_icon}
                alt="Menu"
              />
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p className="text-sm text-gray-500">
                  Signed in as <br />
                  <span className="font-semibold">{user?.username}</span>
                </p>

                <hr />

                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>

                <p
                  onClick={() => navigate("/all-topics")}
                  className="hover:text-black cursor-pointer"
                >
                  All Topics
                </p>

                <p
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="hover:text-black cursor-pointer text-red-600"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
