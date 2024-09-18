import { Transaction } from "../types";

export const calculateFees = (
  minFeeA: number,
  minFeeB: number,
  minFeeRefScriptCostPerByte: number,
  tx: Transaction,
  refScriptSize: number,
): number => {
  let fee = minFeeB + (tx.toCbor().length / 2) * minFeeA;
  const tierSize = 25600;
  let currentRefScriptSize = refScriptSize;
  let multiplier = 1.2;
  while (currentRefScriptSize >= tierSize) {
    fee += tierSize * multiplier * minFeeRefScriptCostPerByte;
    currentRefScriptSize -= tierSize;
    multiplier *= multiplier;
  }
  if (currentRefScriptSize > 0) {
    fee += currentRefScriptSize * multiplier * minFeeRefScriptCostPerByte;
  }
  return Math.floor(fee);
};
