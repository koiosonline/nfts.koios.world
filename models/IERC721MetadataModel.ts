import IPropModel from "./IPropModel";

export default interface IERC721MetadataModel {
  tokenId: number;
  name: string;
  image: string;
  description: string;
  external_url: string;
  attributes: IPropModel[];
}
