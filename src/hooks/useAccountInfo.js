import { useEffect, useContext } from "react";
import { MyContext } from "../contextApi/MyContext";
import { GetBalance } from "../utils/ethereum";
import setNetwork from "../utils/network";

const useAccountInfo = () => {
  const { account, setWalletAddress, setAccBalance, selectedOption } =
    useContext(MyContext);
  useEffect(() => {
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(
          accounts[0].substring(0, 6) +
            "..." +
            accounts[0].substring(accounts[0].length - 4, accounts[0].length)
        );
        const etherBalance = await GetBalance(accounts);
        setAccBalance(etherBalance);
        console.log(etherBalance);
        setNetwork(selectedOption);
      } else {
        setWalletAddress("Connect!");
        setAccBalance(null);
      }
    };
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    if (account) {
      (async () => {
        const etherBalance = await GetBalance(account);
        setAccBalance(etherBalance);
      })();
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [account, selectedOption, setAccBalance, setWalletAddress]);
  return { account, setWalletAddress, selectedOption };
};

export default useAccountInfo;
