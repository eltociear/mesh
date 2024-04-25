import Codeblock from '../../../ui/codeblock';
import Card from '../../../ui/card';
import SectionTwoCol from '../../../common/sectionTwoCol';
import Button from '../../../ui/button';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { useState } from 'react';
import RunDemoResult from '../../../common/runDemoResult';
import {
  BlockfrostProvider,
  MeshTxBuilder,
  PlutusScript,
  resolvePlutusScriptAddress,
} from '@meshsdk/core';
import { MeshGiftCardContract } from '@meshsdk/contracts';
import useLocalStorage from '../../../../hooks/useLocalStorage';

export default function GiftcardRedeem() {
  return (
    <>
      <SectionTwoCol
        sidebarTo="redeemGiftCard"
        header="Redeem Giftcard"
        leftFn={Left()}
        rightFn={Right()}
      />
    </>
  );
}

function Left() {
  let code = ``;
  code += `const utxo = await contract.getUtxoByTxHash(txHashToSearchFor);\n`;
  code += `const tx = await contract.redeemGiftCard(utxo);\n`;
  code += `const signedTx = await wallet.signTx(tx, true);\n`;
  code += `const txHash = await wallet.submitTx(signedTx);\n`;

  return (
    <>
      <p>
        This function, <code>redeemGiftCard()</code>, is used to redeem a gift
        card. The function accepts the following parameters:
      </p>
      <ul>
        <li>
          <b>giftCardUtxo (UTxO)</b> - unspent transaction output in the script
        </li>
      </ul>
      <p>
        The function returns a transaction hash if the gift card is successfully
        redeemed. It will burn the gift card and transfer the value to the
        wallet signing this transaction.
      </p>
      <p>The code snippet below demonstrates how to redeem a gift card.</p>
      <Codeblock data={code} isJson={false} />
    </>
  );
}

function Right() {
  const { connected, wallet } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<null | any>(null);
  const [responseError, setResponseError] = useState<null | any>(null);
  const [userLocalStorage, setUserlocalStorage] = useLocalStorage(
    'mesh_giftcard_demo',
    undefined
  );

  function getContract() {
    const blockchainProvider = new BlockfrostProvider(
      process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY_PREPROD!
    );

    const meshTxBuilder = new MeshTxBuilder({
      fetcher: blockchainProvider,
      submitter: blockchainProvider,
    });

    const contract = new MeshGiftCardContract({
      mesh: meshTxBuilder,
      fetcher: blockchainProvider,
      wallet: wallet,
    });

    return contract;
  }

  async function rundemo() {
    setLoading(true);
    setResponse(null);
    setResponseError(null);

    try {
      const contract = getContract();

      const utxo = await contract.getUtxoByTxHash(userLocalStorage); // todo hinson: script address extracted from scriptCbor is not correct

      if (!utxo) {
        setResponseError('Input utxo not found');
        setLoading(false);
        return;
      }

      const tx = await contract.redeemGiftCard(utxo);
      const signedTx = await wallet.signTx(tx, true);
      const txHash = await wallet.submitTx(signedTx);
      setResponse(txHash);
    } catch (error) {
      setResponseError(`${error}`);
    }
    setLoading(false);
  }

  if (userLocalStorage) {
    return (
      <Card>
        <p>
          This demo, we will redeem the giftcard that was created in the
          previous step. You may connect with another wallet to claim the
          giftcard
        </p>
        {connected ? (
          <>
            <Button
              onClick={() => rundemo()}
              style={
                loading ? 'warning' : response !== null ? 'success' : 'light'
              }
              disabled={loading}
            >
              Redeem Giftcard
            </Button>
            <RunDemoResult response={response} />
          </>
        ) : (
          <CardanoWallet />
        )}
        <RunDemoResult response={responseError} label="Error" />
      </Card>
    );
  }
  return <></>;
}
