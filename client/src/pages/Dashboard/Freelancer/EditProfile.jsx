import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
// import { getFreelancerProfile, updateFreelancerProfile } from "@/lib/profile"
import { Loader2 } from "lucide-react"

const SKILLS_OPTIONS = [
  { label: "JavaScript", value: "javascript" },
  { label: "React", value: "react" },
  { label: "Node.js", value: "nodejs" },
  { label: "Solidity", value: "solidity" },
  { label: "Smart Contracts", value: "smart-contracts" },
  { label: "Web3", value: "web3" },
  { label: "UI/UX Design", value: "ui-ux" },
  { label: "Blockchain", value: "blockchain" },
  { label: "DeFi", value: "defi" },
  { label: "NFT", value: "nft" },
]

const TIMEZONE_OPTIONS = [
  { label: "UTC-12:00", value: "UTC-12:00" },
  { label: "UTC-11:00", value: "UTC-11:00" },
  { label: "UTC-10:00", value: "UTC-10:00" },
  { label: "UTC-09:00", value: "UTC-09:00" },
  { label: "UTC-08:00", value: "UTC-08:00" },
  { label: "UTC-07:00", value: "UTC-07:00" },
  { label: "UTC-06:00", value: "UTC-06:00" },
  { label: "UTC-05:00", value: "UTC-05:00" },
  { label: "UTC-04:00", value: "UTC-04:00" },
  { label: "UTC-03:00", value: "UTC-03:00" },
  { label: "UTC-02:00", value: "UTC-02:00" },
  { label: "UTC-01:00", value: "UTC-01:00" },
  { label: "UTC+00:00", value: "UTC+00:00" },
  { label: "UTC+01:00", value: "UTC+01:00" },
  { label: "UTC+02:00", value: "UTC+02:00" },
  { label: "UTC+03:00", value: "UTC+03:00" },
  { label: "UTC+04:00", value: "UTC+04:00" },
  { label: "UTC+05:00", value: "UTC+05:00" },
  { label: "UTC+05:30", value: "UTC+05:30" },
  { label: "UTC+06:00", value: "UTC+06:00" },
  { label: "UTC+07:00", value: "UTC+07:00" },
  { label: "UTC+08:00", value: "UTC+08:00" },
  { label: "UTC+09:00", value: "UTC+09:00" },
  { label: "UTC+10:00", value: "UTC+10:00" },
  { label: "UTC+11:00", value: "UTC+11:00" },
  { label: "UTC+12:00", value: "UTC+12:00" },
]

export default function EditFreelancerProfile() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    skills: [],
    hourlyRate: "",
    timezone: "",
    bio: "",
    profileImage: "/placeholder.svg?height=128&width=128",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getFreelancerProfile()
        if (profile) {
          setFormData({
            ...profile,
            profileImage: profile.profileImage || "/placeholder.svg?height=128&width=128",
          })
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = (selectedSkills) => {
    setFormData((prev) => ({ ...prev, skills: selectedSkills }))
  }

  const handleTimezoneChange = (value) => {
    setFormData((prev) => ({ ...prev, timezone: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await updateFreelancerProfile(formData)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
          <CardDescription>Update your profile information to showcase your skills and experience</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.profileImage} alt={formData.fullName} />
                <AvatarFallback>{formData.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Label htmlFor="profileImage">Profile Image</Label>
                <Input
                  id="profileImage"
                  name="profileImage"
                  type="text"
                  placeholder="URL to your profile image"
                  value={formData.profileImage}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  Enter a URL to your profile image or leave as is to use the default
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <MultiSelect
                  options={SKILLS_OPTIONS}
                  selected={formData.skills}
                  onChange={handleSkillsChange}
                  placeholder="Select your skills"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                  <Input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    min="1"
                    placeholder="50"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select onValueChange={handleTimezoneChange} value={formData.timezone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell clients about your experience, skills, and expertise..."
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>
            </div>

            <CardFooter className="flex justify-end px-0 pt-4">
              <div className="flex gap-2">
                <Button type="button" variant="outline"
                // onClick={() => router.push("/dashboard/freelancer")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}