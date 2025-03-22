import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
// import { getFreelancerApplications } from "@/lib/applications"

const mockFreelancerApplications = [
    {
      id: "app1",
      jobTitle: "Smart Contract Developer for DeFi Project",
      companyName: "DeFi Innovations",
      appliedAt: "May 15, 2025",
      status: "pending",
      proposedRate: 75,
      coverLetter:
        "I have extensive experience with Solidity and DeFi protocols. I've worked on several yield farming and liquidity pool projects and would love to contribute to your platform.",
    },
    {
      id: "app2",
      jobTitle: "Blockchain Security Auditor",
      companyName: "SecureChain",
      appliedAt: "May 10, 2025",
      status: "accepted",
      proposedRate: 90,
      coverLetter:
        "With my background in security auditing and smart contract development, I believe I'm a perfect fit for this role. I've identified and fixed vulnerabilities in multiple production DeFi applications.",
    },
    {
      id: "app3",
      jobTitle: "Web3 Frontend Developer",
      companyName: "MetaVerse Inc",
      appliedAt: "May 5, 2025",
      status: "rejected",
      proposedRate: 65,
      coverLetter:
        "I'm a frontend developer with 3 years of experience working with React and Web3 technologies. I've built several dApps and would love to help with your project.",
    },
  ]

export default function FreelancerApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // const applicationsData = await getFreelancerApplications()
        setApplications(mockFreelancerApplications)
      } catch (error) {
        console.error("Error fetching applications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  if (loading) {
    return <div className="flex justify-center p-8">Loading your applications...</div>
  }

  if (applications.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium">No applications yet</h3>
        <p className="text-muted-foreground mt-2">Apply to jobs to see your applications here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id} className="bg-black border-gray-600">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-emerald-500 text-lg">{application.jobTitle}</CardTitle>
                <CardDescription>{application.companyName}</CardDescription>
              </div>
              <Badge
                variant={
                  application.status === "accepted"
                    ? "success"
                    : application.status === "rejected"
                      ? "destructive"
                      : "secondary"
                }
              >
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-500">Applied on:</span>
                <span className="text-gray-200">{application.appliedAt}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-500">Proposed rate:</span>
                <span className="text-gray-200">${application.proposedRate}/hr</span>
              </div>
              <div className="pt-2">
                <div className="text-sm text-emerald-500 font-medium mb-1">Cover Letter:</div>
                <p className="text-sm line-clamp-3 text-gray-200">{application.coverLetter}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}