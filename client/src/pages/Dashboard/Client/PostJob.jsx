import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import Header from "../../../components/dashboard/Header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";

const EXPERIENCE_LEVELS = [
  { label: "Entry Level", value: "entry" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Expert", value: "expert" },
];

export default function PostJobPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: [],
    jobType: "",
    budget: "",
    experienceLevel: "",
    duration: "",
  });
  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <Card className="py-10 w-full max-w-3xl border-2 border-emerald-200 bg-black">
          <CardHeader>
            <CardTitle className="text-emerald-300">Post a New Job</CardTitle>
            <CardDescription className="text-gray-300">
              Create a job listing to find the perfect talent for your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-emerald-300">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Smart Contract Developer for DeFi Project"
                    value={formData.title}
                    onChange={handleChange}
                    className="bg-black border-gray-600 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-emerald-300">Job Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the project, responsibilities, deliverables, and any other relevant details..."
                    value={formData.description}
                    onChange={handleChange}
                    className="bg-black border-gray-600 text-white"
                    rows={8}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-emerald-300">Required Skills</Label>
                  <div className="flex flex-wrap items-center gap-2 border border-gray-600 rounded-md p-2 bg-black">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 text-sm bg-emerald-100 text-emerald-700 rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-emerald-500 hover:text-emerald-700"
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
                      className="flex-1 bg-black text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-emerald-300">Budget (ETH)</Label>
                    <Input
                      id="budget"
                      name="budget"
                      type="number"
                      min="0"
                      step="any"
                      placeholder="1.69"
                      value={formData.budget}
                      onChange={handleChange}
                      className="bg-black border-gray-600 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-emerald-300">Project Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      placeholder="e.g., 2 weeks, 3 months"
                      value={formData.duration}
                      onChange={handleChange}
                      className="bg-black border-gray-600 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="experienceLevel" className="text-emerald-300">Experience Level</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("experienceLevel", value)}
                      value={formData.experienceLevel}
                    >
                      <SelectTrigger className="bg-black border-gray-600 text-white">
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
                </div>
              </div>

              <CardFooter className="flex justify-center gap-4 px-0 pt-4">
                <Button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="bg-gray-600 hover:bg-gray-500 text-white"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-400 hover:bg-emerald-300 text-black"
                >
                  {isSubmitting ? "Posting..." : "Post Job"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}