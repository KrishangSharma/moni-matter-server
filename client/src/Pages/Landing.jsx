import { Link } from "react-router-dom";
import { BackgroundCircles } from "../design/Circles";

const Landing = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="flex flex-col relative z-20">
        <div className="lg:flex lg:justify-center lg:items-center">
          <div className="w-full lg:w-9/12 flex flex-col text-center mt-5 p-10 gap-5 items-center justify-center">
            <h1 className="text-5xl font-semibold lg:text-7xl md:text-6xl">
              Your Ultimate Finance Companion.
            </h1>
            <h2 className="text-xl lg:text-2xl lg:w-2/3 md:text-2xl text-gray-500">
              Master your finances effortlessly with our intuitive expense
              management app.
            </h2>
            <Link
              className="px-5 py-3 rounded-xl border border-secondary-500 hover:bg-custom-gradient bg-white hover:text-[white] hover:bg-secondary-500"
              to="/signup"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Landing;
