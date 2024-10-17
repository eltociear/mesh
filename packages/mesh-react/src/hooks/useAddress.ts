import { useContext, useEffect, useState } from "react";

import { BrowserWallet, MeshWallet } from "@meshsdk/wallet";

import { WalletContext } from "../contexts";

export const useAddress = (accountId = 0) => {
  const [address, setAddress] = useState<string>();
  const { hasConnectedWallet, connectedWalletName, connectedWalletInstance } =
    useContext(WalletContext);

  useEffect(() => {
    if (hasConnectedWallet) {
      if (connectedWalletInstance instanceof BrowserWallet) {
        connectedWalletInstance.getUsedAddresses().then((addresses) => {
          if (addresses[accountId]) {
            setAddress(addresses[accountId]);
          }
        });
      }
      if (connectedWalletInstance instanceof MeshWallet) {
        const addresses = connectedWalletInstance.getUsedAddresses();
        setAddress(addresses[accountId]);
      }
    }
  }, [accountId, connectedWalletName]);

  return address;
};
