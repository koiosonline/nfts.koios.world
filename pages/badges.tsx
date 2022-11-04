import { useUserBadges } from "@/api/hooks/useUserBadges";
import BadgeComponent from "@/components/badges/BadgeComponent";
import ImageComponent from "@/components/titans/ImageComponent";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useUserStore } from "@/state/store";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Badges = ({ items }: any) => {
  const user = useUserStore((state) => state.user);
  const [parent] = useAutoAnimate<HTMLDivElement>({
    easing: "ease-in-out",
  });

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
      <div
        ref={parent}
        className="container mx-auto rounded-lg bg-zinc-900 p-4 "
      >
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
