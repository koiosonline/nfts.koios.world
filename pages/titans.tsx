import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import Image from "next/future/image";
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
        className="container relative mx-auto flex flex-wrap items-center justify-center gap-5 rounded-lg bg-zinc-900 p-5"
      >
        {items2 &&
          items2.map((item: IERC721MetadataModel, i: number) => (
            <div
              draggable={true}
              key={i}
              className="flex max-h-[500px] min-h-[150px] min-w-[150px] max-w-[150px] flex-col gap-2 rounded-lg bg-zinc-800 p-5 sm:min-w-[200px] md:min-w-[200px] md:max-w-[300px] md:gap-5 md:p-5"
            >
              <Image
                width={300}
                className="h-full w-full max-w-[300px] rounded-lg"
                src={item.image}
                alt={item.name}
              />

              <h1 className="truncate text-center font-heading text-zinc-200">
                {item.name}
              </h1>
            </div>
          ))}
      </div>
      <div className="h-[20vh] w-full"></div>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_URL}/api/metadata/erc721`);

  const items: IERC721MetadataModel[] = await res.json();

  return {
    props: {
      items,
    },

    revalidate: 60,
  };
}

export default Titans;
