const NotFound = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute w-full h-full bg-[url('/404bg.jpg')] bg-cover after:content-[''] after:absolute after:w-full after:h-full after:bg-[rgba(0,0,0,0.25)]"></div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[600px] w-full text-center p-8 bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-lg">
        <div className="relative h-[200px]">
          <h1 className="font-passion absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[220px] m-0 text-[#222225] uppercase">
            404
          </h1>
        </div>
        <h2 className="font-muli text-[26px] font-normal uppercase text-[#222225] mt-6 mb-5">
          Oops! Page Not Found
        </h2>
        <a
          href="/"
          className="font-muli inline-block font-normal text-[#222225] uppercase text-[14px]"
        >
          Back To Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
