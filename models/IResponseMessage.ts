export interface IResponseMessage {
  success: boolean;
  error?: boolean;
  message: string;
  data?: any;
}
