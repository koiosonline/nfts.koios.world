import { useUserData } from "@/api/hooks/useUserData";
import { useNFTState, useUserStore } from "@/state/store";
import Link from "next/link";
import { useEffect } from "react";

const CouponNotif = () => {
  const user = useUserStore((state) => state.user);
  const setCoupons = useNFTState((state) => state.setCoupons);
  const coupons = useNFTState((state) => state.coupons);

  const { coupons: data, isError, isLoading } = useUserData(user);

  useEffect(() => {
    if (data && data.data) {
      setCoupons(data.data.amount);
    } else {
      setCoupons(0);
    }
  }, [data]);

  if (coupons && coupons > 0) {
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
