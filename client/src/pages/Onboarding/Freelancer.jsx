import { useState } from "react";

const TIMEZONE_OPTIONS = [
  { label: "UTC-12:00", value: "UTC-12:00" },
  { label: "UTC+00:00", value: "UTC+00:00" },
  { label: "UTC+05:30", value: "UTC+05:30" },
  { label: "UTC+12:00", value: "UTC+12:00" },
];

export default function FreelancerOnboarding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    skills: [],
    hourlyRate: "",
    timezone: "",
    bio: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // await saveFreelancerProfile(formData);
      // router.push("/dashboard/freelancer");
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="container max-w-3xl w-full p-8 text-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-[#22c55e]">Complete Your Freelancer Profile</h1>
        <p className="text-gray-200 mb-6">
          Tell us about yourself and your skills to get started on ChainSkills
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="skills" className="block text-sm font-medium text-gray-200">
                Skills
              </label>
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
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-200">
                  Hourly Rate (USD)
                </label>
                <input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  min="1"
                  placeholder="50"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-200">
                  Timezone
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => handleChange(e)}
                  name="timezone"
                  className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm hover:border-green-400 bg-[#0f172a] transform transition-transform duration-200"
                >
                  <option value="" disabled>
                    Select your timezone
                  </option>
                  {TIMEZONE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-200">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                placeholder="Tell clients about your experience, skills, and expertise..."
                value={formData.bio}
                onChange={handleChange}
                rows={5}
                required
                className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-white bg-[#a4de80] rounded-md hover:bg-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#22c55e] transform transition-transform duration-300"
            >
              {isSubmitting ? "Saving..." : "Complete Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}