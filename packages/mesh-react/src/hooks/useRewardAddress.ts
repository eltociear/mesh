import { useContext, useEffect, useState } from "react";

import { BrowserWallet, MeshWallet } from "@meshsdk/wallet";

import { WalletContext } from "../contexts";

export const useRewardAddress = (accountId = 0) => {
  const [rewardAddress, setRewardAddress] = useState<string>();
  const { hasConnectedWallet, connectedWalletName, connectedWalletInstance } =
    useContext(WalletContext);

  useEffect(() => {
    if (hasConnectedWallet) {
      if (connectedWalletInstance instanceof BrowserWallet) {
        connectedWalletInstance.getRewardAddresses().then((addresses) => {
          if (addresses[accountId]) {
            setRewardAddress(addresses[accountId]);
          }
        });
      }
      if (connectedWalletInstance instanceof MeshWallet) {
        const addresses = connectedWalletInstance.getRewardAddresses();
        setRewardAddress(addresses[accountId]);
      }
    }
  }, [accountId, connectedWalletName]);

  return rewardAddress;
};
