import { useEffect, useState } from "react";

import type { WalletInfo } from "@meshsdk/common";
import { BrowserWallet } from "@meshsdk/wallet";

export const useWalletList = ({
  metamask = undefined,
}: {
  metamask?: {
    network: string;
  };
} = {}) => {
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  useEffect(() => {
    async function get() {
      setWallets(await BrowserWallet.getAvailableWallets({ metamask }));
    }
    get();
  }, []);

  return wallets;
};
