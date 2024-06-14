import { NearContext } from "helpers/context";
import { useContext } from "react";

export const CONTRACT_ID = "restorders.testnet";
export const NETWORK_ID = "testnet";

export const useNear = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  return { signedAccountId, wallet };
};

export const getOrders = async (wallet, from = 0, to = Number.MAX_VALUE) => {
  return (
    await wallet.viewMethod({
      contractId: CONTRACT_ID,
      method: "get_orders",
      args: { from, to },
    })
  ).map(({ date, amount }) => ({
    date: Number(date),
    amount: Number(amount),
  }));
};

export const addOrder = async (wallet, date, amount) => {
  return await wallet.callMethod({
    contractId: CONTRACT_ID,
    method: "add_order",
    args: { date, amount },
  });
};
