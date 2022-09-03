import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useEvolveStore } from "@/state/store";
import Canvas from "./Canvas";

const CanvasComposer = (props: IERC721MetadataModel) => {
  const ownedLayers = useEvolveStore((state) => state.ownedLayers);
  const titan = useEvolveStore((state) => state.titan);

  const draw = (context: any) => {
    if (props.attributes[0].value === "Blockchain") {
      let image = new Image();
      image.src =
        "https://koios-titans.ams3.digitaloceanspaces.com/titans/images/baseModel_Cryp.png";
      image.onload = () => {
        context.drawImage(image, 0, 0, 1000, 1000);
      };
    } else {
      let image = new Image();
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
          let image = new Image();
          image.onload = () => {
            context.drawImage(image, 0, 0, 1000, 1000);
          };
          image.src = layer.image;
        }
      }
    });
  };

  return (
    <div className="flex h-full w-full object-contain">
      <Canvas draw={draw} width={1000} height={1000} />
    </div>
  );
};
export default CanvasComposer;
