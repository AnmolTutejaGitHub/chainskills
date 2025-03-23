import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Briefcase, Clock, Coins } from "lucide-react"
// import { getAvailableJobs } from "@/lib/jobs"
import {getAvailableJobs} from "../lib/freelancer";

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

const normalizeJobs = (rawJobs) => {
  return rawJobs.map((job) => ({
      id: job[0].toString(),
      title: job[2],
      description: job[3],
      skills: Object.values(job[4]),
      jobType: "hourly",
      budget: Number(job[6]) / 1e18,
      postedAt: (new Date(Number(job[10]) * 1000)).toLocaleDateString(),
      status: job[11] === 1n ? "active" : "closed",
      applicantsCount: Number(job[12]),
      duration : Number(job[6]),
      companyName : job[13],
      experienceLevel: job[11] === 0n ? "beginner" : job[11] === 1n ? "intermediate" : "expert"
  }));
};

export default function FreelancerJobList() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getAvailableJobs()
        const normalised = normalizeJobs(jobsData);
        setJobs(normalised);
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
        <Card key={job.id} className="bg-black border-gray-600">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-emerald-500 text-lg">{job.title}</CardTitle>
                <CardDescription className="text-gray-400">{job.companyName}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm line-clamp-3 mb-4 text-gray-200">{job.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="flex items-center gap-1">
              <Coins className="h-4 w-4 text-muted-foreground" />
                <span className="text-gray-400">{job.jobType === "fixed" ? `${job.budget} fixed` : `${job.budget} ETH`}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-gray-400">{job.experienceLevel}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-gray-400">{job.duration} Days</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-4">
            <div className="text-sm text-muted-foreground">Posted {job.postedAt}</div>
            <Button className="bg-emerald-500 text-black hover:bg-emerald-400 cursor-pointer">Apply Now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}