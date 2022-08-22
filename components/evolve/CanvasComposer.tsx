import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useEvolveStore } from "@/state/store";
import { useEffect, useRef } from "react";

const CanvasComposer = (props: IERC721MetadataModel) => {
  const canvasRef = useRef(null);
  const ownedLayers = useEvolveStore((state) => state.ownedLayers);
  const titan = useEvolveStore((state) => state.titan);
  const actions = useEvolveStore((state) => state.actions);

  useEffect(() => {
    const canvas: any = canvasRef.current;

    const context = canvas.getContext("2d");
    if (props.attributes[0].value === "Blockchain") {
      const image = new Image();
      image.src =
        "https://koios-titans.ams3.digitaloceanspaces.com/titans/images/baseModel_Cryp.png";
      image.onload = () => {
        context.drawImage(image, 0, 0, 1000, 1000);
      };
    } else {
      const image = new Image();
      image.src =
        "https://koios-titans.ams3.digitaloceanspaces.com/titans/images/baseModel_Trade.png";
      image.onload = () => {
        context.drawImage(image, 0, 0, 1000, 1000);
      };
    }
    titan.forEach((tokenId, traitType) => {
      if (tokenId !== 0) {
        const layer = ownedLayers.find(
          (layerItem) =>
            layerItem.tokenId === tokenId &&
            layerItem.attributes[0].trait_type === traitType
        );
        if (layer) {
          const image = new Image();
          image.src = layer.image;
          image.onload = () => {
            context.drawImage(image, 0, 0, 1000, 1000);
          };
        }
      } else {
        context.fillRect(0, 0, 1000, 1000);
      }
    });
  }, [titan, actions]);

  return (
    <div className="flex h-full w-full object-contain">
      <canvas
        width={1000}
        height={1000}
        className="h-full w-full"
        ref={canvasRef}
      />
    </div>
  );
};
export default CanvasComposer;
