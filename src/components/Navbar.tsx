import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-4 px-2 sm:px-6 md:px-16">
      <div className="border-solid border-[1px] border-gray-light rounded-[4px] text-xs p-2">
        <Image
          src={"/icons/light-logo.svg"}
          alt={"search"}
          width={36}
          height={36}
        />
      </div>
      <div className="w-2/3 sm:w-1/2 md:w-1/3  border-solid border-[1px] border-gray-light rounded-[4px] text-xs px-3 flex">
        <Image
          src={"/icons/search.svg"}
          alt={"search"}
          width={14}
          height={14}
          className="inline-block mr-2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-1 py-[6px] active:outline-none focus:outline-none border-none"
        />
      </div>
      {/* <div>Change Theme</div> */}
    </div>
  );
};

export default Navbar;
