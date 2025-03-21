import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Plus } from "lucide-react"
import ClientJobList from "../../components/ClientJobList"
import ClientApplications from "../../components/ClientApplications"
import ClientActiveContracts from "../../components/ClientActiveContracts"
import Header from "../../components/dashboard/Header";

export default function ClientDashboard() {
  const clientProfile = {
    companyName: "Google",
    industry: "Technology",
    jobsPosted: 8,
    activeContracts: 3,
    totalSpent: 12500,
  }

  return (
    <div>
      <Header />
      <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
        <div className="space-y-6 mt-10 bg-black">
          <Card className="">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt={clientProfile.companyName} />
                  <AvatarFallback>{clientProfile.companyName.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </div>
              <CardTitle className="mt-4">{clientProfile.companyName}</CardTitle>
              <CardDescription>{clientProfile.industry}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Jobs Posted</div>
                    <div className="text-xl font-bold">{clientProfile.jobsPosted}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Active Contracts</div>
                    <div className="text-xl font-bold">{clientProfile.activeContracts}</div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-sm text-muted-foreground">Total Spent</div>
                  <div className="text-2xl font-bold">${clientProfile.totalSpent}</div>
                </div>

                <a href="/dashboard/client/post-job">
                  <Button className="w-full mt-2">
                    <Plus className="mr-2 h-4 w-4" /> Post a New Job
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="jobs">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="jobs">My Job Listings</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="contracts">Active Contracts</TabsTrigger>
            </TabsList>
            <TabsContent value="jobs" className="mt-4">
              <ClientJobList />
            </TabsContent>
            <TabsContent value="applications" className="mt-4">
              <ClientApplications />
            </TabsContent>
            <TabsContent value="contracts" className="mt-4">
              <ClientActiveContracts />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}