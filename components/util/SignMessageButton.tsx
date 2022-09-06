const SignMessageButton = ({ signMessage }: any) => {
  return (
    <>
      <button
        onClick={() => signMessage()}
        className={` my-5 flex w-full cursor-pointer justify-center rounded bg-brand-purple-heart p-4 text-lg text-default-text transition duration-300 hover:bg-brand-purple-portage`}
      >
        Sign
      </button>
    </>
  );
};
export default SignMessageButton;
