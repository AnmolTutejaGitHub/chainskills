"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Award, ExternalLink } from "lucide-react"
import { Button } from "./ui/button"
// import { getFreelancerCertifications } from "@/lib/certifications"

const mockFreelancerCertifications = [
    {
      id: "cert1",
      title: "Smart Contract Development",
      issuer: "DeFi Innovations",
      issuedAt: "April 20, 2025",
      skills: ["Solidity", "Smart Contracts", "DeFi"],
      tokenId: "0x7c3b85b9bcf5ec9a2e196565a6d5c4d3a793bde8",
      blockchainUrl: "https://etherscan.io/token/0x7c3b85b9bcf5ec9a2e196565a6d5c4d3a793bde8",
    },
    {
      id: "cert2",
      title: "Web3 Frontend Integration",
      issuer: "MetaVerse Inc",
      issuedAt: "March 15, 2025",
      skills: ["React", "JavaScript", "Web3"],
      tokenId: "0x3a4e7b8c9d0f1e2a3b4c5d6e7f8a9b0c1d2e3f4a",
      blockchainUrl: "https://etherscan.io/token/0x3a4e7b8c9d0f1e2a3b4c5d6e7f8a9b0c1d2e3f4a",
    },
    {
      id: "cert3",
      title: "Blockchain Security Audit",
      issuer: "SecureChain",
      issuedAt: "February 10, 2025",
      skills: ["Security", "Auditing", "Smart Contracts"],
      tokenId: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
      blockchainUrl: "https://etherscan.io/token/0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    },
  ]

export default function FreelancerCertifications() {
  const [certifications, setCertifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        // const certificationsData = await getFreelancerCertifications()
        setCertifications(mockFreelancerCertifications)
      } catch (error) {
        console.error("Error fetching certifications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertifications()
  }, [])

  if (loading) {
    return <div className="flex justify-center p-8">Loading your certifications...</div>
  }

  if (certifications.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium">No certifications yet</h3>
        <p className="text-muted-foreground mt-2">Complete jobs to earn NFT certifications</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {certifications.map((certification) => (
        <Card key={certification.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{certification.title}</CardTitle>
                <CardDescription>
                  Issued by {certification.issuer} on {certification.issuedAt}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Skills Certified</div>
                <div className="flex flex-wrap gap-2">
                  {certification.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-muted-foreground">
                  Token ID: {certification.tokenId.substring(0, 8)}...
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={certification.blockchainUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    View on Blockchain
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}