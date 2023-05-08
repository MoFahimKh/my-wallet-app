import { useEffect, useContext } from "react";
import { MyContext } from "../contextApi/MyContext";
import { getAccount, getBalance } from "../utils/ethereum";
import setNetwork from "../utils/network";
import trimAddress from "../utils/trimAddress";

const useAccountInfo = () => {
  const {
    account,
    setAccount,
    setWalletAddress,
    setAccBalance,
    selectedOption,
    setIsTransactionsComplete,
    tokenBal
  } = useContext(MyContext);

  const connectWalletHandler = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const acc = await getAccount();
        setAccount(acc);
        setNetwork(selectedOption);
        if (acc[0]) {
          let trimmedAccount = trimAddress(acc[0]);
          setWalletAddress(trimmedAccount);
          const etherBalance = await getBalance(acc[0]);
          setAccBalance(etherBalance);
        } else {
          setWalletAddress("Connect!");
          setAccBalance(null);
        }
      }
      if (Error) {
        setWalletAddress("Connect!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", connectWalletHandler);
      window.ethereum.on("chainChanged", connectWalletHandler);
    }
    if (account) {
      (async () => {
        const etherBalance = await getBalance(account);
        setAccBalance(etherBalance);
      })();
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", connectWalletHandler);
        window.ethereum.removeListener("chainChanged", connectWalletHandler);
      }
    };
  }, [
    account,
    selectedOption,
    setAccBalance,
    setWalletAddress,
    setIsTransactionsComplete,
    connectWalletHandler
  ]);
  return { account, setWalletAddress, selectedOption, connectWalletHandler , tokenBal};
};

export default useAccountInfo;
