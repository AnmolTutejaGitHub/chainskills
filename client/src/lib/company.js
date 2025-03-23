import { ethers } from "ethers";
import abi from "../constants/abi";
import { contractAddress } from "../constants/contractAddress";
import { v4 as uuidv4 } from "uuid";

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
    const signer = await provider.getSigner();
    console.log("Addr: ", addr, "Signer: ", signer);
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.registerCompany(
      addr,
      name,
      email,
      industry,
      website,
      description
    );

    await tx.wait();

    const user = { address: addr, type: "company" };
    localStorage.setItem("user", JSON.stringify(user));

    console.log(
      "Company profile saved successfully on blockchain and backend!"
    );
  } catch (error) {
    console.error("Error saving freelancer profile:", error);
    throw error;
  }
}

export async function getCompanyData() {
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

    const result = await contract.getCompanyProfile(addr);

    console.log("User Data: ", result);
    return result;
  } catch (error) {
    console.error("Error saving freelancer profile:", error);
    throw error;
  }
}

export async function postJob(data) {
  const { title, description, skills, budget, experienceLevel, duration } = data;
  

  if (!title || !description || !budget || !skills.length || !duration || !experienceLevel) {
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
    const contract = new ethers.Contract(contractAddress, abi, signer);
    
    const uuid = uuidv4();
    const id = parseInt(uuid.replace(/-/g, "").slice(0, 8), 16);

    const durationInSecs = duration * 24 * 60 * 60;
    console.log(experienceLevel);

    let difficulty = 0;
    if(experienceLevel == "entry") {
      difficulty = 0;
    } else if(experienceLevel == "intermediate") {
      difficulty = 1;
    } else {
      difficulty = 2;
    }

    const result = await contract.addListing(
      id,
      addr,
      title,
      description,
      skills,
      durationInSecs,
      ethers.parseEther(budget),
      difficulty
    );

    console.log("Result: ", result);
    return result;
  } catch (error) {
    console.error("Error saving freelancer profile:", error);
    throw error;
  }
}

export async function getCompanyListings() {
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

    const result = await contract.getCompanyListings(addr);

    console.log("User Data: ", result);
    return result;
  } catch (error) {
    console.error("Error saving freelancer profile:", error);
    throw error;
  }
}