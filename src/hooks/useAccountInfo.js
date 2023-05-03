import { useEffect, useContext } from "react";
import { MyContext } from "../contextApi/MyContext";
import { getAccount, getBalance } from "../utils/ethereum";
import setNetwork from "../utils/network";

const useAccountInfo = () => {
  const {
    account,
    setAccount,
    setWalletAddress,
    setAccBalance,
    selectedOption,
    setIsTransactionsComplete,
  } = useContext(MyContext);

  const connectWalletHandler = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const acc = await getAccount();
        setAccount(acc);
        setNetwork(selectedOption);
        if (acc[0]) {
          let trimmedAccount =
            acc[0].substring(0, 6) +
            "..." +
            acc[0].substring(acc[0].length - 4, acc[0].length);
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
  ]);
  return { account, setWalletAddress, selectedOption, connectWalletHandler };
};

export default useAccountInfo;
