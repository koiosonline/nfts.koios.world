import { useUserBadges } from "@/api/hooks/useUserBadges";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useUserStore } from "@/state/store";
import Image from "next/image";
import { useState } from "react";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BadgeComponent = (props: IERC721MetadataModel) => {
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const { data, isError, isLoading: badgesLoading } = useUserBadges(user);

  if (data.includes(props.tokenId)) {
    return (
      <div className="flex flex-col gap-4 rounded-lg bg-zinc-800 p-2 md:p-5">
        <Image
          height={300}
          width={300}
          layout="intrinsic"
          objectFit="contain"
          className={cn(
            "rounded-lg transition duration-700 ease-in-out ",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          src={props.image}
          alt={props.name}
          onLoadingComplete={() => setIsLoading(false)}
        />
        <h1 className="truncate text-center font-heading text-sm text-zinc-200 md:text-base">
          {props.name}
        </h1>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-2 rounded-lg bg-zinc-800 p-2 md:p-5">
      <div className="top-0 left-0 z-20 h-full w-full blur-[3px] grayscale">
        <Image
          height={300}
          width={300}
          layout="intrinsic"
          objectFit="contain"
          className={cn(
            "z-10 rounded-lg transition duration-700 ease-in-out",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          src={props.image}
          alt={props.name}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>

      <h1 className="truncate text-center font-heading text-sm text-zinc-200 md:text-base">
        {props.name}
      </h1>
    </div>
  );
};
export default BadgeComponent;
