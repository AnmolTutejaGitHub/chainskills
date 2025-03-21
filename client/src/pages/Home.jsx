import { useState } from "react";
import { ArrowRight, X, Wallet, Info, Layers, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { ethers } from "ethers";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState("freelancer");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const togglePopup = () => setIsOpen(!isOpen);

  const connectWallet = async () => {
    setError(null);

    if (window.ethereum) {
      setIsConnecting(true);

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const seletedAccount = accounts[0];
        console.log(`Connected as ${userType}:`, seletedAccount);
        console.log(seletedAccount, " seletedAccount");
      } catch (error) {
        console.error('Error with Connection:', error);
      } finally {
        setIsConnecting(false);
      }

      setTimeout(() => {
        if (userType === "client") {
          window.location.href = "/onboarding/client";
        } else if (userType === "freelancer") {
          window.location.href = "/onboarding/freelancer";
        }
      }, 1000);
    } else {
      setError("Failed to connect wallet. Please make sure MetaMask is installed and try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header
        className={`fixed top-0 w-full z-50 bg-black bg-opacity-60 shadow-lg transition-all duration-300`}
      >
        <div className="container flex h-24 items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-3">
            <a href="/" className="relative group flex items-center gap-2">
              <Layers className="text-emerald-500 h-6 w-6" />
              <span className="relative text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text">
                ChainSkills
              </span>
            </a>
          </div>

          <nav className="hidden md:flex gap-8 text-gray-400">
            <a
              href="#features"
              className="text-md flex items-center gap-1 font-medium hover:text-emerald-400 transition-colors"
            >
              <Info className="h-4 w-4" /> Features
            </a>
            <a
              href="#how-it-works"
              className="text-md flex items-center gap-1 font-medium hover:text-emerald-400 transition-colors"
            >
              <Users className="h-4 w-4" /> How It Works
            </a>
            <a
              href="#testimonials"
              className="text-md flex items-center gap-1 font-medium hover:text-emerald-400 transition-colors"
            >
              <Layers className="h-4 w-4" /> Testimonials
            </a>
          </nav>

          <div className="flex items-center gap-4">

            <Button onClick={togglePopup} className="flex items-center gap-2 bg-emerald-500 text-black hover:bg-emerald-600 p-3 rounded-lg cursor-pointer text-lg">
              <Wallet className="h-5 w-5" /> Connect Wallet
            </Button>

            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                <div className="bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-emerald-400">Connect Your Wallet</h2>
                    <button
                      onClick={togglePopup}
                      className="text-gray-400 hover:text-white focus:outline-none"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <p className="text-gray-400 mb-6">
                    Use MetaMask to connect to ChainSkills as a freelancer.</p>
                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={connectWallet}
                      disabled={isConnecting}
                      className="bg-emerald-500 text-black hover:bg-emerald-600 p-3 rounded-lg flex items-center justify-between"
                    >
                      <span>{isConnecting ? "Connecting..." : "Connect with MetaMask"}</span>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                        alt="MetaMask"
                        className="h-6 w-6"
                      />
                    </Button>

                    {error && (
                      <div className="mt-4 p-3 text-sm bg-red-100 text-red-600 rounded-md">
                        {error}
                      </div>
                    )}

                    <div className="text-center text-sm text-gray-400 mt-4">
                      By connecting your wallet, you agree to our <a href="/terms" className="underline">Terms of Service</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="px-10 mt-20 w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-emerald-400">
                    Decentralized Freelancing for the Web3 Era
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl">
                    Connect, collaborate, and get rewarded with cryptocurrency and NFT certifications. Secure,
                    transparent, and decentralized.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <div>
                    <Button onClick={() => {
                      setUserType("freelancer");
                      togglePopup();
                    }} size="lg" className="w-full bg-emerald-500 text-black text-lg hover:bg-emerald-600">
                      Join as Freelancer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <Button onClick={() => {
                      setUserType("client");
                      togglePopup()
                    }} size="lg" variant="outline" className="w-full bg-emerald-500 text-black text-lg hover:bg-emerald-600">
                      Hire Talent
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-800 p-1">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">Web3</div>
                      <div className="text-xl">Freelancing Revolution</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-400">Platform Features</h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl">
                  ChainSkills combines the best of Web3 with freelancing to create a revolutionary platform
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <div className="flex flex-col items-center space-y-2 border border-emerald-500 rounded-lg p-4">
                <div className="rounded-full bg-emerald-500/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-emerald-400"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-400">Secure Payments</h3>
                <p className="text-sm text-gray-400 text-center">
                  Smart contracts ensure secure and transparent payments for completed work
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border border-emerald-500 rounded-lg p-4">
                <div className="rounded-full bg-emerald-500/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-emerald-400"
                  >
                    <path d="M12.5 2h-1V1h1zm0 21h-1v-1h1zm9.5-10.5v-1h1v1zM2 11.5v-1h1v1zM4.929 4.929l-.707-.707.707-.707.707.707zm14.142 0l.707-.707.707.707-.707.707zM4.929 19.071l-.707.707.707.707.707-.707zm14.142 0l.707.707.707-.707-.707-.707z" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-400">NFT Certifications</h3>
                <p className="text-sm text-gray-400 text-center">
                  Earn verifiable NFT certificates that showcase your skills and completed projects
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border border-emerald-500 rounded-lg p-4">
                <div className="rounded-full bg-emerald-500/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-emerald-400"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-400">Global Talent Pool</h3>
                <p className="text-sm text-gray-400 text-center">
                  Connect with skilled professionals from around the world in a decentralized ecosystem
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-400">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl">
                  Experience a seamless journey in Web3 freelancing with these simple steps.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-emerald-500/10 p-4">
                  <Users className="text-emerald-400 h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold text-emerald-400">Sign Up</h3>
                <p className="text-gray-400">
                  Register as a freelancer or client and start your journey in the decentralized ecosystem.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-emerald-500/10 p-4">
                  <Info className="text-emerald-400 h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold text-emerald-400">Post & Bid</h3>
                <p className="text-gray-400">
                  Clients post projects, freelancers place bids, and smart contracts manage everything securely.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-emerald-500/10 p-4">
                  <Layers className="text-emerald-400 h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold text-emerald-400">Deliver & Earn</h3>
                <p className="text-gray-400">
                  Deliver quality work, get paid in cryptocurrency, and earn NFT certifications for completed projects.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
