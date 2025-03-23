import { ethers } from "ethers";
import abi from "../constants/abi";
import { contractAddress } from "../constants/contractAddress";

export async function checkIfUserExists() {
  if (!window.ethereum) {
    throw new Error(
      "Ethereum provider is not available. Please install MetaMask."
    );
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const addr = accounts[0];
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const result = await contract.checkAddressIsDevCompanyOrDoesNotExist(addr);
    const user = { address: addr, type: "freelancer" };
    localStorage.setItem("user", JSON.stringify(user));
    return Number(result);
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw error;
  }
}