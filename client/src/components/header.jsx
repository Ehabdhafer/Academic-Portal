import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuth } from "../hooks/Authcontext";

const Header = () => {
  const [menuopen, SetisMenuOpen] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const [cookie] = useCookies(["token", "role_id"], {
    token: null,
    role_id: null,
  });

  const handleMenu = () => {
    SetisMenuOpen(!menuopen);
  };

  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
    window.location.reload();
  };

  const handleHomeClick = () => {
    const roleId = cookie.role_id;
    if (roleId === 1) {
      navigate("/teacher");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (cookie.token !== undefined) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"#"}>
          <button className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="
                https://w1.pngwing.com/pngs/800/473/png-transparent-circle-design-adversity-quotient-logo-text-learning-academy-result-purple.png
              "
              className="h-12"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Academic-Portal
            </span>
          </button>
        </Link>
        <button
          onClick={handleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={menuopen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${
            menuopen ? "block" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button
                onClick={handleHomeClick}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Home
              </button>
            </li>
            <li>
              <Link to={"#"}>
                <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  About
                </button>
              </Link>
            </li>
            <li>
              <Link to={"/login"} className={`${user && "hidden"} block`}>
                <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Login
                </button>
              </Link>
            </li>
            <li>
              <Link to={"/signup"} className={`${user && "hidden"} block`}>
                <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Signup
                </button>
              </Link>
            </li>
            <li>
              <Link to={"#"} className={`${!user && "hidden"} block`}>
                <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  profile
                </button>
              </Link>
            </li>
            <li>
              <Link to={"/"} className={`${!user && "hidden"} block`}>
                <button
                  onClick={handleLogout}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
