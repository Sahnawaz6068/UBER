import { useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          paddingLeft: 20,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        });
      }
    },
    [panelOpen]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Logo */}
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      {/* Map */}
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Uber background"
        />
      </div>
      {/* Select the Journey details Pickup and destination */}
      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            onClick={() => setPanelOpen(!panelOpen)}
            className="absolute top-0 right-0 pr-5"
          >
            {panelOpen ? (
              <i className="ri-arrow-down-s-fill text-4xl"></i>
            ) : (
              <i className="ri-arrow-up-s-fill text-4xl"></i>
            )}
          </h5>

          <h4 className="text-2xl font-semibold">Find a Trip</h4>
          {/* Input boxes */}
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="line absolute h-16 w-1 top-[43%] rounded-full bg-gray-900 left-9"></div>
            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setPanelOpen(true)}
              className="bg-[#eee] px-8 py-2 text-base rounded-lg mt-4 w-full"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setPanelOpen(true)}
              className="bg-[#eee] px-8 py-2 text-base rounded-lg mt-4 w-full"
              typeA="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        <div ref={panelRef} className=" bg-white h-0">
          <LocationSearchPanel />
        </div>
      </div>
      
      {/* Select your vechical */}
      <div className="fixed z-10 bottom-0 bg-white translate-y-full py-6 px-3">
        {/* Uber car */}
        <div className="flex border-2 active:border-black rounded-xl my-2  p-3 items-center justify-between ">
          <img
            className="h-15 rounded-full"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-base">
              Uber Go{" "}
              <span>
                <i className="ri-user-3-fill"></i>4
              </span>{" "}
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-medium text-xs text-gray-600">
              affordable, compact rides
            </p>
          </div>
          <h2 className="p-5">₹193.20</h2>
        </div>
        {/* Uber moto */}
        <div className="flex border-2 active:border-black rounded-xl my-2  p-3 items-center justify-between ">
          <img
            className="h-15 rounded-full"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n"
            alt=""
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-base">
              Uber Moto{" "}
              <span>
                <i className="ri-user-3-fill"></i>2
              </span>{" "}
            </h4>
            <h5 className="font-medium text-sm">5 mins away</h5>
            <p className="font-medium text-xs text-gray-600">
              affordable,Moto rides
            </p>
          </div>
          <h2 className="p-5">₹63.20</h2>
        </div>
        {/* Uber auto */}
        <div className="flex border-2 active:border-black rounded-xl my-2  p-3 items-center justify-between ">
          <img
            className="h-15 rounded-full"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n"
            alt=""
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-base">
              Uber Auto{" "}
              <span>
                <i className="ri-user-3-fill"></i>3
              </span>{" "}
            </h4>
            <h5 className="font-medium text-sm">5 mins away</h5>
            <p className="font-medium text-xs text-gray-600">
              affordable,Auto rides
            </p>
          </div>
          <h2 className="p-5">₹118.69</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
