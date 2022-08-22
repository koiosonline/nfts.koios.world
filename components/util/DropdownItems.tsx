const DropdownItems = ({ items, handleItemChange }: any) => {
  return (
    <ul className="absolute z-50 mt-1 w-full cursor-pointer list-none rounded-lg border-none bg-zinc-300 bg-clip-padding py-2 text-left text-base shadow-lg">
      {items.map((item: any, index: number) => (
        <li
          className="block w-full whitespace-nowrap bg-transparent py-2 px-4 font-heading text-sm font-normal uppercase text-gray-700 hover:bg-gray-100"
          key={index}
          onClick={() => handleItemChange(index)}
        >
          {index}: {item.name}
        </li>
      ))}
    </ul>
  );
};
export default DropdownItems;
