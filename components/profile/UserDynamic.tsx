import IERC721MetadataModel from "@/models/IERC721MetadataModel";

const UserDynamic = (data: IERC721MetadataModel) => {
  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="h-1/4 truncate font-heading text-2xl uppercase text-gray-200">
        {data.name}
      </h1>
      <img
        width={850}
        height={850}
        className="h-full w-full rounded object-contain text-xl"
        src={data.image}
        alt="Metadata Image"
      />
    </div>
  );
};

export default UserDynamic;
