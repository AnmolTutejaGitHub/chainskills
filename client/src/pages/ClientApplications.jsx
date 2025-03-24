"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Star } from "lucide-react"
import {getApplicationsToAProject , acceptApplication , releasePayment} from "../lib/company"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/dashboard/Header"
import { useLocation } from "react-router-dom"

const normalizeApplications = (rawApplications) => {
    return rawApplications.map((Application) => ({
        id: Application[0].toString(),
        title: Application[7],
        charges: Number(Application[2]),
        AppliedAt: (new Date(Number(Application[5]) * 1000)).toLocaleDateString(),
        status: Application[4] === 0n ? "pending" : Application[4] === 1n ? "approved" : "rejected",
        companyName : Application[6],
        coverLetter : Application[3],
        devAddr : Application[1]
    }));
};

export default function ClientApplications() {
    const { id: uuid } = useParams();
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const location = useLocation();
  const { status } = location.state || {};


    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const rawApplicationsData = await getApplicationsToAProject(uuid);
                console.log("freelencers applied to",uuid,rawApplicationsData);
                const normalise = normalizeApplications(rawApplicationsData);
                setApplications(normalise);
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
        <div className="space-y-4 min-h-screen bg-black">
                <Header/>
            {applications.map((application) => (
                <Card key={application.id} className="bg-black border-gray-600">
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-emerald-500 text-lg">{application.title}</CardTitle>
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
                        <CardDescription>Applied {application.AppliedAt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-start gap-4 mb-4">
                            <Avatar>
                                <AvatarImage src={application.freelancerAvatar} alt={application.freelancerName} />
                                <AvatarFallback>{application.freelancerName?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium text-emerald-300" onClick={()=>navigate(`/dashboard/freelancer/${application.devAddr}`)}>{application.devAddr}</div>
                                {/* <div className="text-sm text-muted-foreground">{application.experience}</div> */}
                                <div className="flex items-center mt-1">
                                    {/* <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.floor(application.rating)
                                                        ? "text-yellow-500 fill-yellow-500"
                                                        : "text-muted-foreground"
                                                    }`}
                                            />
                                        ))}
                                    </div> */}
                                    <span className="text-sm ml-1">{application.rating?.toFixed(1)}</span>
                                </div>
                            </div>
                            <div className="ml-auto text-right">
                                <div className="font-medium text-white">{application.charges} ETH</div>
                                <div className="text-sm text-muted-foreground">Proposed rate</div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium mb-1 text-emerald-300">Cover Letter:</div>
                            <p className="text-sm text-gray-200">{application.coverLetter}</p>
                        </div>
                    </CardContent>
                    {application.status === "pending" && (
                        <CardFooter className="flex justify-end gap-2 pt-4">
                            <Button variant="outline">Message</Button>
                            <Button variant="destructive">Decline</Button>
                            <Button variant="default" onClick={()=>acceptApplication(uuid,application.devAddr,application.charges)}>Accept</Button>
                        </CardFooter>
                    )}

                    {application.status === "approved" && status!="closed" && (
                        <CardFooter className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={()=>releasePayment(uuid,5,application.charges)}>Release Payment</Button>
                    </CardFooter>
                    )}

                    {status=="closed" && (
                        <CardFooter className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" >Paid</Button>
                    </CardFooter>
                    )}

                </Card>
                
            ))}
        </div>
    )
}