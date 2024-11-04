import { useEffect, useState } from "react";

import { KoiosProvider, MeshWallet } from "@meshsdk/core";

import Button from "../common/button";
import { useWallet, useWalletList } from "../hooks";
import { MenuItem } from "./menu-item";
import { WalletBalance } from "./wallet-balance";

interface ButtonProps {
  label?: string;
  onConnected?: Function;
  isDark?: boolean;
  metamask?: {
    network: string;
  };
  extensions?: number[];
}

export const CardanoWallet = ({
  label = "Connect Wallet",
  onConnected = undefined,
  isDark = false,
  metamask = undefined,
  extensions = [],
}: ButtonProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hideMenuList, setHideMenuList] = useState(true);

  const { connect, connecting, connected, disconnect, setWallet, name } =
    useWallet();
  const wallets = useWalletList({ metamask });

  useEffect(() => {
    if (connected && onConnected) {
      onConnected();
    }
  }, [connected]);

  useEffect(() => {
    setIsDarkMode(isDark);
  }, [isDark]);

  function connectLocalWallet() {
    const storageMeshWallet = localStorage.getItem("mesh-wallet");
    console.log("storageMeshWallet", storageMeshWallet);

    const blockchainProvider = new KoiosProvider("api");

    if (storageMeshWallet !== null) {
      // const wallet = JSON.parse(storageMeshWallet);

      const wallet = new MeshWallet({
        networkId: 0, // 0: testnet, 1: mainnet
        fetcher: blockchainProvider,
        submitter: blockchainProvider,
        key: {
          type: "mnemonic",
          words: [
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
            "solution",
          ],
        },
      });

      setWallet("Mesh", wallet);
    }
  }

  return (
    <div
      onMouseEnter={() => setHideMenuList(false)}
      onMouseLeave={() => setHideMenuList(true)}
      style={{ width: "min-content", zIndex: 50 }}
    >
      <Button
        isDarkMode={isDarkMode}
        hideMenuList={hideMenuList}
        setHideMenuList={setHideMenuList}
      >
        <WalletBalance
          connected={connected}
          connecting={connecting}
          label={label}
          wallet={wallets.find((wallet) => wallet.id === name)}
        />
      </Button>
      <div
        className={`mesh-mr-menu-list mesh-absolute mesh-w-60 mesh-rounded-b-md mesh-border mesh-text-center mesh-shadow-sm mesh-backdrop-blur ${hideMenuList && "mesh-hidden"} ${isDarkMode ? `mesh-bg-neutral-950	mesh-text-neutral-50` : `mesh-bg-neutral-50	mesh-text-neutral-950`}`}
        style={{ zIndex: 50 }}
      >
        {!connected && wallets.length > 0 ? (
          <>
            {wallets.map((wallet, index) => (
              <MenuItem
                key={index}
                icon={wallet.icon}
                label={wallet.name}
                action={() => {
                  connect(wallet.id, extensions);
                  setHideMenuList(!hideMenuList);
                }}
                active={name === wallet.id}
              />
            ))}
            <MenuItem
              icon={
                isDarkMode
                  ? `https://meshjs.dev/logo-mesh/white/logo-mesh-white-128x128.png`
                  : `https://meshjs.dev/logo-mesh/black/logo-mesh-black-128x128.png`
              }
              label={"Mesh"}
              action={() => {
                connectLocalWallet();
                setHideMenuList(!hideMenuList);
              }}
              active={false}
            />
          </>
        ) : wallets.length === 0 ? (
          <span>No Wallet Found</span>
        ) : (
          <>
            <MenuItem
              active={false}
              label="disconnect"
              action={disconnect}
              icon={undefined}
            />
          </>
        )}
      </div>
    </div>
  );
};
