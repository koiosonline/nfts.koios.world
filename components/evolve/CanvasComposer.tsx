import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useEvolveStore } from "@/state/store";

const CanvasComposer = (props: IERC721MetadataModel) => {
  const ownedLayers = useEvolveStore((state) => state.ownedLayers);
  const titan = useEvolveStore((state) => state.titan);
  
  return (
    <div className="relative flex h-full min-h-[500px] w-full items-center justify-center overflow-hidden rounded object-contain md:min-h-[500px] ">
      {props.attributes[0].value === "Blockchain" ? (
        <img
          className="absolute max-h-[450px] min-h-[250px] w-full object-contain  md:max-h-[500px]"
          src="https://koios-titans.ams3.digitaloceanspaces.com/titans/images/baseModel_Cryp.png"
          alt="Metadata Image"
        />
      ) : (
        <img
          className="absolute max-h-[450px] min-h-[250px] w-full object-contain md:max-h-[500px]"
          src="https://koios-titans.ams3.digitaloceanspaces.com/titans/images/baseModel_Trade.png"
          alt="Metadata Image"
        />
      )}
      {Array.from(titan.values()).map((tokenId, index) => {
        if (tokenId !== 0) {
          const layer = ownedLayers.find(
            (layerItem) => layerItem.tokenId === tokenId
          );
          if (layer) {
            return (
              <img
                key={index}
                className="absolute max-h-[450px] min-h-[250px] w-full object-contain md:max-h-[500px]"
                src={layer.image}
                alt="Metadata Image"
              />
            );
          }
        }
      })}
};
export default CanvasComposer;
