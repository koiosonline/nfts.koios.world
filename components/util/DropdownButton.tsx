import { MdExpandLess, MdExpandMore } from "react-icons/md";

const DropdownButton = ({ setOpenMenu, openMenu, text }: any) => {
  return (
    <>
      <button
        className="flex min-w-[250px] items-center justify-between rounded bg-brand-rose-hot-pink px-6 py-2.5 font-heading text-xs uppercase leading-tight text-default-text shadow-md transition duration-300 hover:bg-brand-purple-heliotrope"
        type="button"
        onClick={() => setOpenMenu(!openMenu)}
      >
        {text}
        {!openMenu && <MdExpandMore size={25} />}
        {openMenu && <MdExpandLess size={25} />}
      </button>
    </>
  );
};
export default DropdownButton;
