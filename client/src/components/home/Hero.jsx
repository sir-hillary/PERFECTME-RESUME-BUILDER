import { Link } from "react-router-dom";
import { useContext } from "react";
import { 
  ArrowRight, 
  Play,
  Star
} from "lucide-react";
import { AppContext } from "../../context/AppContext";

const Hero = () => {
  const { userData, isLoggedIn } = useContext(AppContext);

  const logos = [
    "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg",
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black pt-12">
        <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-green-300 blur-[100px] opacity-30"></div>

        {/* Avatars + Stars */}
        <div className="flex items-center mt-16">
          <div className="flex -space-x-3 pr-3">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-1" />
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2" />
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-3" />
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-4" />
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user5" className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-5" />
          </div>

          <div>
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} size={16} className="text-transparent fill-green-600" aria-hidden="true" />
              ))}
            </div>
            <p className="text-sm text-gray-700">Used by 10,000+ users</p>
          </div>
        </div>

        {/* Headline + CTA */}
        <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px]">
          Create Your Future with an{" "}
          <span className="bg-linear-to-r from-green-700 to-green-600 bg-clip-text text-transparent text-nowrap">
            AI-Powered{" "}
          </span>{" "}
          Resume.
        </h1>

        <p className="max-w-md text-center text-base my-7 text-gray-600">
          Create modern, professional CVs tailored for Kenyan and global markets - instantly.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to={userData ? "/app" : "/login"}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-green-400 flex items-center transition-colors shadow-lg shadow-green-200 font-medium"
          >
            {isLoggedIn && userData ? "Go to Dashboard" : "Build Resume"}
            <ArrowRight size={16} className="ml-1" />
          </Link>
          <button className="flex items-center gap-2 border border-slate-400 hover:bg-green-50 transition rounded-full px-7 h-12 text-slate-700 font-medium">
            <Play size={20} />
            <span>Try demo</span>
          </button>
        </div>

        <p className="py-6 text-slate-600 mt-14">
          Trusted by leading brands, including
        </p>

        <div className="flex flex-wrap justify-between max-sm:justify-center gap-6 max-w-3xl w-full mx-auto py-4" id="logo-container">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="logo"
              className="h-6 w-auto max-w-xs opacity-70 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          * { font-family: 'Poppins', sans-serif; }
        `}
      </style>
    </div>
  );
};

export default Hero;