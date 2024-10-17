import { MeshSwapContract } from "@meshsdk/contract";
import { BrowserWallet, MeshTxBuilder, MeshWallet } from "@meshsdk/core";

import { getProvider } from "../../../components/cardano/mesh-wallet";

export function getContract(wallet: BrowserWallet | MeshWallet) {
  const blockchainProvider = getProvider();

  const meshTxBuilder = new MeshTxBuilder({
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
  });

  const contract = new MeshSwapContract({
    mesh: meshTxBuilder,
    fetcher: blockchainProvider,
    wallet: wallet,
    networkId: 0,
  });

  return contract;
}

export default function Placeholder() {
  return <></>;
}
