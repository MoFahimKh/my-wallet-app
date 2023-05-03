import {
  MAINNET_PARAMS,
  SEPOLIA_PARAMS,
  MUMBAI_PARAMS,
} from "./netParams/netParams";

const setNetwork = async (value) => {
  let params;
  switch (value) {
    case "0x1":
      params = MAINNET_PARAMS;
      break;
    case "0xaa36a7":
      params = SEPOLIA_PARAMS;
      break;
    case "0x13881":
      params = MUMBAI_PARAMS;
      break;
    default:
      params = null;
      break;
  }
  if (params) {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [params],
    });
  }
};

export default setNetwork;
