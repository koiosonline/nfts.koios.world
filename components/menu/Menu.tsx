import Image from "next/image";
import { useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import MobileMenu from "./MobileMenu";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const Menu = () => {
  const links = [
    { title: "profile", path: "/" },
    { title: "exchange", path: "/exchange" },
    { title: "evolve", path: "/evolve" },
  ];

  const account = useAccount();

  const [active, setActive] = useState(false);
  const [isWhitelisted, setIsWhiteListed] = useState(false);

  const handleToggle = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (active) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  }, [active]);

  useEffect(() => {
    if (account) {
      const fetchData = async () => {
        const response = await fetch(
          `/api/findAddress?address=${account.address}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setIsWhiteListed(data.success);
        }
      };
      fetchData();
    }
  }, [account]);

  return (
    <div className="text-white-300 container absolute top-0 z-50 mx-auto h-20 w-full bg-default-text/90">
      <div className="mx-auto flex h-full w-full justify-between p-5 md:p-0">
        <div className="flex h-full items-center justify-center pt-10">
          <Image
            priority
            layout="fixed"
            width={100}
            height={100}
            className="h-auto w-full"
            src="/branding/koios-logo.svg"
            alt="Koios Logo"
          />
        </div>
        <div className="hidden h-full w-3/4 justify-between xl:flex">
          <div className=" flex h-full w-2/4 flex-col items-end justify-end">
            <ul className="flex items-center gap-12 font-heading uppercase text-white">
              {links.map((link, index) => (
                <Link href={link.path} key={index}>
                  <li className="cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1  hover:text-gray-400 active:text-gray-100">
                    {link.title}
                  </li>
                </Link>
              ))}
              {isWhitelisted && (
                <Link href={`/upload/${account.address}`}>
                  <li className="cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:text-gray-400 active:text-gray-100">
                    whitelisting
                  </li>
                </Link>
              )}
            </ul>
          </div>
          <div className="flex h-full w-2/4 items-end justify-end">
            <ConnectButton
              chainStatus={{
                smallScreen: "icon",
                largeScreen: "icon",
              }}
              accountStatus={{
                smallScreen: "address",

                largeScreen: "full",
              }}
              showBalance
            />
          </div>
        </div>
        <Hamburger handleToggle={handleToggle} props={active}></Hamburger>
      </div>
      <MobileMenu handleToggle={handleToggle} props={active} links={links} />
    </div>
  );
};

export default Menu;
