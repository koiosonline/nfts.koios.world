export default interface IUserClaimModel {
  address: string;
  tokenId: number;
  salt: string;
  proof: string;
  contractAddress: string;
  dateAdded: Date;
}
