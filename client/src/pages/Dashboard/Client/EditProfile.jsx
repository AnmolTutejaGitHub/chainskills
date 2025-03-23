import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Building2, Globe, Briefcase, ChevronRight, Shield, Loader2, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Header from "../../../components/dashboard/Header"

export default function EditClientProfile() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    website: "",
    industry: "",
    description: "",
    companyLogo: "/placeholder.svg?height=128&width=128",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const profile = await getClientProfile()
        // if (profile) {
        //   setFormData({
        //     ...profile,
        //     companyLogo: profile.companyLogo || "/placeholder.svg?height=128&width=128",
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // await updateClientProfile(formData)
      navigate("/dashboard/client")
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
          href="/dashboard/client"
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </a>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 mb-4 bg-emerald-900/30 rounded-full">
            <Building2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl mb-2">Edit Company Profile</h1>
          <p className="text-emerald-300/80 max-w-2xl mx-auto">
            Update your company information to attract the best talent
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-emerald-900/10 border border-emerald-900/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <Building2 className="h-4 w-4" />
                  <Label htmlFor="companyName" className="text-base">
                    Company Information
                  </Label>
                </div>
                <div className="space-y-4 pl-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Avatar className="h-24 w-24 border-2 border-emerald-900/50">
                      <AvatarImage src={formData.companyLogo} alt={formData.companyName} />
                      <AvatarFallback className="bg-emerald-900/30 text-emerald-200 text-xl">
                        {formData.companyName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 w-full">
                      <Label htmlFor="companyLogo" className="text-emerald-200">
                        Company Logo URL
                      </Label>
                      <Input
                        id="companyLogo"
                        name="companyLogo"
                        placeholder="https://example.com/your-logo.jpg"
                        value={formData.companyLogo}
                        onChange={handleChange}
                        className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30 mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-emerald-200">
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        placeholder="Acme Inc."
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail" className="text-emerald-200">
                        Company Email
                      </Label>
                      <Input
                        id="companyEmail"
                        name="companyEmail"
                        type="email"
                        placeholder="contact@acme.com"
                        value={formData.companyEmail}
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
                  <Globe className="h-4 w-4" />
                  <Label className="text-base">Web Presence</Label>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-emerald-200">
                      Website (Optional)
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://acme.com"
                      value={formData.website}
                      onChange={handleChange}
                      className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-emerald-200">
                      Industry
                    </Label>
                    <Input
                      id="industry"
                      name="industry"
                      placeholder="Technology"
                      value={formData.industry}
                      onChange={handleChange}
                      required
                      className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30"
                    />
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent my-4" />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <Briefcase className="h-4 w-4" />
                  <Label htmlFor="description" className="text-base">
                    Company Description
                  </Label>
                </div>
                <div className="space-y-4 pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-emerald-200">
                      About Your Company
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Tell freelancers about your company, mission, and the type of work you're looking for..."
                      value={formData.description}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button
                type="button"
                onClick={() => navigate("/dashboard/client")}
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
            <span>Your company profile is secured on the blockchain and owned by you</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}