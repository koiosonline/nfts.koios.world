import ImageComponent from "@/components/titans/ImageComponent";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import swearWords from "@/data/swear_words.json";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useState } from "react";

function shuffleArray(array: any) {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}

const Titans = ({ items }: any) => {
  const [parent] = useAutoAnimate<HTMLDivElement>({
    easing: "ease-in-out",
  });
  const [items2, setItems] = useState<any>(null);
  useEffect(() => {
    setItems(shuffleArray(items));
  }, []);

  return (
    <>
      <div
        ref={parent}
        className="container mx-auto rounded-lg bg-zinc-900 p-4 "
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {items2 &&
            items2.map((item: IERC721MetadataModel, i: number) => (
              <ImageComponent key={i} {...item} />
            ))}
        </div>
      </div>
      <div className="h-[20vh] w-full"></div>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_URL}/api/metadata/erc721`);

  const items: IERC721MetadataModel[] = await res.json();

  const swear_filtered = items.filter(
    (item) => !swearWords.words.includes(item.name.toLowerCase())
  );

  const filtered_items = swear_filtered.filter(
    (item) => item.name !== "Unknown Titan"
  );

  return {
    props: {
      items: filtered_items,
    },

    revalidate: 60,
  };
}

export default Titans;
