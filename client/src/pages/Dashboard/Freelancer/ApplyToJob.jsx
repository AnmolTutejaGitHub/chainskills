"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Badge } from "../../../components/ui/badge"
import { Briefcase, DollarSign, Clock, ChevronRight, Shield, Loader2, ArrowLeft, Building2 } from "lucide-react"
import Header from "../../../components/dashboard/Header"

const jobData =
{
    id: "3",
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
}

export default function ApplyToJobPage() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [job, setJob] = useState(null)
    const [walletAddress, setWalletAddress] = useState(null)
    const [formData, setFormData] = useState({
        proposedRate: "",
        coverLetter: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            try {

                setJob(jobData)
                setWalletAddress("rsthnsyrxnxyfn zyn")
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [jobData.id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!job || !walletAddress) return

        setIsSubmitting(true)

        try {

            navigate("/dashboard/freelancer")
        } catch (error) {
            console.error("Error applying to job:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-emerald-50 flex items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-emerald-400" />
            </div>
        )
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-black text-emerald-50 flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-emerald-400 mb-4">Job Not Found</h1>
                    <p className="text-emerald-300/80 mb-6">
                        The job listing you're looking for doesn't exist or has been removed.
                    </p>
                    <a href="/dashboard/freelancer">
                        <Button className="bg-emerald-600 hover:bg-emerald-500 text-black font-medium px-6 py-2 h-auto rounded-full">
                            Return to Dashboard
                        </Button>
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-emerald-50">
            <Header />
                <div className="flex justify-center items-center">
            <div className="container max-w-4xl py-12">
                <a
                    href="/dashboard/freelancer"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Dashboard</span>
                </a>

                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center p-2 mb-4 bg-emerald-900/30 rounded-full">
                        <Briefcase className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl mb-2">Apply to Job</h1>
                    <p className="text-emerald-300/80 max-w-2xl mx-auto">Submit your proposal for this blockchain project</p>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-emerald-900/10 border border-emerald-900/20 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Building2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                        <h2 className="text-xl font-semibold text-emerald-200">{job.companyName}</h2>
                    </div>

                    <h3 className="text-2xl font-bold text-emerald-400 mb-2">{job.title}</h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill) => (
                            <Badge
                                key={skill}
                                variant="secondary"
                                className="bg-emerald-900/40 text-emerald-200 hover:bg-emerald-800/40"
                            >
                                {skill}
                            </Badge>
                        ))}
                    </div>

                    <p className="text-emerald-100/90 mb-6 whitespace-pre-line">{job.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                            <div>
                                <span className="text-emerald-300/70 block">Budget</span>
                                <span className="font-medium text-emerald-200">
                                    {job.jobType === "fixed" ? `$${job.budget} fixed` : `$${job.budget}/hr`}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                            <div>
                                <span className="text-emerald-300/70 block">Experience Level</span>
                                <span className="font-medium text-emerald-200">{job.experienceLevel}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                            <div>
                                <span className="text-emerald-300/70 block">Duration</span>
                                <span className="font-medium text-emerald-200">{job.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-emerald-900/10 border border-emerald-900/20">
                    <h3 className="text-xl font-semibold text-emerald-400 mb-6">Your Proposal</h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="proposedRate" className="text-emerald-200">
                                    {job.jobType === "fixed" ? "Your Bid (USD)" : "Hourly Rate (USD)"}
                                </Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400">$</span>
                                    <Input
                                        id="proposedRate"
                                        name="proposedRate"
                                        type="number"
                                        min="1"
                                        placeholder={job.jobType === "fixed" ? "Enter your bid" : "Enter your hourly rate"}
                                        value={formData.proposedRate}
                                        onChange={handleChange}
                                        required
                                        className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30 pl-8"
                                    />
                                </div>
                                <p className="text-xs text-emerald-400/70">
                                    {job.jobType === "fixed" ? `Client's budget: $${job.budget}` : `Client's budget: $${job.budget}/hr`}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="coverLetter" className="text-emerald-200">
                                    Cover Letter
                                </Label>
                                <Textarea
                                    id="coverLetter"
                                    name="coverLetter"
                                    placeholder="Introduce yourself and explain why you're a good fit for this project. Highlight relevant experience and skills."
                                    value={formData.coverLetter}
                                    onChange={handleChange}
                                    rows={8}
                                    required
                                    className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30 resize-none"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <Button
                                type="button"
                                onClick={() => navigate("/dashboard/freelancer")}
                                className="bg-gray-800 hover:bg-gray-700 text-emerald-200 font-medium px-6 py-2 h-auto rounded-full transition-all duration-200"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-emerald-600 hover:bg-emerald-500 text-black font-medium px-6 py-2 h-auto rounded-full transition-all duration-200 flex items-center gap-2 group"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Proposal"}
                                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="flex items-center gap-2 text-emerald-500/60 text-sm">
                        <Shield className="h-4 w-4" />
                        <span>Your application will be secured on the blockchain</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}