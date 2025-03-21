import { useState } from "react";
import { ethers } from "ethers";
import { Wallet } from "lucide-react";
import { Button } from "../ui/button";

function Header() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const handleConnects = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const selectedAccount = accounts[0];
        setAccount(selectedAccount);

        const signer = provider.getSigner();
        const balance = await signer.getBalance();
        console.log(balance);
        setBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error("Error with Connection:", error);
      }
    }
  };

  return (
    <header className="top-0 border-b bg-black text-white">
      <div className=" flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#4ade80]">
            ChainSkills
          </span>
        </div>
        <div className="flex items-center gap-4 bg-black text-white p-2 rounded-lg">
          {account ? (
            <div className="flex items-center gap-2">
              <img
                src={`https://api.dicebear.com/5.x/identicon/svg?seed=${account}`}
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{account}</p>
                <p className="text-xs text-[#4ade80]">
                  {balance} ETH
                </p>
              </div>
            </div>
          ) : (
            <Button className="flex gap-2 bg-[#1DC167] p-2 text-black hover:bg-[#1DC169]" onClick={handleConnects}><Wallet /> Connect Wallet</Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;