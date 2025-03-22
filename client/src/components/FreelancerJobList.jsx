import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Briefcase, Clock, DollarSign } from "lucide-react"
// import { getAvailableJobs } from "@/lib/jobs"

const mockAvailableJobs = [
    {
        id: "job1",
        title: "Smart Contract Developer for DeFi Project",
        companyName: "DeFi Innovations",
        description:
            "We're looking for an experienced Solidity developer to help build our decentralized finance platform. The ideal candidate will have experience with ERC-20 tokens, liquidity pools, and yield farming mechanisms.",
        skills: ["Solidity", "Smart Contracts", "DeFi", "Web3"],
        jobType: "fixed",
        budget: 5000,
        experienceLevel: "Expert",
        duration: "2 months",
        postedAt: "2 days ago",
    },
    {
        id: "job2",
        title: "Frontend Developer for NFT Marketplace",
        companyName: "CryptoArt Collective",
        description:
            "We need a React developer to build the frontend of our NFT marketplace. You'll be working with our design team to create a beautiful and intuitive user interface for browsing, buying, and selling NFTs.",
        skills: ["React", "JavaScript", "Web3", "UI/UX"],
        jobType: "hourly",
        budget: 50,
        experienceLevel: "Intermediate",
        duration: "3 months",
        postedAt: "1 week ago",
    },
    {
        id: "job3",
        title: "Blockchain Security Auditor",
        companyName: "SecureChain",
        description:
            "Looking for a security expert to audit our smart contracts before deployment. Must have experience with common vulnerabilities and attack vectors in blockchain applications.",
        skills: ["Security", "Solidity", "Smart Contracts", "Auditing"],
        jobType: "fixed",
        budget: 3000,
        experienceLevel: "Expert",
        duration: "2 weeks",
        postedAt: "3 days ago",
    },
]

export default function FreelancerJobList() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const jobsData = await getAvailableJobs()
        setJobs(mockAvailableJobs)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  if (loading) {
    return <div className="flex justify-center p-8">Loading available jobs...</div>
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium">No jobs available</h3>
        <p className="text-muted-foreground mt-2">Check back later for new opportunities</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.companyName}</CardDescription>
              </div>
              <Badge variant={job.jobType === "fixed" ? "default" : "outline"}>
                {job.jobType === "fixed" ? "Fixed Price" : "Hourly"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm line-clamp-3 mb-4">{job.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>{job.jobType === "fixed" ? `$${job.budget} fixed` : `$${job.budget}/hr`}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{job.experienceLevel}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{job.duration}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="text-sm text-muted-foreground">Posted {job.postedAt}</div>
            <Button>Apply Now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}