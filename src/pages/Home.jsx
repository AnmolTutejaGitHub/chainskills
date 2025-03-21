import { ArrowRight } from "lucide-react";
import { BackgroundLines } from "../components/ui/background-lines";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen  bg-radial-[at_50%_40%] from-[#22c55e] via-[#000000, opacity 50%] to-[#000000] to-50%">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#4ade80]">
              ChainSkills
            </span>
          </div>
          <nav className="hidden md:flex gap-6 text-[#6b7280]">
            <a
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-4 bg-black text-white p-2 rounded-lg">
            <a href="/auth">
              <button>Connect Wallet</button>
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#4ade80]">
                    Decentralized Freelancing for the Web3 Era
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl text-[#d1d5db]">
                    Connect, collaborate, and get rewarded with cryptocurrency
                    and NFT certifications. Secure, transparent, and
                    decentralized.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a href="/auth?type=freelancer">
                    <button size="lg" className="w-full text-[#22c55e]">
                      Join as Freelancer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </a>
                  <a href="/auth?type=client">
                    <button
                      size="lg"
                      variant="outline"
                      className="rounded-lg px-4 py-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300"
                    >
                      Hire Talent
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </a>
                </div>
              </div>
              <div className="flex relative justify-center  ">
                <div className="relative w-full max-w-[500px] h-16 rounded-xl  min-h-[300px] h-auto bg-gradient-to-br from-[#4ade80] to-[#4ade80]-foreground/20 p-1">
                  <BackgroundLines className="flex items-center justify-center h-full w-full flex-col px-4">
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center text-[#22c55e]">
                        <div className="text-4xl font-bold mb-2">Web3</div>
                        <div className="text-xl">Freelancing Revolution</div>
                      </div>
                    </div>
                  </BackgroundLines>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 text-[#4ade80]">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ">
                  Platform Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ChainSkills combines the best of Web3 with freelancing to
                  create a revolutionary platform
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8 text-[#4ade80]">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <div className="rounded-full bg-primary/10 p-3">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Secure Payments</h3>
                <p className="text-sm text-muted-foreground text-center text-[#6b7280]">
                  Smart contracts ensure secure and transparent payments for
                  completed work
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <div className="rounded-full bg-primary/10 p-3">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12.5 2h-1V1h1zm0 21h-1v-1h1zm9.5-10.5v-1h1v1zM2 11.5v-1h1v1zM4.929 4.929l-.707-.707.707-.707.707.707zm14.142 0l.707-.707.707.707-.707.707zM4.929 19.071l-.707.707.707.707.707-.707zm14.142 0l.707.707.707-.707-.707-.707z" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">NFT Certifications</h3>
                <p className="text-sm text-muted-foreground text-center text-[#6b7280]">
                  Earn verifiable NFT certificates that showcase your skills and
                  completed projects
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <div className="rounded-full bg-primary/10 p-3">
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
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Global Talent Pool</h3>
                <p className="text-sm text-muted-foreground text-center text-[#6b7280]">
                  Connect with skilled professionals from around the world in a
                  decentralized ecosystem
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0 text-[#6b7280]">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 ChainSkills. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:underline underline-offset-4"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:underline underline-offset-4"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
