import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import Header from "../../../components/dashboard/Header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { BriefcaseBusiness, Sparkles, Coins, Clock, ChevronRight, Briefcase } from "lucide-react";
import { postJob } from "../../../lib/company";
import { useNavigate } from "react-router-dom";

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
    budget: "",
    experienceLevel: "",
    duration: 0,
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
      await postJob(formData);
      navigate('/dashboard/client');
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="flex flex-col justify-center items-center">
        <div className="container max-w-4xl py-12">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center p-2 mb-4 bg-emerald-900/30 rounded-full">
              <BriefcaseBusiness className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl mb-2">Post a New Job</h1>
            <p className="text-emerald-300/80 max-w-2xl mx-auto">
              Find the perfect talent for your blockchain project in our decentralized marketplace
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-emerald-900/10 border border-emerald-900/20">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <Sparkles className="h-4 w-4" />
                    <Label htmlFor="title" className="text-base">
                      Job Details
                    </Label>
                  </div>
                  <div className="space-y-4 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-emerald-200">
                        Job Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g., Smart Contract Developer for DeFi Project"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-emerald-200">
                        Job Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe the project, responsibilities, deliverables, and any other relevant details..."
                        value={formData.description}
                        onChange={handleChange}
                        rows={6}
                        required
                        className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills" className="text-emerald-200">
                        Required Skills
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
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent my-4" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <Coins className="h-4 w-4" />
                    <Label className="text-base">Compensation</Label>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-emerald-200">
                        Budget (ETH)
                      </Label>
                      <Input
                        id="budget"
                        name="budget"
                        type="number"
                        min="0"
                        step="any"
                        placeholder="0.00056"
                        value={formData.budget}
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
                    <Clock className="h-4 w-4" />
                    <Label className="text-base">Timeline & Experience</Label>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="experienceLevel" className="text-emerald-200">
                        Experience Level
                      </Label>
                      <Select
                        onValueChange={(value) => handleSelectChange("experienceLevel", value)}
                        value={formData.experienceLevel}
                      >
                        <SelectTrigger className="bg-gray-900/70 border-emerald-900/30 focus:ring-emerald-500 text-emerald-50">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-emerald-900/30 text-emerald-50">
                          {EXPERIENCE_LEVELS.map((option) => (
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
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-emerald-200">
                        Project Duration (in days)
                      </Label>
                      <Input
                        id="duration"
                        name="duration"
                        type="number"
                        min="1"
                        placeholder="e.g., 2, 30, 365, etc."
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className="bg-gray-900/70 border-emerald-900/30 focus:border-emerald-500 text-emerald-50 placeholder:text-emerald-200/30"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-500 text-black font-medium px-6 py-2 h-auto rounded-full transition-all duration-200 flex items-center gap-2 group"
                >
                  {isSubmitting ? "Posting..." : "Post Job"}
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2 text-emerald-500/60 text-sm">
              <Briefcase className="h-4 w-4" />
              <span>All jobs are secured with smart contracts on the blockchain</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}