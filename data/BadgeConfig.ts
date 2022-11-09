import eContract from "@/data/ECTBadges.json";
export const BadgeConfig = {
  addressOrName: process.env.BADGES_CONTRACT_ADDRESS!,
  contractInterface: eContract.abi,
};
