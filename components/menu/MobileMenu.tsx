import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const MobileMenu = ({ handleToggle, props, links }: any) => {
  if (props) {
    return (
      <div className="z-[70] flex h-screen w-screen cursor-pointer flex-col bg-default-text/90  bg-opacity-70 px-6 pt-10 backdrop-blur ">
        <div className="flex h-full w-full flex-col">
          <div className="flex h-1/6 items-start justify-center ">
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
          <ul className="text-white-300 h-5/6 w-full text-xl uppercase">
            {links.map((link: any, index: number) => (
              <Link href={link.path} key={index}>
                <li
                  onClick={handleToggle}
                  className="text-heading border-white-300/40 relative block w-full cursor-pointer items-center border-b-2 py-3 font-heading text-zinc-400 transition duration-300 hover:text-gray-200"
                >
                  {link.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return <></>;
};

export default MobileMenu;
