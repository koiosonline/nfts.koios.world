import { useUserDynamicNFT } from "@/api/hooks/useUserDynamicNFT";
import { useUserStore } from "@/state/store";

const MetadataPanel = () => {
  const user = useUserStore((state) => state.user);
  const { data, isLoading, isError } = useUserDynamicNFT(user);
  return (
    <>
      {data ? (
        <>
          <div className="flex h-[10%] w-full text-left">
            <h1 className="truncate font-heading text-xl uppercase lg:text-2xl">
              {data.name ? data.name : "Read below on how to obtain one!"}
            </h1>
          </div>
          <div className="flex max-h-[200px] w-full flex-col justify-between overflow-y-scroll text-left text-sm md:h-[30%] md:text-base lg:text-lg">
            <p className="font-base italic text-gray-200/50">
              {data.description
                ? data.description
                : "To become eligible either follow the minor or be active in the community so a teacher whitelists you"}
            </p>
          </div>
          {data?.attributes && (
            <div className="flex h-[60%] w-full flex-col gap-2">
              <div className="h-1/6 w-full text-left">
                <h1 className="font-heading text-xl uppercase ">Attributes</h1>
              </div>
              <div className="grid h-5/6 w-full grid-flow-row grid-cols-2 gap-2 md:grid-flow-row md:grid-rows-3 lg:grid-cols-3 xl:grid-cols-4">
                {data.attributes.map((attribute, index) => (
                  <div
                    className="flex h-full w-full flex-col items-center justify-evenly rounded border-[1px] border-brand-rose-hot-pink bg-brand-rose-hot-pink/10 p-3 "
                    key={index}
                  >
                    <h1 className="font-heading text-sm uppercase text-brand-rose-hot-pink md:text-lg">
                      {attribute.trait_type}
                    </h1>
                    <h1 className="font-base text-sm md:text-base">
                      {attribute.value}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex h-[10%] w-full text-left">
          <h1 className="font-heading text-2xl uppercase md:text-4xl">
            To be eligible you have to be whitelisted by a tutor
          </h1>
        </div>
      )}
    </>
  );
};
export default MetadataPanel;
