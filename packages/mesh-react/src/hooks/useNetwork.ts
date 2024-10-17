import { useContext, useEffect, useState } from "react";

import { BrowserWallet, MeshWallet } from "@meshsdk/wallet";

import { WalletContext } from "../contexts";

export const useNetwork = () => {
  const [networkId, setNetworkId] = useState<number>();
  const { hasConnectedWallet, connectedWalletName, connectedWalletInstance } =
    useContext(WalletContext);

  useEffect(() => {
    if (hasConnectedWallet) {
      if (connectedWalletInstance instanceof BrowserWallet) {
        connectedWalletInstance.getNetworkId().then(setNetworkId);
      }
      if (connectedWalletInstance instanceof MeshWallet) {
        setNetworkId(connectedWalletInstance.getNetworkId());
      }
    }
  }, [connectedWalletName]);

  return networkId;
};
