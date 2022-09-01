import MintERC721 from "./MintERC721";

const UserNoDynamic = () => {
  return (
    <div className="relative flex h-full w-full flex-col">
      <h1 className="h-1/6 font-heading text-2xl uppercase text-gray-200">
        No NFT
      </h1>
      <img
        width={850}
        height={850}
        className="h-3/4 w-full rounded object-contain"
        src="/nfts/unmintedNFT.png"
        alt="Unminted NFT"
      />
      <MintERC721 />
    </div>
  );
};

export default UserNoDynamic;
