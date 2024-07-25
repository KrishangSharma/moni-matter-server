import { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import { 
  Home,
  Groups,
  Add,
  Reports,
  Profile 
} from "../assets/navicons/NavIcons";

//temporarily removed all styling
const Header = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const navItems = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/groups", label: "Groups", icon: Groups },
    { to: "/transactions", label: "Add", icon: Add },
    { to: "/reports", label: "Reports", icon: Reports },
    { to: "/profile", label: "profile", icon: Profile}
  ];

  return (
   
    <nav className="w-screen h-20 md:h-28 bottom-0 md:top-0 border-t md:border-b flex items-center justify-center md:justify-between px-2 md:px-10 absolute bg-white">
      <div className="w-full md:w-1/2 h-full flex items-center justify-between  md:justify-start gap-4 md:gap-5 text-sm px-5 md:pl-0 py-5">
        <Link to="/" className="hidden text-3xl lg:text-4xl font-bold md:block">
          Moni Matter
        </Link>
        {loggedIn ? (
          <div className="hidden h-1/3 w-[0.5px] rounded-full bg-secondary-500 md:block"></div>
        ) : null}
        <div className="flex h-full w-full md:w-1/4 items-center justify-between gap-3 text-sm md:text-lg ">
          {loggedIn
            ? navItems.map((item, index) => (
              
                <Link key={index} to={item.to} className={"flex flex-col items-center justify-center"}>
                 <item.icon className="block md:hidden w-9 h-9"/> 
                  {item.label}
                </Link>
                
              ))
            : null}
        </div>
      </div>
      {/* User Actions */}
      <div>
        {loggedIn ? (
          <div className="hidden md:block"><Profile className="w-9 h-9"/></div>
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
