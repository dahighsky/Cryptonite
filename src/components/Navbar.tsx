import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import CoinSearch from "./Search";

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
      <CoinSearch />
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
