import { TbSwitch2 } from "react-icons/tb";

const SwitchButton = ({ setSingleUpload, singleUpload }: any) => {
  return (
    <>
      <button
        className="flex items-center justify-between gap-5 rounded bg-brand-rose-hot-pink px-6 py-2.5 text-xs uppercase leading-tight text-default-text shadow-md transition duration-300 hover:bg-brand-purple-heliotrope"
        type="button"
        onClick={() => setSingleUpload(!singleUpload)}
      >
        Switch Mode
        <TbSwitch2 size={25} />
      </button>
    </>
  );
};
export default SwitchButton;
