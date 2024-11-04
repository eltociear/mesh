import { createContext, useCallback, useState } from "react";

import { BrowserWallet, MeshWallet, Wallet } from "@meshsdk/wallet";

interface WalletContext {
  hasConnectedWallet: boolean;
  connectedWalletInstance: Wallet;
  connectedWalletName: string;
  connectingWallet: boolean;
  connectWallet?: (walletName: string, extensions?: number[]) => Promise<void>;
  disconnect?: () => void;
  setWallet: (walletName: string, walletInstance: MeshWallet) => void;
  error?: unknown;
}

const INITIAL_STATE = {
  walletName: "",
  walletInstance: {} as Wallet,
};

export const useWalletStore = () => {
  const [error, setError] = useState<unknown>(undefined);

  const [connectingWallet, setConnectingWallet] = useState<boolean>(false);

  const [connectedWalletInstance, setConnectedWalletInstance] =
    useState<Wallet>(INITIAL_STATE.walletInstance);

  const [connectedWalletName, setConnectedWalletName] = useState<string>(
    INITIAL_STATE.walletName,
  );

  const connectWallet = useCallback(
    async (walletName: string, extensions?: number[]) => {
      setConnectingWallet(true);

      try {
        const walletInstance = await BrowserWallet.enable(
          walletName,
          extensions,
        );
        setConnectedWalletInstance(walletInstance);
        setConnectedWalletName(walletName);
        setError(undefined);
      } catch (error) {
        setError(error);
      }

      setConnectingWallet(false);
    },
    [],
  );

  const disconnect = useCallback(() => {
    setConnectedWalletName(INITIAL_STATE.walletName);
    setConnectedWalletInstance(INITIAL_STATE.walletInstance);
  }, []);

  const setWallet = useCallback(
    (walletName: string, walletInstance: MeshWallet) => {
      setConnectedWalletName(walletName);
      setConnectedWalletInstance(walletInstance);
    },
    [],
  );

  return {
    hasConnectedWallet: INITIAL_STATE.walletName !== connectedWalletName,
    connectedWalletInstance,
    connectedWalletName,
    connectingWallet,
    connectWallet,
    disconnect,
    setWallet,
    error,
  };
};

export const WalletContext = createContext<WalletContext>({
  hasConnectedWallet: false,
  connectedWalletInstance: INITIAL_STATE.walletInstance,
  connectedWalletName: INITIAL_STATE.walletName,
  connectingWallet: false,
  setWallet: () => {},
});
