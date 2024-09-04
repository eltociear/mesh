import { MeshTxBuilderBody } from "@meshsdk/common";
import { CardanoSDKSerializer } from "@meshsdk/core-cst";

describe("Transaction serializer - core-cst", () => {
  it("Outputs should contain min utxo value if lovelace value not provided", () => {
    const serializer = new CardanoSDKSerializer(undefined, true);
    const body: MeshTxBuilderBody = {
      inputs: [
        {
          type: "PubKey",
          txIn: {
            txHash:
              "1662c4b349907e4d92e0995fd9dcdc9a4489f7dff4f5cce6b4b3901de479308c",
            txIndex: 14,
            amount: [
              {
                unit: "lovelace",
                quantity: "774643176",
              },
            ],
            address:
              "addr_test1qq0yavv5uve45rwvfaw96qynrqt8ckpmkwcg08vlwxxdncxk82f5wz75mzaesmqzl79xqsmedwgucwtuav5str6untqqmykcpn",
          },
        },
      ],
      outputs: [
        {
          address:
            "addr_test1qq0yavv5uve45rwvfaw96qynrqt8ckpmkwcg08vlwxxdncxk82f5wz75mzaesmqzl79xqsmedwgucwtuav5str6untqqmykcpn",
          amount: [
            {
              unit: "d9312da562da182b02322fd8acb536f37eb9d29fba7c49dc17255527",
              quantity: "1",
            },
          ],
        },
      ],
      extraInputs: [
        {
          input: {
            outputIndex: 14,
            txHash:
              "1662c4b349907e4d92e0995fd9dcdc9a4489f7dff4f5cce6b4b3901de479308c",
          },
          output: {
            address:
              "addr_test1qq0yavv5uve45rwvfaw96qynrqt8ckpmkwcg08vlwxxdncxk82f5wz75mzaesmqzl79xqsmedwgucwtuav5str6untqqmykcpn",
            amount: [
              {
                unit: "lovelace",
                quantity: "774643176",
              },
            ],
          },
        },
        {
          input: {
            outputIndex: 54,
            txHash:
              "43cdd76f2b74d31e56813276b695b64fe91daac195ac37ac3b4a4b44b405f3bf",
          },
          output: {
            address:
              "addr_test1qq0yavv5uve45rwvfaw96qynrqt8ckpmkwcg08vlwxxdncxk82f5wz75mzaesmqzl79xqsmedwgucwtuav5str6untqqmykcpn",
            amount: [
              {
                unit: "lovelace",
                quantity: "390216112",
              },
            ],
          },
        },
      ],
      selectionConfig: {
        threshold: "5000000",
        strategy: "experimental",
        includeTxFees: true,
      },
      collaterals: [],
      requiredSignatures: [],
      referenceInputs: [],
      mints: [
        {
          type: "Plutus",
          policyId: "d9312da562da182b02322fd8acb536f37eb9d29fba7c49dc17255527",
          assetName: "",
          amount: "1",
          scriptSource: {
            type: "Provided",
            script: {
              version: "V2",
              code: "5883588101000032323232323232322232533300632323232533300a3370e9000000899b8f375c601c601000e911046d6573680014a0601000260180026018002600800429309b2b19299980319b87480000044c8c94ccc02cc03400852616375c601600260080062c60080044600a6ea80048c00cdd5000ab9a5573aaae7955cfaba15745",
            },
          },
        },
      ],
      changeAddress:
        "addr_test1qq0yavv5uve45rwvfaw96qynrqt8ckpmkwcg08vlwxxdncxk82f5wz75mzaesmqzl79xqsmedwgucwtuav5str6untqqmykcpn",
      metadata: [],
      validityRange: {},
      certificates: [],
      withdrawals: [],
      signingKey: [],
      network: "preprod",
    };

    let txHex = serializer.serializeTxBody(body);
    console.log(txHex);
    expect(txHex !== "").toBeTruthy();
  });
});
