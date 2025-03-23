"use client"

import { useState, useEffect } from "react"
import { getProfileData } from "../lib/freelancer";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import Header from "../components/dashboard/Header"

const normalizeProfile = (rawProfileData) => {
    return {
      addr: rawProfileData[0].toString(), 
      name: rawProfileData[1], 
      email: rawProfileData[2], 
      skills: Object.values(rawProfileData[3]), 
      avail: rawProfileData[4], 
      hourlyRate: Number(rawProfileData[5]) / 1e18, 
      bio: rawProfileData[6], // Bio
      rating: Number(rawProfileData[7]), 
      peopleRated: Number(rawProfileData[8]), 
      totalProjectsCompleted: Number(rawProfileData[9]), 
    };
  };

export default function FreelancerProfileData(){
    const { id : devAddr } = useParams();
    const [profile, setProfile] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const rawProfileData = await getProfileData(devAddr);
                console.log("freelencers pf data",rawProfileData);
                const normalise = normalizeProfile(rawProfileData);
                setProfile(normalise);
            } catch (error) {
                console.error("Error fetching profile:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProfileData()
    }, [])

    if (loading) {
        return <div className="flex justify-center p-8">Loading Profile data...</div>
    }

    if (profile.length === 0) {
        return (
            <div className="text-center p-8">
                <h3 className="text-lg font-medium">No Profile data yet</h3>
            </div>
        )
    }
    return (
        <div className="space-y-4 min-h-screen bg-black">
            <Header/>
          <Card className="bg-black border-gray-600">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-emerald-500 text-lg">
                  {profile.name}
                </CardTitle>
                <Badge
                  variant={
                    profile.rating >= 4
                      ? "success"
                      : profile.rating >= 2
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {profile.rating.toFixed(1)} ★
                </Badge>
              </div>
              <CardDescription>Email: {profile.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4 mb-4">
                <div>
                  <div className="font-medium text-emerald-300">{profile.addr}</div>
                  <div className="text-sm text-muted-foreground">
                   Available : {profile.avail}
                  </div>
                  <div className="text-sm text-gray-300">
                    Hourly Rate: {profile.hourlyRate} ETH/hr
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1 text-emerald-300">
                  Bio:
                </div>
                <p className="text-sm text-gray-200">{profile.bio}</p>
              </div>
              <div className="mt-4">
                <div className="text-sm font-medium text-emerald-300">Skills:</div>
                <ul className="list-disc ml-5 text-gray-300">
                  {profile.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 text-sm text-gray-300">
                Total Projects Completed: {profile.totalProjectsCompleted}
              </div>
            </CardContent>
          </Card>
        </div>
      );
}