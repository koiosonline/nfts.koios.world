import "../styles/globals.scss";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  wallet,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Menu from "@/components/menu/Menu";
import CouponNotif from "@/components/coupon/CouponNotif";

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "nfts.koios.world",
  chains,
});

const AppInfo = {
  appName: "nfts.koios.world",
  //learnMoreUrl: "https://wiki.koios.world/", Link to the wiki (optional)
};

const connectors = connectorsForWallets([...wallets]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        showRecentTransactions={true}
        theme={darkTheme({
          accentColor: "#ff62a1",
          accentColorForeground: "#111012",
          borderRadius: "small",
        })}
        appInfo={AppInfo}
        chains={chains}
      >
        <main
          className={
            "relative flex min-h-screen w-full flex-col items-center justify-center bg-default-text p-44"
          }
        >
          <Menu />
          <Component {...pageProps} />
          <CouponNotif />
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
