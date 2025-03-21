import { useState } from "react"
// import { useRouter } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
// import { select } from "@/components/multi-select"
// import { createJob } from "@/lib/jobs"

const EXPERIENCE_LEVELS = [
  { label: "Entry Level", value: "entry" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Expert", value: "expert" },
]

export default function PostJobPage() {
//   const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: [],
    jobType: "",
    budget: "",
    experienceLevel: "",
    duration: "",
  })
    const [skillInput, setSkillInput] = useState("");

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


  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
    //   await createJob(formData)
    //   router.push("/dashboard/client")
    } catch (error) {
      console.error("Error creating job:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <Card>
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
          <CardDescription>Create a job listing to find the perfect talent for your project</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Smart Contract Developer for DeFi Project"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the project, responsibilities, deliverables, and any other relevant details..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={8}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (USD)</Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    min="1"
                    placeholder={formData.jobType === "fixed" ? "Total budget" : "Hourly rate"}
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("experienceLevel", value)}
                    value={formData.experienceLevel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_LEVELS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Project Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="e.g., 2 weeks, 3 months"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <CardFooter className="flex justify-end px-0 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Job"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}