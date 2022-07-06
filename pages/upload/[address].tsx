import { useEffect } from "react";
import UploadPanel from "../../components/upload/UploadPanel";

const upload = ({ isWhitelisted }: any) => {
  useEffect(() => {
    console.log(isWhitelisted);
  }, []);

  if (!isWhitelisted) {
    return (
      <div
        className={
          "flex h-screen w-full items-center justify-center bg-default-text text-center font-heading text-8xl text-brand-rose-hot-pink"
        }
      >
        Not Allowed
      </div>
    );
  }
  return (
    <div
      className={
        "flex h-screen w-full items-center justify-center bg-default-text text-center font-heading text-8xl text-brand-rose-hot-pink"
      }
    >
      <UploadPanel />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { address } = context.query;

  const res = await fetch(
    `${process.env.LOCAL_URL}/api/findAddress?address=${address}`
  );
  const data = await res.json();
  return {
    props: {
      isWhitelisted: data.found,
    },
  };
}

export default upload;
