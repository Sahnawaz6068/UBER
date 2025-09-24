const LocationSearchPanel = () => {
  //Sample array for location
  const location = [
    "24B,Near Kapoor's cafe,Sheriyans Coding School,Bhopal",
    "22B,Near Malhotrta's cafe,Sheriyans Coding School,Bhopal",
    "21B,Near Sharma's cafe,Sheriyans Coding School,Bhopal",
  ];
  return (
    <div>
      <div className="flex items-center   border-2 border-gray-100 active:border-black p-3 rounded-xl  justify-start gap-2 my-2   w-[95%]">
        <h2 className="bg-[#eee] h-8 flex items-center justify-center w-16 rounded-full">
          <i className="ri-map-pin-fill text-xl "></i>
        </h2>
        <h4 className="font-medium">
          24B,Near Kapoor's cafe,Sheriyans Coding School,Bhopal
        </h4>
      </div>
      <div className="flex items-center  border-2 border-gray-100 active:border-black p-3 rounded-xl  justify-start gap-2 my-2 w-[95%]">
        <h2 className="bg-[#eee] h-8 flex items-center justify-center w-16 rounded-full">
          <i className="ri-map-pin-fill text-xl "></i>
        </h2>
        <h4 className="font-medium">
          24B,Near Kapoor's cafe,Sheriyans Coding School,Bhopal
        </h4>
      </div>
      <div className="flex items-center  border-2 border-gray-100 active:border-black p-3 rounded-xl  justify-start gap-2 my-2 w-[95%]">
        <h2 className="bg-[#eee] h-8 flex items-center justify-center w-16 rounded-full">
          <i className="ri-map-pin-fill text-xl "></i>
        </h2>
        <h4 className="font-medium">
          24B,Near Kapoor's cafe,Sheriyans Coding School,Bhopal
        </h4>
      </div>
      <div className="flex items-center  border-2 border-gray-100 active:border-black p-3 rounded-xl  justify-start gap-2 my-2 w-[95%]">
        <h2 className="bg-[#eee] h-8 flex items-center justify-center w-16 rounded-full">
          <i className="ri-map-pin-fill text-xl "></i>
        </h2>
        <h4 className="font-medium">
          24B,Near Kapoor's cafe,Sheriyans Coding School,Bhopal
        </h4>
      </div>
    </div>
  );
};

export default LocationSearchPanel;
