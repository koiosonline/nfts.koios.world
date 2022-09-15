import "../styles/globals.scss";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Menu from "@/components/menu/Menu";
import CouponNotif from "@/components/coupon/CouponNotif";
import Head from "next/head";
import TestNetwork from "@/components/network/TestNetwork";

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
        <Head>
          <title>KOIOS NFT App</title>
          <meta name="description" content="Created by PauwCrypto" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main
          className={
            "relative flex h-full min-h-screen w-full flex-col items-center gap-20 overflow-x-hidden overflow-y-hidden bg-default-text"
          }
        >
          <Menu />
          <TestNetwork />
          <Component {...pageProps} />
          <CouponNotif />
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
