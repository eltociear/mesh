import { post } from './';
import type { UTxO } from 'meshjs';

export async function createTransactionDonate(
  recipientAddress: string,
  amount: number,
  utxos: UTxO[]
) {
  return await post(`donate-mint-mesh`, { recipientAddress, amount, utxos });
}
