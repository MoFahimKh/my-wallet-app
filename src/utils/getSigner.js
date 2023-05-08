import { ethers } from "ethers";
const signer = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer
};
export default signer;