import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";

export default function ClientActiveContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demoContracts = [
      {
        id: "1",
        jobTitle: "Blockchain Consultant",
        freelancerName: "Alice Smith",
        freelancerAvatar: "https://avatar.iran.liara.run/public",
        startDate: "2025-01-01",
        endDate: "2025-03-01",
        status: "active",
        progress: 60,
        totalAmount: 5000,
        amountPaid: 3000,
        nextMilestone: "Milestone 3",
        nextPayment: 1000,
      },
      {
        id: "2",
        jobTitle: "Smart Contract Developer",
        freelancerName: "John Doe",
        freelancerAvatar: "https://avatar.iran.liara.run/public",
        startDate: "2025-02-01",
        endDate: "2025-04-01",
        status: "completed",
        progress: 100,
        totalAmount: 8000,
        amountPaid: 8000,
        nextMilestone: "All milestones completed",
        nextPayment: 0,
      },
      {
        id: "3",
        jobTitle: "Web3 UX Designer",
        freelancerName: "Sarah Johnson",
        freelancerAvatar: "https://avatar.iran.liara.run/public",
        startDate: "2025-01-15",
        endDate: "2025-03-15",
        status: "cancelled",
        progress: 20,
        totalAmount: 3000,
        amountPaid: 600,
        nextMilestone: "Milestone 2",
        nextPayment: 500,
      },
    ];

    setTimeout(() => {
      setContracts(demoContracts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8 text-white">Loading active contracts...</div>;
  }

  if (contracts.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium text-emerald-300">No active contracts</h3>
        <p className="text-gray-400 mt-2">Accept applications to start working with freelancers</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contracts.map((contract) => (
        <div key={contract.id} className="border border-gray-600 rounded-lg shadow-md bg-black">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-emerald-300">{contract.jobTitle}</h2>
              <Badge
                className={`px-2 py-1 text-sm rounded-full ${
                  contract.status === "active"
                    ? "bg-emerald-200 text-emerald-800"
                    : contract.status === "completed"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-gray-400">Contract with {contract.freelancerName}</p>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={contract.freelancerAvatar}
                alt={contract.freelancerName}
                className="h-10 w-10 rounded-full bg-gray-200"
              />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-300">Progress</span>
                  <span className="text-sm text-gray-300">{contract.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-2 bg-emerald-500 rounded-full"
                    style={{ width: `${contract.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Start:</span>
                <span>{contract.startDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>End:</span>
                <span>{contract.endDate}</span>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Amount:</span>
                <span className="font-medium text-white">${contract.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount Paid:</span>
                <span className="font-medium text-white">${contract.amountPaid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Next Milestone:</span>
                <span className="font-medium text-emerald-300">{contract.nextMilestone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Next Payment:</span>
                <span className="font-medium text-white">${contract.nextPayment}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 border-gray-600 p-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700">
              Message
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-white rounded-lg hover:bg-gray-100 text-black cursor-pointer">
              Release Payment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}