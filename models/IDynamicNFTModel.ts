import INFTModel from "./INFTModel";

export default interface IDynamicNFTModel {
  address: string;
  minted: boolean;
  NFT: INFTModel;
}
