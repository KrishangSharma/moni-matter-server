import { useState } from "react";
import { NavLink as Link } from "react-router-dom";

//temporarily removed all styling
const Header = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const navItems = [
    { to: "/home", label: "Home" },
    { to: "/transactions", label: "Transactions" },
    { to: "/groups", label: "Groups" },
    { to: "/reports", label: "Reports" },
  ];

  return (
    <nav className="w-screen h-28 border-b flex items-center justify-between px-10 absolute bg-white">
      <div className="w-1/2 h-full flex items-center gap-5">
        <Link to="/" className="text-4xl font-bold">
          Moni Matter
        </Link>
        {loggedIn ? (
          <div className="h-1/3 w-[0.5px] rounded-full bg-secondary-500"></div>
        ) : null}
        <div className="h-full flex items-center gap-3 text-lg">
          {loggedIn
            ? navItems.map((item, index) => (
                <Link key={index} to={item.to}>
                  {item.label}
                </Link>
              ))
            : null}
        </div>
      </div>
      {/* User Actions */}
      <div>
        {loggedIn ? (
          <h2>Profile Icon</h2>
        ) : (
          <Link
            to="/login"
            className="border border-accent-500 rounded-md px-6 py-2 hover:bg-accent-500 hover:text-text-50 transition-colors duration-150"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
