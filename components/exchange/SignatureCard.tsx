const SignatureCard = ({ proofHash, proofSignature, tokenId }: any) => {
  return (
    <>
      {proofHash && proofSignature && (
        <>
          <h1 className="text-center font-heading text-2xl uppercase text-white">
            Signature Data
          </h1>
          <h2 className="font-heading text-xl uppercase text-zinc-400">
            Token: {tokenId}
          </h2>
          <h2 className="font-heading text-xl uppercase text-white">Salt</h2>
          <textarea
            readOnly
            value={proofHash}
            className="h-10 w-full resize-none overflow-hidden rounded bg-zinc-700 p-2 text-center font-heading text-white "
          ></textarea>
          <h2 className="font-heading text-xl uppercase text-zinc-400">
            Signature
          </h2>
          <textarea
            readOnly
            value={proofSignature}
            className="h-28 w-full resize-none rounded bg-zinc-700 p-2 text-center font-heading text-white"
          ></textarea>
        </>
      )}
    </>
  );
};
export default SignatureCard;
