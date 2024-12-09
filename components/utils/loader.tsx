import { PuffLoader } from "react-spinners";

const LoaderCustom = ({ variant }: { variant?: string }) => {
  if (variant === "dark") {
    return (
      <div className="flex justify-center items-center h-full flex-col text-center space-y-6">
        <PuffLoader
          color="#2D8653"
          size={64}
        />
        <span className={"text-2xl text-black "}>Chargement</span>
      </div>
    );
  }

  if (variant === "light") {
    return (
      <div className="flex justify-center items-center h-full flex-col text-center space-y-6">
        <PuffLoader
          color="#2D8653"
          size={64}
        />
        <span className={"text-2xl text-white "}>Chargement</span>
      </div>
    );
  }
};

export default LoaderCustom;
