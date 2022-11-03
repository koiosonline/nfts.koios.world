import Image from "next/image";
import { useState } from "react";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ImageComponent = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-zinc-800 p-2 md:p-5">
      <Image
        height={300}
        width={300}
        layout="intrinsic"
        objectFit="cover"
        className={cn(
          "rounded-lg transition duration-700 ease-in-out",
          isLoading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        )}
        src={props.image}
        alt={props.name}
        onLoadingComplete={() => setIsLoading(false)}
      />
      <h1 className="truncate text-center font-heading text-sm text-zinc-200 md:text-xl">
        {props.name}
      </h1>
    </div>
  );
};
export default ImageComponent;
