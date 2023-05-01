// params.js

export const MAINNET_PARAMS = {
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
};

export const SEPOLIA_PARAMS = {
  chainId: "0xaa36a7",
  rpcUrls: [
    "https://eth-sepolia.g.alchemy.com/v2/058QdLnk9HCV0-uuRu_azFF6_F9c0Cqe",
  ],
  chainName: "Sepolia",
};

export const MUMBAI_PARAMS = {
  chainId: "0x13881",
  rpcUrls: [
    "https://polygon-mumbai.g.alchemy.com/v2/r1zLtlI4VzABNRCDTlzwkUudARlrlXRV",
  ],
  chainName: "Mumbai",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
};
