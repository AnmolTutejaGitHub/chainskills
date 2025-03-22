import { ethers } from "ethers";
import abi from "../constants/abi";
import { contractAddress } from "../constants/contractAddress";

export async function saveCompanyProfile(profileData) {
  const { name, email, industry, website, description } = profileData;

  if (!name || !email || !industry || !website || !description) {
    throw new Error("All fields are required to save the profile.");
  }

  if (!window.ethereum) {
    throw new Error(
      "Ethereum provider is not available. Please install MetaMask."
    );
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const addr = accounts[0];
    const contract = new ethers.Contract(contractAddress, abi, addr);

    const tx = await contract.registerCompany(
      addr,
      name,
      email,
      industry,
      website,
      description
    );

    await tx.wait();

    console.log(
      "Company profile saved successfully on blockchain and backend!"
    );
  } catch (error) {
    console.error("Error saving freelancer profile:", error);
    throw error;
  }
}
