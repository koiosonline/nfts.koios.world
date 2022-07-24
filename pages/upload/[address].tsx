import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import CouponPanel from "@/components/upload/CouponPanel";
import { IResponseMessage } from "@/models/IResponseMessage";
import DynamicNFTPanel from "@/components/upload/DynamicNFTPanel";

const Upload = ({ isWhitelisted, user }: any) => {
  const account = useAccount();
  const [userAddress, setUserAddress] = useState("");
  const [mode, setMode] = useState(0);

  useEffect(() => {
    setUserAddress(account?.address!);
  }, [account]);

  if (!isWhitelisted || userAddress !== user) {
    return (
      <div
        className={
          "flex h-screen w-full items-center justify-center bg-default-text text-center font-heading text-8xl text-brand-rose-hot-pink"
        }
      >
        Not Allowed
      </div>
    );
  }
  return (
    <div
      className={
        "flex h-screen w-full flex-col items-center justify-center bg-default-text text-center font-heading text-2xl "
      }
    >
      <div className="flex w-1/3 items-center justify-around rounded ">
        <div
          onClick={() => setMode(0)}
          className="flex h-14 w-48 items-center justify-center rounded bg-brand-purple-heart uppercase leading-tight text-default-text shadow-md transition duration-300 hover:cursor-pointer hover:bg-brand-purple-heliotrope"
        >
          Dynamic NFT
        </div>
        <div
          onClick={() => setMode(1)}
          className="flex h-14 w-48 items-center justify-center rounded bg-brand-purple-heart uppercase leading-tight text-default-text shadow-md transition duration-300 hover:cursor-pointer hover:bg-brand-purple-heliotrope"
        >
          Coupons
        </div>
      </div>
      {/* <UploadPanel achievementTypes={achievementTypes} /> */}
      {mode === 0 ? <DynamicNFTPanel /> : <CouponPanel />}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { address } = context.query;

  const res = await fetch(
    `${process.env.LOCAL_URL}/api/findAddress?address=${address}`
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
