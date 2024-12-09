import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });
interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex flex-col items-center w-full gap-y-4 justify-center">
      <h1 className={cn("text-3xl font-semibold", font.className)}>{label}</h1>
    </div>
  );
};
