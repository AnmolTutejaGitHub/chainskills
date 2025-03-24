import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import {getCompanyActiveProjects} from "../lib/company";
import { useNavigate } from "react-router-dom";

export default function ClientActiveContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [applications, setApplications] = useState([])

  const normalizeApplications = (rawApplications) => {
    return rawApplications.map((Application) => ({
      id: Application[0].toString(), 
      companyName: Application[13], 
      title: Application[2],
      description: Application[3], 
      skillsReq: Application[4], 
      duration: Number(Application[5]), 
      budget: Number(Application[6])/1e18, 
      status:
        Application[7] === 0n
          ? "pending"
          : Application[7] === 1n
          ? "approved"
          : "rejected", 
      devAddr: Application[8],
      devFees: Number(Application[9]), 
      ListedOn: new Date(Number(Application[10]) * 1000).toLocaleDateString(), 
      difficulty: Number(Application[11]), 
      applicantCount: Number(Application[12]), 
    }));
  };


  useEffect(() => {
      const fetchApplications = async () => {
          try {
              const rawApplicationsData = await getCompanyActiveProjects();
              console.log("appl",rawApplicationsData);
              const NormalizedApplicationsData = normalizeApplications(rawApplicationsData);
              setApplications(NormalizedApplicationsData);
          } catch (error) {
              console.error("Error fetching applications:", error)
          } finally {
              setLoading(false)
          }
      }

      fetchApplications()
  }, [])
  

  if (loading) {
    return <div className="flex justify-center p-8 text-white">Loading active contracts...</div>;
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <div
          key={application.id}
          className="border border-gray-600 rounded-lg shadow-md bg-black"
        >
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-emerald-300">
                {application.title}
              </h2>
              <Badge
                className={`px-2 py-1 text-sm rounded-full ${
                  application.status === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : application.status === "approved"
                    ? "bg-emerald-200 text-emerald-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {application.status.charAt(0).toUpperCase() +
                  application.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-gray-400">
              Company: {application.companyName}
            </p>
          </div>

          <div className="p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Applied On:</span>
                <span className="font-medium text-white">
                  {application.ListedOn}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Budget:</span>
                <span className="font-medium text-white">
                  {application.budget} ETH
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Duration:</span>
                <span className="font-medium text-white">
                  {application.duration} days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Difficulty:</span>
                <span className="font-medium text-emerald-300">
                  {application.difficulty === 0
                    ? "Beginner"
                    : application.difficulty === 1
                    ? "Intermediate"
                    : "Expert"}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
                <span className="text-gray-400">Dev Fees:</span>
                <span className="font-medium text-white">
                  {application.devFees} ETH
                </span>
              </div>

              <div className="flex justify-between" onClick={()=>navigate(`/dashboard/freelancer/${application.devAddr}`)}>
                <span className="text-gray-400">Dev Address:</span>
                <span className="font-medium text-white" >
                  {application.devAddr}
                </span>
              </div>

            <div className="pt-4 space-y-2">
              <span className="text-sm text-emerald-500 font-medium mb-1">
                Required Skills:
              </span>
              <div className="flex flex-wrap gap-2">
                {application.skillsReq.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 px-2 py-1 text-xs text-gray-300 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
             
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}