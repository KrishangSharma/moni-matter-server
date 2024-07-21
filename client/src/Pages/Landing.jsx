import { Link } from "react-router-dom";
import { BackgroundCircles } from "../design/Circles";

const Landing = () => {
  return (
    <div className="relative w-full h-[calc(100vh-112px)] overflow-hidden">
      <div className="w-full h-screen absolute flex z-0 item-center justify-center">
        <div className="absolute top-[70%] opacity-30">
          <BackgroundCircles />
        </div>
      </div>
      <div className="flex flex-col relative z-20">
        <div className="lg:flex lg:justify-center lg:items-center">
          <div className="w-full lg:w-9/12 flex flex-col text-center mt-16 p-10 gap-5 items-center justify-center">
            <h1 className="text-5xl font-semibold lg:text-7xl md:text-6xl">
              Your Ultimate Finance Companion.
            </h1>
            <h2 className="text-xl lg:text-2xl lg:w-2/3 md:text-2xl text-gray-500">
              Master your finances effortlessly with our intuitive expense
              management app.
            </h2>
            <Link
              className="px-5 py-3 rounded-xl border border-white hover:bg-custom-gradient bg-white font-semibold hover:text-[green]"
              to="/signup"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
      <img
        src="/moneyThree.png"
        alt="money"
        width={300}
        className="absolute top-[50%] left-[25%] md:top-[55%] md:left-[30%] lg:left-[38%] xl:top-[65%] xl:left-[40%] opacity-35"
      />
    </div>
  );
};

export default Landing;
