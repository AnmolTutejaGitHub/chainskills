"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Star } from "lucide-react"

const mockClientApplications = [
    {
        id: "app1",
        jobTitle: "Web3 Integration Specialist",
        freelancerName: "Alex Johnson",
        freelancerAvatar: "/placeholder.svg?height=40&width=40",
        appliedAt: "May 18, 2025",
        proposedRate: 65,
        coverLetter:
            "I've been working with Web3 technologies for over 4 years and have integrated various wallets and smart contracts into web applications. I'm confident I can help with your integration needs.",
        experience: "4 years of Web3 development",
        rating: 4.8,
        status: "pending",
    },
    {
        id: "app2",
        jobTitle: "Web3 Integration Specialist",
        freelancerName: "Sarah Miller",
        freelancerAvatar: "/placeholder.svg?height=40&width=40",
        appliedAt: "May 17, 2025",
        proposedRate: 70,
        coverLetter:
            "As a full-stack developer with a focus on blockchain technologies, I've helped multiple companies integrate Web3 functionality into their existing applications. I'd love to discuss how I can help with your project.",
        experience: "3 years of Web3 development",
        rating: 4.5,
        status: "pending",
    },
    {
        id: "app3",
        jobTitle: "Solidity Smart Contract Developer",
        freelancerName: "Michael Chen",
        freelancerAvatar: "/placeholder.svg?height=40&width=40",
        appliedAt: "May 15, 2025",
        proposedRate: 85,
        coverLetter:
            "I'm a Solidity expert with experience developing and auditing smart contracts for NFT platforms. I've worked on several successful NFT projects and can help you create secure and efficient smart contracts for your platform.",
        experience: "5 years of Solidity development",
        rating: 4.9,
        status: "accepted",
    },
]

export default function ClientApplications() {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                // const applicationsData = await getClientApplications()
                setApplications(mockClientApplications)
            } catch (error) {
                console.error("Error fetching applications:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchApplications()
    }, [])

    if (loading) {
        return <div className="flex justify-center p-8">Loading applications...</div>
    }

    if (applications.length === 0) {
        return (
            <div className="text-center p-8">
                <h3 className="text-lg font-medium">No applications yet</h3>
                <p className="text-muted-foreground mt-2">Your job listings haven't received any applications yet</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {applications.map((application) => (
                <Card key={application.id}>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <CardTitle>{application.jobTitle}</CardTitle>
                            <Badge
                                variant={
                                    application.status === "pending"
                                        ? "secondary"
                                        : application.status === "accepted"
                                            ? "success"
                                            : "destructive"
                                }
                            >
                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </Badge>
                        </div>
                        <CardDescription>Applied {application.appliedAt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-start gap-4 mb-4">
                            <Avatar>
                                <AvatarImage src={application.freelancerAvatar} alt={application.freelancerName} />
                                <AvatarFallback>{application.freelancerName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">{application.freelancerName}</div>
                                <div className="text-sm text-muted-foreground">{application.experience}</div>
                                <div className="flex items-center mt-1">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.floor(application.rating)
                                                        ? "text-yellow-500 fill-yellow-500"
                                                        : "text-muted-foreground"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm ml-1">{application.rating.toFixed(1)}</span>
                                </div>
                            </div>
                            <div className="ml-auto text-right">
                                <div className="font-medium">${application.proposedRate}/hr</div>
                                <div className="text-sm text-muted-foreground">Proposed rate</div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium mb-1">Cover Letter:</div>
                            <p className="text-sm">{application.coverLetter}</p>
                        </div>
                    </CardContent>
                    {application.status === "pending" && (
                        <CardFooter className="flex justify-end gap-2 border-t pt-4">
                            <Button variant="outline">Message</Button>
                            <Button variant="destructive">Decline</Button>
                            <Button>Accept</Button>
                        </CardFooter>
                    )}
                </Card>
            ))}
        </div>
    )
}