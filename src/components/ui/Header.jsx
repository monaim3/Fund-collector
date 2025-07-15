
import { useRef, useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/Images/logo.png";
import { IoIosNotifications } from "react-icons/io";
import { useGetNotificationQuery } from "../../store/services/api";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { data, isLoading } = useGetNotificationQuery();
  const notifications = data?.data || [];
  useEffect(() => {
  let timeoutId;

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setToggle(false);
    }
  };

  if (toggle) {
    // ⏳ Wait a bit before attaching the listener
    timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 50);
  }

  return () => {
    clearTimeout(timeoutId);
    document.removeEventListener("click", handleClickOutside);
  };
}, [toggle]);


  const user = {
    email: localStorage.getItem("userEmail"),
    displayName: localStorage.getItem("userName"),
  };

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Account", href: "/account" },
    { name: "Vote", href: "/vote" },
    { name: "Event", href: "/event" },
    { name: "History", href: "/history" },
  ];
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRoll");
    toast.success("Logout successfully", {
      position: "top-right",
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/login");
      // window.location.reload();
    }, 1000);
  };

  return (
    <header className="relative bg-gradient-to-r from-[#2596be] to-[#2a3e97] shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="w-20 h-20" />
              <span className="text-xl lg:text-3xl font-semibold text-white">E-112 BATCH-FUND</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={`${item.href}`}
                className="text-white hover:text-white/80 transition-colors duration-300 lg:text-lg font-medium relative group uppercase"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            <Link to="/payment">
              <Button
                variant="outline"
                className="bg-transparent border-white lg:text-lg text-white hover:bg-white hover:text-[#2596be] transition-colors duration-300 font-medium uppercase cursor-pointer"
              >
                Payment
              </Button>
            </Link>

             <div className="relative w-8 h-8 rounded-full flex items-center justify-center text-white">
                <IoIosNotifications size={25} />
                <span className="absolute top-[-10px] right-[-6px] w-5 h-5 text-white bg-red-500  rounded-full flex items-center justify-center">5</span>
              </div>
            {/* Avatar Dropdown - Desktop */}
            <div className="relative">
              <label
                onClick={() => setToggle(!toggle)}
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar "
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white">
                  <FaUser size={20} />
                </div>
              </label>

             
              {toggle && (
                <ul ref={dropdownRef} className="absolute right-0 mt-3 p-2 z-50 shadow bg-white text-black rounded-box w-52">
                  <li className="px-4 py-2 border-b">
                    <span className="font-semibold">{user?.displayName}</span>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    <Link to="/view-profile">View Profile</Link>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    <Link to={"/change-password"}>Change Password</Link>
                  </li>

                  <li
                    onClick={() => {
                      setToggle(false);
                      handleLogout();
                    }}
                    className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                  >
                    <a>Logout</a>
                  </li>
                </ul>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-100" : "opacity-0 hidden"}`}
        >
          <nav className="py-4 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="px-4">
              <Link to="/payment">
                <Button
                  variant="outline"
                  className="bg-transparent border-white lg:text-lg text-white hover:bg-white hover:text-[#2596be] transition-colors duration-300 font-medium uppercase cursor-pointer"
                >
                  Payment
                </Button>
              </Link>
            </div>
            {/* Avatar Dropdown - Mobile */}
            <div className="px-4 py-4 relative z-50">
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setToggle(!toggle)}
                  className="flex items-center gap-2 cursor-pointer text-white"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-[#2a3e97]">
                    <FaUser size={20} />
                  </div>
                  <span className="font-medium">{user?.displayName}</span>
                </div>

                {toggle && (
                  <ul className="absolute left-0 mt-2 p-2 shadow bg-white text-black rounded-box w-full z-50">
                    <li className="px-4 py-2 border-b">
                      <span className="font-semibold">{user?.displayName}</span>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                      <Link to="/view-profile" onClick={() => setTimeout(() => setToggle(false), 100)}>
                        View Profile
                      </Link>
                    </li>
                    <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                      <Link to="/change-password" onClick={() => setTimeout(() => setToggle(false), 100)}>
                        Change Password
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setToggle(false);
                        handleLogout();
                      }}
                      className="hover:bg-gray-100 px-4 py-2 cursor-pointer"
                    >
                      <span>Logout</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>


          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;