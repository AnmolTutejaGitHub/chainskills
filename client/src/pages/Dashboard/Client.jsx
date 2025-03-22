import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Plus, MessageSquare } from "lucide-react"
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
    totalSpent: 563,
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="grid gap-6 md:grid-cols-[1fr_3fr] bg-black pt-10 px-10">
        <div className="space-y-6 mt-10 bg-black">
          <Card className="border-2 border-emerald-200 bg-black">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt={clientProfile.companyName} />
                  <AvatarFallback>{clientProfile.companyName.charAt(0)}</AvatarFallback>
                </Avatar>
                <a href="/dashboard/client/edit-profile">
                  <Button className="bg-emerald-400 border-0 hover:bg-emerald-300 cursor-pointer" variant="outline" size="sm">
                    Edit Profile
                  </Button>
                </a>
              </div>
              <CardTitle className="mt-4 text-emerald-300 text-2xl">{clientProfile.companyName}</CardTitle>
              <CardDescription className="text-gray-300">{clientProfile.industry}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <div className="text-sm text-emerald-300">Jobs Posted</div>
                    <div className="text-xl font-bold text-white">{clientProfile.jobsPosted}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-emerald-300">Active Contracts</div>
                    <div className="text-xl font-bold text-white">{clientProfile.activeContracts}</div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-sm text-emerald-300">Total Spent</div>
                  <div className="text-2xl font-bold text-white">ETH. {clientProfile.totalSpent}</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a href="/dashboard/client/post-job">
                    <Button className="w-full cursor-pointer">
                      <Plus className="mr-2 h-4 w-4" /> Post Job
                    </Button>
                  </a>
                  <a href="/dashboard/messages">
                    <Button variant="outline" className="w-full gap-2 cursor-pointer">
                      <MessageSquare className="h-4 w-4" />
                      Messages
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="jobs">
            <TabsList className="grid w-full grid-cols-3 bg-emerald-200">
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