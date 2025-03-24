import workingBg from "../../../public/assets/Images/working.jpg";

const UnderConstruction = () => {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen text-gray-900 dark:text-white p-6"
      style={{
        backgroundImage: `url(${workingBg})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      
     
    </div>
  );
};

export default UnderConstruction;
