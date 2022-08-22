import IERC721MetadataModel from "./IERC721MetadataModel";

export default interface IEvolveModel {
  saltHash: string;
  signature: string;
  model: IERC721MetadataModel;
  tokens: number[];
}
