import DynamicNFTPanel from "@/components/profile/DynamicNFTPanel";
import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const account = useAccount();
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    setUserAddress(account?.address!);
  }, [account]);

  return (
    <>
      <Head>
        <title>KOIOS NFT App</title>
        <meta name="description" content="Created by PauwCrypto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!userAddress && (
        <div
          className={
            "flex h-full w-full items-center justify-center bg-default-text text-center font-heading text-8xl text-brand-rose-hot-pink"
          }
        >
          Please Login
        </div>
      )}

      {userAddress && (
        <>
          <div
            className={
              "relative flex h-full w-full flex-col items-center justify-center gap-5 bg-default-text text-center font-heading text-8xl text-brand-rose-hot-pink"
            }
          >
            <DynamicNFTPanel />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
