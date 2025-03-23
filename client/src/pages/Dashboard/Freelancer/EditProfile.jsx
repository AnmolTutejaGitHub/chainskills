import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { User, Code, DollarSign, ChevronRight, Shield, Loader2, ArrowLeft } from "lucide-react"
import Header from "../../../components/dashboard/Header"

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
  const navigate = useNavigate()
  const [skillInput, setSkillInput] = useState("");
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
        // const profile = await getFreelancerProfile()
        // if (profile) {
        //   setFormData({
        //     ...profile,
        //     profileImage: profile.profileImage || "/placeholder.svg?height=128&width=128",
        //   })
        // }
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

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedSkill = skillInput.trim();
      if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, trimmedSkill],
        }));
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleTimezoneChange = (value) => {
    setFormData((prev) => ({ ...prev, timezone: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // await updateFreelancerProfile(formData)
      navigate("/dashboard/freelancer")
    } catch (error) {
      console.error("Error updating profile:", error)
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
              <User className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl mb-2">Edit Your Profile</h1>
            <p className="text-emerald-300/80 max-w-2xl mx-auto">
              Update your profile to showcase your latest skills and experience
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-emerald-900/10 border border-emerald-900/20">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <User className="h-4 w-4" />
                    <Label htmlFor="fullName" className="text-base">
                      Personal Information
                    </Label>
                  </div>
                  <div className="space-y-4 pl-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <Avatar className="h-24 w-24 border-2 border-emerald-900/50">
                        <AvatarImage src={formData.profileImage} alt={formData.fullName} />
                        <AvatarFallback className="bg-emerald-900/30 text-emerald-200 text-xl">
                          {formData.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 w-full">
                        <Label htmlFor="profileImage" className="text-emerald-200">
                          Profile Image URL
                        </Label>
                        <Input
                          id="profileImage"
                          name="profileImage"
                          placeholder="https://example.com/your-image.jpg"
                          value={formData.profileImage}
                          onChange={handleChange}
                          className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30 mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-emerald-200">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-emerald-200">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent my-4" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <Code className="h-4 w-4" />
                    <Label htmlFor="skills" className="text-base">
                      Skills & Expertise
                    </Label>
                  </div>
                  <div className="space-y-4 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="skills" className="text-emerald-200">
                        Skills
                      </Label>
                      <div className="flex flex-wrap items-center gap-2 border border-gray-600 rounded-md p-2">
                        {formData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-2 text-green-500 hover:text-green-700"
                            >
                              x
                            </button>
                          </span>
                        ))}
                        <input
                          type="text"
                          value={skillInput}
                          onChange={handleSkillInputChange}
                          onKeyDown={handleSkillKeyDown}
                          placeholder="Add skills (press Enter or ',')"
                          className="flex-1 focus:outline-none focus:ring-0 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-emerald-200">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        placeholder="Tell clients about your experience, skills, and expertise..."
                        value={formData.bio}
                        onChange={handleChange}
                        rows={5}
                        required
                        className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30 resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent my-4" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <DollarSign className="h-4 w-4" />
                    <Label className="text-base">Rate & Availability</Label>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate" className="text-emerald-200">
                        Hourly Rate (USD)
                      </Label>
                      <Input
                        id="hourlyRate"
                        name="hourlyRate"
                        type="number"
                        min="1"
                        placeholder="50"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        required
                        className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone" className="text-emerald-200">
                        Timezone
                      </Label>
                      <Select onValueChange={handleTimezoneChange} value={formData.timezone}>
                        <SelectTrigger className="bg-gray-900/70 border-emerald-900/30 focus:ring-emerald-500 text-emerald-50">
                          <SelectValue placeholder="Select your timezone" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-emerald-900/30 text-emerald-50">
                          {TIMEZONE_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="focus:bg-emerald-900/30 focus:text-emerald-200"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
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
                  {isSubmitting ? "Saving..." : "Save Changes"}
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2 text-emerald-500/60 text-sm">
              <Shield className="h-4 w-4" />
              <span>Your profile is secured on the blockchain and owned by you</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}