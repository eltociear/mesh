export const networkToObj = (network: string | number[][]): string | object => {
  if (typeof network === "string") {
    return network;
  } else {
    return { custom: network };
  }
};
