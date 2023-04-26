import { React, useEffect, useState } from "react";
import { ethers } from "ethers";

import SendTransactions from "./interaction";

const ConnectButton = () => {
  let account;
  let etherBalance;
  const [buttonText, setButtonText] = useState("Connect Wallet!");
  const [walletAddress, setWalletAddress] = useState(null);
  const [accBalance, setAccBalance] = useState(null);
  const [selectedOption, setSelectedOption] = useState("0x1");

  useEffect(() => {
    //inorder to update address and balance when account is switched
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        etherBalance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [accounts[0]],
        });
        const upBal = ethers.utils.formatUnits(etherBalance, "ether");
        setAccBalance(upBal);
      } else {
        setWalletAddress(null);
      }

      if (accounts.length === 0) {
        setButtonText("Connect Wallet!");
        setWalletAddress(null);
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const connectWalletHandler = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        //selecting network
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x1",
              rpcUrls: [
                "https://eth-mainnet.g.alchemy.com/v2/XKKoPFdd7a_hoRKebU1v_dXfoe1oUkI6",
              ],
              chainName: "Ethereum Mainnet",
              nativeCurrency: {
                name: "Ether",
                symbol: "ETH",
                decimals: 18,
              },
            },
          ],
        });

        //connecting wallet
        account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // console.log(account);
        if (await account[0]) {
          setButtonText("Connected Wallet!");
          setWalletAddress(
            (account = await window.ethereum.request({
              method: "eth_requestAccounts",
            }))
          );
        }
        if (!Error) {
          setButtonText("Connected Wallet!");
        }
      }
    } catch {}
    // } catch (err) {
    //   console.log(err.data.err)
    //   alert(err.data.err);
    // }

    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [account[0]],
    });

    etherBalance = ethers.utils.formatUnits(balance, "ether");
    setAccBalance(etherBalance);
  };
  return (
    <div>
      <div>
        <h2>Select an option:</h2>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="0x1">Mainnet</option>
          <option value="0x11155111">Sepolia</option>
          <option value="0x3">Ropsten</option>
          <option value="0x80001">Polygon Mumbai testNet </option>
          <option value="0x5">goerli </option>
        </select>
      </div>

      <button onClick={connectWalletHandler}>{buttonText}</button>
      <h5>Address :{walletAddress} </h5>
      <h3>Balance :{accBalance} </h3>
      <SendTransactions />
    </div>
  );
};

export default ConnectButton;
