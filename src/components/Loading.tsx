import Image from "next/image";

const Loading = ({ height, width }: { height: number; width: number }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-secondary">
      <Image
        src={"/icons/light-logo.svg"}
        height={height}
        width={width}
        alt="loading"
      />
      <div>Loading...</div>
    </div>
  );
};

export default Loading;
