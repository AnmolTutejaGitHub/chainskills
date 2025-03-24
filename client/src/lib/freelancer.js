import { ethers } from "ethers";
import abi from "../constants/abi";
import { contractAddress } from "../constants/contractAddress";

export async function saveFreelancerProfile(profileData) {
  const { name, email, skills, hourlyRate, avail, bio } = profileData;

  if (!name || !email || !skills.length || !hourlyRate || !avail || !bio) {
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
    const signer = await provider.getSigner();
    console.log("Addr: ", addr, "Signer: ", signer);
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.registerDev(
      addr,
      name,
      email,
      skills,
      avail,
      ethers.parseUnits(hourlyRate, "ether"),
      bio
    );

    await tx.wait();

    const user = { address: addr, type: "freelancer" };
    localStorage.setItem("user", JSON.stringify(user));

    console.log(
      "Freelancer profile saved successfully on blockchain and backend!"
    );
  } catch (error) {
    console.error("Error saving freelancer profile:", error);
    throw error;
  }
}

export async function getUserProfileData() {
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

    const result = await contract.getDevProfileData(addr);

    console.log("User Data: ", result);
    return result;
  } catch (error) {
    console.error("Error saving freelancer profile:", error);
    throw error;
  }
}

export async function getAvailableJobs() {
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

    const result = await contract.getOpenListings();

    console.log("Open Jobs ", result);
    return result;
  } catch (error) {
    console.error("Error saving freelancer profile:", error);
    throw error;
  }
}

export async function applyToJob(uuid,charges,coverLetter) {
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

    const result = await contract.applyToListing(uuid,addr,charges,coverLetter);

    console.log("Open Jobs ", result);
    return result;
  } catch (error) {
    console.error("Error saving freelancer profile:", error);
    throw error;
  }
}

export async function getfreelancerApplications() {
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

    const result = await contract.getDevApplications(addr);

    console.log("freelancer Applications ", result);
    return result;
  } catch (error) {
    console.error("Error saving freelancer profile:", error);
    throw error;
  }
}

export async function getProfileData(devAddr) {
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

    const result = await contract.getDevProfileData(devAddr);

    console.log("freelancer Applications ", result);
    return result;
  } catch (error) {
    console.error("Error saving freelancer profile:", error);
    throw error;
  }
}


export async function getIsProjectPaid(uuid) {
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

    const result = await contract.isProjectPaid(uuid);

    console.log("freelancer Applications ", result);
    return result;
  } catch (error) {
    console.error("Error saving freelancer profile:", error);
    throw error;
  }
}