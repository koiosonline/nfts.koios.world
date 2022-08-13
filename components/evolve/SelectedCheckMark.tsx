import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useEvolveStore } from "@/state/store";
import { useEffect } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

const SelectedCheckmark = (item: IERC721MetadataModel) => {
  const titan = useEvolveStore((state) => state.titan);
  const actions = useEvolveStore((state) => state.actions);

  useEffect(() => {}, [actions]);

  if (titan.get(item.attributes[0].trait_type) === item.tokenId) {
    return (
      <div className="absolute -right-3 -bottom-3 fill-green-500">
        <IoIosCheckmarkCircle fill="empty" size={35} />
      </div>
    );
  }

  return null;
};
export default SelectedCheckmark;
