import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import CouponPanel from "@/components/upload/CouponPanel";
import { IResponseMessage } from "@/models/IResponseMessage";
import DynamicUploadPanel from "@/components/upload/DynamicUploadPanel";
import BadgesUploadPanel from "@/components/upload/BadgesUploadPanel";

const options = [
  {
    id: 0,
    name: "Dynamic NFT",
  },
  {
    id: 1,
    name: "Coupons",
  },
  {
    id: 2,
    name: "Badges",
  },
];

const Upload = ({ isWhitelisted, user }: any) => {
  const account = useAccount();
  const [userAddress, setUserAddress] = useState("");
  const [mode, setMode] = useState(0);
  const [uploadMode, setUploadMode] = useState(0);

  useEffect(() => {
    setUserAddress(account?.address!);
  }, [account]);

  if (!isWhitelisted || userAddress !== user) {
    return (
      <div
        className={
          "flex h-full w-full items-center justify-center bg-default-text text-center font-heading text-8xl text-brand-rose-hot-pink"
        }
      >
        Not Allowed
      </div>
    );
  }
  return (
    <div
      className={
        "flex h-full w-full flex-col items-center justify-center bg-default-text text-center font-heading text-2xl"
      }
    >
      <div className="container mx-auto flex flex-col rounded-lg bg-zinc-900 p-4 md:flex-row ">
        <div className=" grid h-full min-h-[75vh] w-full grid-flow-row grid-cols-2 gap-5 rounded md:w-1/2">
          {options.map((option, index) => (
            <div
              onClick={() => setUploadMode(option.id)}
              key={index}
              className=" flex cursor-pointer items-center justify-center rounded bg-zinc-800 transition duration-300 hover:scale-95 hover:bg-zinc-700"
            >
              <h1 className="font-heading text-xl text-white md:text-4xl">
                {option.name}
              </h1>
            </div>
          ))}
        </div>
        <div className="h-full min-h-[75vh] w-full md:w-1/2">
          {uploadMode === 0 && <DynamicUploadPanel />}
          {uploadMode === 1 && <CouponPanel />}
          {uploadMode === 2 && <BadgesUploadPanel />}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { address } = context.query;

  const res = await fetch(
    `${process.env.API_URL}/api/whitelist/findAddress/${address}`
  );

  const data: IResponseMessage = await res.json();

  // const resType = await fetch(
  //   `${process.env.LOCAL_URL}/api/getAchievementTypes`
  // );
  // const typeData: IResponseMessage = await resType.json();

  return {
    props: {
      isWhitelisted: data.success,
      user: address,
      //achievementTypes: typeData.data,
    },
  };
}

export default Upload;
