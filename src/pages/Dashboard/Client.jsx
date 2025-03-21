import { Plus } from "lucide-react";
import ClientJobList from "../../components/ClientJobList";
import ClientApplications from "../../components/ClientApplications";
import ClientActiveContracts from "../../components/ClientActiveContracts";

export default function ClientDashboard() {
  const clientProfile = {
    companyName: "Google",
    industry: "Technology",
    jobsPosted: 8,
    activeContracts: 3,
    totalSpent: 12500,
  };

  return (
    <div className="container py-6">
      <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
        <div className="space-y-6">
          <div className="border rounded-lg shadow p-4">
            <div className="flex justify-between items-start pb-4">
              <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjTHdnduUYB40YP8sC9rx1RFcQj2i7MLsUGg&s"
                  alt={clientProfile.companyName}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <button className="border px-2 py-1 rounded text-sm">Edit Profile</button>
            </div>
            <h2 className="text-lg font-bold mt-4">{clientProfile.companyName}</h2>
            <p className="text-sm text-gray-600">{clientProfile.industry}</p>

            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Jobs Posted</div>
                  <div className="text-xl font-bold">{clientProfile.jobsPosted}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Active Contracts</div>
                  <div className="text-xl font-bold">{clientProfile.activeContracts}</div>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-sm text-gray-500">Total Spent</div>
                <div className="text-2xl font-bold">${clientProfile.totalSpent}</div>
              </div>

              <a href="/dashboard/client/post-job">
                <button className="w-full mt-2 bg-blue-500 text-white py-2 rounded flex items-center justify-center">
                  <Plus className="mr-2 h-4 w-4" /> Post a New Job
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="grid w-full grid-cols-3 border-b">
              <button className="pb-2 text-sm font-medium border-b-2 border-blue-500">My Job Listings</button>
              <button className="pb-2 text-sm font-medium">Applications</button>
              <button className="pb-2 text-sm font-medium">Active Contracts</button>
            </div>
            <div className="mt-4">
              <ClientJobList />
            </div>
            <div className="mt-4 hidden">
              <ClientApplications />
            </div>
            <div className="mt-4 hidden">
              <ClientActiveContracts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}