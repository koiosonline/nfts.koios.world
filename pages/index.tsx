import DynamicNFTPanel from "@/components/profile/DynamicNFTPanel";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const account = useAccount();
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    setUserAddress(account?.address!);
  }, [account]);

  if (!userAddress) {
    return (
      <div
        className={
          "flex h-full w-full items-center justify-center bg-default-text text-center font-heading text-8xl text-brand-rose-hot-pink"
        }
      >
        Please Login
      </div>
    );
  }

  return (
    <div
      className={
        "relative flex h-full w-full flex-col items-center justify-center gap-5 bg-default-text p-10 pt-20 text-center font-heading text-8xl text-brand-rose-hot-pink xl:p-44"
      }
    >
      <DynamicNFTPanel />
    </div>
  );
};

export default Home;
