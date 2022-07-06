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
    { title: "achievements", path: "/achievements" },
    { title: "claim", path: "/claim" },
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
        const data = await response.json();
        console.log(data);
        setIsWhiteListed(data.found);
      };
      fetchData();
    }
  }, [account]);

  return (
    <div className="top-0 h-20 w-full bg-default-text/90 text-white-300">
      <div className="mx-auto flex h-full w-full justify-between p-5 md:p-0">
        <div className="flex h-full w-1/4 items-center justify-center">
          <a href="/">
            <Image
              priority
              layout="fixed"
              width={100}
              height={100}
              className="h-auto w-full"
              src="/branding/koios-logo.svg"
              alt="Koios Logo"
            ></Image>
          </a>
        </div>
        <div className="hidden h-full w-3/4 justify-between md:flex">
          <div className=" flex h-full w-2/3 flex-col items-center justify-center ">
            <ul className="flex items-center gap-12 font-heading uppercase">
              {links.map((link, index) => (
                <Link href={link.path} key={index}>
                  <li className="cursor-pointer transition duration-300 hover:text-gray-200 active:text-gray-100">
                    {link.title}
                  </li>
                </Link>
              ))}
              {isWhitelisted && (
                <Link href={`/upload/${account.address}`}>
                  <li className="cursor-pointer transition duration-300 hover:text-gray-200 active:text-gray-100">
                    upload
                  </li>
                </Link>
              )}
            </ul>
          </div>
          <div className="flex h-full w-1/3 items-center justify-center">
            <ConnectButton
              chainStatus={{
                smallScreen: "icon",
                largeScreen: "full",
              }}
              accountStatus={{
                smallScreen: "address",
                largeScreen: "address",
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
