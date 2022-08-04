import ICouponModel from "@/models/ICouponModel";
import { IResponseMessage } from "@/models/IResponseMessage";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

const CouponNotif = () => {
  const account = useAccount();
  const [coupons, setCoupons] = useState<number | null>(null);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    setUserAddress(account?.address!);
    const fetchCoupons = async () => {
      if (userAddress) {
        const response = await fetch(
          `/api/coupon/getCoupons/?address=${userAddress}`
        );
        if (response.status === 200) {
          const data: IResponseMessage = await response.json();
          if (data.data) {
            const model: ICouponModel = data.data;
            setCoupons(model.amount);
          } else {
            setCoupons(null);
          }
        }
      }
    };
    fetchCoupons();
  }, [account]);

  if (coupons) {
    return (
      <div className="fixed bottom-5 left-5 ">
        <div
          className="relative
     flex h-24 w-60 flex-col justify-between gap-2 rounded bg-zinc-800 p-2 text-center "
        >
          <div className="absolute -top-1 -right-1 flex h-4 w-4 items-end justify-end align-bottom ">
            <span className="absolute h-4 w-4 animate-ping rounded-full bg-pink-500 opacity-75"></span>
            <span className="relative h-4 w-4 rounded-full bg-brand-rose-hot-pink"></span>
          </div>
          <h1 className="animate-pulse font-heading text-xl text-zinc-400">
            You&apos;ve got coupons!
          </h1>
          <Link href="/exchange">
            <div className="w-34 h-8 cursor-pointer rounded bg-brand-rose-hot-pink text-center font-heading text-base transition duration-300 hover:bg-brand-rose-lavender">
              Exchange ({coupons})
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return <></>;
};

export default CouponNotif;
