import { useUserCoupons } from "@/api/hooks/useUserCoupons";
import { useUserStore } from "@/state/store";
import Link from "next/link";
import { useState } from "react";
import { FiMinimize2 } from "react-icons/fi";
import { RiCoupon3Line } from "react-icons/ri";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const CouponNotif = () => {
  const user = useUserStore((state) => state.user);
  const [minified, setMinified] = useState(false);
  const { data, isError, isLoading } = useUserCoupons(user);
  const [parent] = useAutoAnimate<HTMLDivElement>({
    easing: "ease-in-out",
  });

  if (data && data.amount > 0 && !minified) {
    return (
      <div ref={parent} className="fixed bottom-5 left-5 ">
        <div
          className=" relative
     flex h-24 w-72 flex-col justify-between gap-2 rounded bg-zinc-800 p-2 text-center "
        >
          <h1 className="animate-pulse font-heading text-xl text-zinc-400">
            You&apos;ve got coupons!
          </h1>
          <div className="absolute -top-1 -right-1 flex h-4 w-4 items-end justify-end align-bottom ">
            <span className="absolute h-4 w-4 animate-ping rounded-full bg-pink-500 opacity-75"></span>
            <span className="relative h-4 w-4 rounded-full bg-brand-rose-hot-pink"></span>
          </div>
          <div className="flex h-8 w-full justify-between gap-1">
            <Link href="/exchange">
              <button className="w-full rounded bg-brand-rose-hot-pink text-center font-heading text-base transition duration-300 hover:bg-brand-rose-lavender">
                Exchange ({data.amount})
              </button>
            </Link>
            <button
              onClick={() => setMinified(!minified)}
              className="1/4 h-8 rounded bg-brand-rose-hot-pink p-2 transition duration-300 hover:bg-brand-rose-lavender"
            >
              <FiMinimize2 className="" fill="#9sw2ds" size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (data && data.amount > 0 && minified) {
    return (
      <div
        ref={parent}
        className="fixed bottom-5 left-5 animate-pulse cursor-pointer fill-brand-rose-hot-pink"
      >
        <RiCoupon3Line
          fill="#9sw2ds"
          onClick={() => setMinified(!minified)}
          size={70}
        />
      </div>
    );
  }

  return null;
};

export default CouponNotif;
