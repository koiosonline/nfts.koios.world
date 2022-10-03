import { useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";

const TestNetwork = () => {
  const network = useNetwork();
  const account = useAccount();

  const [user, setUser] = useState<String | null>(null);

  useEffect(() => {
    if (account.address) setUser(account.address);
  }, [account.address]);

  if (user && network.chain?.id !== 137) {
    return (
      <div className="container z-50 flex h-20 w-full animate-pulse items-center justify-center rounded bg-action-warning md:h-10">
        <h1 className="text-center font-heading text-base text-slate-900 md:text-xl">
          ATTENTION: you are connected to a test network! Please, switch to
          Polygon!
        </h1>
      </div>
    );
  }

  return null;
};

export default TestNetwork;
