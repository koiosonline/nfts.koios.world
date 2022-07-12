const FormInputText = ({ setText, text }: any) => {
  return (
    <>
      <input
        onChange={(e) => setText(e.target.value)}
        className={`${
          text.length === 42 ? "outline-action-valid" : "outline-action-error"
        } w-full rounded py-2 px-3 font-heading text-lg leading-tight text-gray-700 outline-double outline-4 `}
        type="text"
        placeholder="Address"
      ></input>
    </>
  );
};

export default FormInputText;
