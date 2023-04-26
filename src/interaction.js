import { React } from "react";
import { ethers } from "ethers";

const SendTransactions = () => {
  let amount;
  let receiversAddress;
  const sendTransaction = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const receiversAddress = document.getElementById("recAddress").value;
      const amount = document.getElementById("amt").value;
      const transx = {
        to: receiversAddress,
        value: ethers.utils.parseEther(amount),
      };

      const signAndSend = await signer.sendTransaction(transx);
      signAndSend.wait();
      window.location.reload();
    } catch (error) {
      alert(error.data.message);
    }
  };

  return (
    <div>
      <h1>Send Transactions</h1>
      <form>
        <div>
          <h4>enter receiver's address : </h4>
          <input
            type="text"
            id="recAddress"
            pattern="[0-9a-fA-F]{40}"
            required
            placeholder="enter receiver's address"
            value={receiversAddress}
          ></input>
        </div>
        <div>
          <h4>enter amount : </h4>
          <input
            type="text"
            id="amt"
            placeholder="enter amount"
            maxLength={10}
            value={amount}
          ></input>
        </div>
        <input
          type="button"
          onClick={sendTransaction}
          value="Send Transaction"
        />
      </form>
    </div>
  );
};

export default SendTransactions;
