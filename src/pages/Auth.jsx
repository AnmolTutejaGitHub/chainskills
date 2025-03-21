import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Wallet } from "lucide-react";

export default function AuthPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState("freelancer");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "client") {
      setUserType("client");
    }
  }, [searchParams]);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const account = await connectWallet();
      if (account) {
        console.log(`Connected as ${userType}:`, account);
        window.location.href = `/onboarding/${userType}`;
      }
    } catch (err) {
      setError("Failed to connect wallet. Please make sure MetaMask is installed and try again.");
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="mx-auto flex items-center justify-center min-h-screen py-12 bg-black text-white">
      <div className="w-full max-w-md  shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Connect Your Wallet</h1>
          <p className="text-gray-600 mt-1">
            Use MetaMask to connect to ChainSkills as a {userType === "freelancer" ? "freelancer" : "client"}.
          </p>
        </div>
        <div>
          <button
            className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all ${
              isConnecting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleConnect}
            disabled={isConnecting}
          >
            <Wallet className="h-5 w-5" />
            {isConnecting ? "Connecting..." : "Connect with MetaMask"}
          </button>

          {error && (
            <div className="mt-4 p-3 text-sm bg-red-100 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <div className="text-center text-sm text-gray-500 mt-4">
            By connecting your wallet, you agree to our <a href="/terms" className="underline">Terms of Service</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock function to simulate wallet connection
async function connectWallet() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("0x1234...abcd");
    }, 2000);
  });
}