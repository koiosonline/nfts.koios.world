import { useUserStore } from "@/state/store";
import { AiOutlineCloudDownload } from "react-icons/ai";

const SignatureCard = ({ proofHash, proofSignature, tokenId }: any) => {
  const user = useUserStore((state) => state.user);
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const data = {
      RandomSalt: proofHash,
      Signature: proofSignature,
      TokenId: tokenId,
    };
    const file2 = new Blob([JSON.stringify(data)], {
      type: "json",
    });
    element.href = URL.createObjectURL(file2);
    element.download = `Token_${tokenId}_Proof_For_${user}.json`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      {proofHash && proofSignature && (
        <>
          <h1 className=" fill-brand-rose-hot-pink text-center font-heading text-xl uppercase text-brand-rose-hot-pink">
            Download Proof
          </h1>
          <p className="text-sm text-action-warning underline">
            Incase your browser crashes or the internet stops to work 😅
          </p>
          <AiOutlineCloudDownload
            onClick={downloadTxtFile}
            className="cursor-pointer fill-brand-rose-hot-pink transition duration-300 hover:fill-brand-purple-300"
            fill="#910dks"
            size={50}
          />
        </>
      )}
    </>
  );
};
export default SignatureCard;
