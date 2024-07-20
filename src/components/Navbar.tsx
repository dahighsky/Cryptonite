import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-4 px-2 sm:px-6 md:px-16 sticky z-40 top-0 bg-primary">
      <Link href={"/"}>
        <div className="border-solid border-[1px] border-primary rounded-[4px] text-[0px] md:text-3xl text-secondary font-black p-2 bg-secondary flex items-center">
          <Image
            src={"/icons/light-logo.svg"}
            alt={"CRYPTOKNIGHT"}
            width={36}
            height={36}
          />
          CRYPTOKNIGHT
        </div>
      </Link>
      <div className="w-2/3 sm:w-1/2 md:w-1/3  border-solid border-[1px] border-primary rounded-[4px] text-xs px-3 flex bg-secondary">
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
          className="w-full px-1 py-[6px] active:outline-none focus:outline-none border-none bg-secondary text-secondary"
        />
      </div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
