import { useUserStore } from "@/state/store";
import { useUserDynamicNFT } from "@/api/hooks/useUserDynamicNFT";
import UserDynamic from "./UserDynamic";
import UserNoDynamic from "./UserNoDynamic";
import MetadataPanel from "./MetadataPanel";

const DynamicNFTPanel = () => {
  const user = useUserStore((state) => state.user);
  const { data, isLoading, isError } = useUserDynamicNFT(user);

  return (
    <div className="flex h-full w-full flex-col justify-between gap-5 pt-20 md:h-[70vh] md:flex-row md:items-center md:p-10">
      {!isLoading && (
        <div className="flex h-5/6 w-full flex-col gap-5 rounded bg-zinc-800 p-5 md:h-full md:min-h-full md:w-1/3">
          {data && data.tokenId && <UserDynamic {...data} />}
          {data && !data.tokenId && <UserNoDynamic />}
        </div>
      )}
      {isLoading && (
        <div className="flex h-5/6 w-full flex-col gap-5 rounded bg-zinc-800 p-5 md:h-full md:min-h-full md:w-1/3">
          <div className="h-1/6 w-full animate-pulse rounded bg-zinc-900"></div>
          <div className="h-5/6 w-full animate-pulse rounded bg-zinc-900"></div>
        </div>
      )}
      {!isLoading && (
        <div className="flex h-5/6 w-full flex-col gap-5 rounded bg-zinc-800 p-8 text-gray-200 md:h-full md:w-2/3 ">
          <MetadataPanel />
        </div>
      )}
      {isLoading && (
        <div className="flex h-5/6 w-full flex-col gap-5 rounded bg-zinc-800 p-8 text-gray-200 md:h-full md:w-2/3 ">
          <div className="flex h-[10%] w-full animate-pulse rounded bg-zinc-900"></div>
          <div className="flex h-[10%] w-full animate-pulse rounded bg-zinc-900"></div>
          <div className="flex h-5/6 w-full animate-pulse rounded bg-zinc-900"></div>
        </div>
      )}
      <div className="h-[10vh]"></div>
    </div>
  );
};

export default DynamicNFTPanel;
