const ErrorMessage = ({ errorMessage }: any) => {
  if (!errorMessage) return null;

  return <div className="text-lg text-action-error"> {errorMessage}</div>;
};

export default ErrorMessage;
