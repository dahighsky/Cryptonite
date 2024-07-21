import Image from "next/image";

const ZeroState = ({
  height,
  width,
  isRateLimit = false,
}: {
  height: number;
  width: number;
  isRateLimit: boolean;
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-secondary gap-2 p-4">
      <Image
        src={"/icons/light-logo.svg"}
        height={height}
        width={width}
        alt="loading"
      />
      <div className="text-orange font-bold">Error fetching data</div>
      {isRateLimit && (
        <div className="font-semibold text-secondary text-xs">
          API Rate Limit Exceeded. kindly try after a minute
        </div>
      )}
    </div>
  );
};

export default ZeroState;
