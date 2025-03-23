import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Wallet, LogOut, Layers } from "lucide-react";
import { Button } from "../ui/button";
import { useAuthStore } from "../../store/authStore";

function Header() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const { logout } = useAuthStore();

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const selectedAccount = accounts[0];
        setAccount(selectedAccount);

        const balance = await provider.getBalance(selectedAccount);
        setBalance(ethers.formatEther(balance));
      } catch (error) {
        console.error("Error with Connection:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleConnect();
  }, []);

  const handleLogout = () => {
    setAccount(null);
    setBalance(null);
    logout();
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const truncateAddress = (address) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
  };

  const truncateAddressLess = (address) => {
    return address ? `${address.slice(0, 10)}...${address.slice(-6)}` : "";
  };

  return (
    <header className="top-0 bg-black text-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="relative group flex items-center gap-2">
            <Layers className="text-emerald-500 h-5 w-5" />
            <span className="relative text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text">
              ChainSkills
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-black text-white p-2 rounded-lg">
          {loading ? (
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
              <div>
                <div className="w-50 h-4 bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="w-26 h-3 bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
          ) : account ? (
            <div className="relative flex items-center gap-2 cursor-pointer bg-gray-900 px-5 py-2 rounded-2xl" onClick={togglePopup}>
              <img
                src={`https://api.dicebear.com/5.x/identicon/svg?seed=${account}`}
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{truncateAddress(account)}</p>
                <p
                  className="text-xs text-[#4ade80]"
                >
                  {balance} ETH
                </p>
              </div>
              {showPopup && (
                <div className="absolute top-10 right-0 z-10 w-64 bg-gray-900 text-white p-4 rounded shadow-lg">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">Wallet Info</h3>
                  <p className="text-sm mb-1">
                    <span className="font-bold">Address:</span> {truncateAddressLess(account)}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-bold">Balance:</span> {balance} ETH
                  </p>
                  <Button
                    className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2" /> Logout
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Button
              className="flex gap-2 bg-[#1DC167] p-2 text-black hover:bg-[#1DC169]"
              onClick={handleConnect}
            >
              <Wallet /> Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;