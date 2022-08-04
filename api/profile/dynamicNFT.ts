import { useContractRead } from "wagmi";
import eContract from "@/data/EvolvingTitan.json";

export const fetchDynamicNFTData = async (address: string) => {
  const { data } = useContractRead({
    addressOrName: "0x76355707EE63A1923246490A0E1ecc540EA33654",
    contractInterface: eContract.abi,
    functionName: "balanceOf",
    args: `${address}`,
  });
  console.log("adad");
  console.log(data);
  //   const res = await fetch(`/api/dynamicNFT/${address}`);
  //   const resJson = await res.json();
  //return resJson;
};

export const getSignature = async (address: string) => {
  const res = await fetch(`/api/profile/dynamicNFT?address=${address}`);
  return res;
};
