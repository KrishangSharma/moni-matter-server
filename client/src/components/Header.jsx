import { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import { 
  Home,
  Groups,
  Add,
  Reports,
  Profile 
} from "../assets/navicons/NavIcons";
import { LightMode } from "../assets/otherIcons/Icons";

//temporarily removed all styling
const Header = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const navItems = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/groups", label: "Groups", icon: Groups },
    { to: "/transactions", label: "Transactions", icon: Add },
    { to: "/reports", label: "Reports", icon: Reports },
    { to: "/profile", label: "profile", icon: Profile}
  ];

  return (
   
    <nav className="w-screen h-[4.5rem] lg:h-28 bottom-0 lg:top-0 border-t lg:border-b flex items-center justify-center lg:justify-between px-2 lg:px-10 absolute bg-white">
      <div className="w-full lg:w-1/2 h-full flex items-center justify-between  lg:justify-start gap-4 lg:gap-5 text-sm px-5 lg:pl-0 py-5">
        <Link to="/home" className="hidden text-3xl lg:text-4xl font-bold lg:block">
          Moni Matter
        </Link>
        {loggedIn ? (
          <div className="hidden h-1/3 w-[0.5px] rounded-full bg-secondary-500 lg:block"></div>
        ) : null}
        <div className="flex h-full w-full lg:w-1/4 items-center justify-between gap-3 text-sm lg:text-lg ">
          {loggedIn
            ? navItems.map((item, index) => (
              
                <Link key={index} to={item.to} className={"flex flex-col items-center justify-center"}>
                 <item.icon className="block lg:hidden w-8 h-8"/> 
                  {item.label}
                </Link>
                
              ))
            : null}
        </div>
      </div>
      {/* User Actions */}
      <div>
        {loggedIn ? (
          <div className="hidden lg:block"><LightMode className="w-9 h-9"/></div>
        ) : (
          <Link
            to="/login"
            className="border border-accent-500 rounded-lg px-6 py-2 hover:bg-accent-500 hover:text-text-50 transition-colors duration-150"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
