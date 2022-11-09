import { useUserBadgeClaims } from "@/api/hooks/useUserBadgeClaims";
import { useUserBadges } from "@/api/hooks/useUserBadges";
import BadgeClaimModal from "@/components/badges/BadgeClaimModal";
import BadgeComponent from "@/components/badges/BadgeComponent";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useModalStore, useUserStore } from "@/state/store";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AnimatePresence } from "framer-motion";

const Badges = ({ items }: any) => {
  const user = useUserStore((state) => state.user);
  const openClaims = useModalStore((state) => state.openClaims);
  const toggleClaimsModal = useModalStore((state) => state.toggleClaimsModal);
  const [parent] = useAutoAnimate<HTMLDivElement>({
    easing: "ease-in-out",
  });
  const { data, isError, isLoading } = useUserBadgeClaims(user);
  if (!user) {
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
    <>
      <AnimatePresence>
        {openClaims ? <BadgeClaimModal {...items} /> : null}
      </AnimatePresence>
      <div
        ref={parent}
        className="container mx-auto  flex flex-col gap-5 rounded-lg bg-zinc-900 p-4 "
      >
        {data && data.length > 0 ? (
          <div className="flex h-full w-full justify-start">
            <button
              onClick={() => toggleClaimsModal()}
              className="relative h-10 w-40 rounded  bg-zinc-800 p-3 text-center font-base text-xs font-semibold uppercase text-pink-500 transition duration-300 hover:bg-zinc-700"
            >
              Check Claims!
            </button>
          </div>
        ) : null}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {items &&
            items.map((item: IERC721MetadataModel, i: number) => (
              <BadgeComponent {...item} key={i} />
            ))}
        </div>
      </div>
      <div className="h-[20vh] w-full"></div>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_URL}/api/metadata/badges`);
  const items: IERC721MetadataModel[] = await res.json();

  return {
    props: {
      items,
    },
    revalidate: 60,
  };
}

export default Badges;
