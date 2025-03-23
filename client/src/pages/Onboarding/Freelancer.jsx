import { useState } from "react";
import { Layers } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { saveFreelancerProfile } from "../../lib/freelancer"

const avail_OPTIONS = [
  { label: "(UTC-12:00) International Date Line West", value: "UTC-12:00" },
  { label: "(UTC-11:00) Coordinated Universal Time-11", value: "UTC-11:00" },
  { label: "(UTC-10:00) Hawaii", value: "UTC-10:00" },
  { label: "(UTC-09:00) Alaska", value: "UTC-09:00" },
  { label: "(UTC-08:00) Pacific Time (US & Canada)", value: "UTC-08:00" },
  { label: "(UTC-07:00) Mountain Time (US & Canada)", value: "UTC-07:00" },
  { label: "(UTC-06:00) Central Time (US & Canada)", value: "UTC-06:00" },
  { label: "(UTC-05:00) Eastern Time (US & Canada)", value: "UTC-05:00" },
  { label: "(UTC-04:00) Atlantic Time (Canada)", value: "UTC-04:00" },
  { label: "(UTC-03:30) Newfoundland", value: "UTC-03:30" },
  { label: "(UTC-03:00) Buenos Aires", value: "UTC-03:00" },
  { label: "(UTC-02:00) Mid-Atlantic", value: "UTC-02:00" },
  { label: "(UTC-01:00) Azores", value: "UTC-01:00" },
  { label: "(UTC+00:00) Greenwich Mean Time", value: "UTC+00:00" },
  { label: "(UTC+01:00) Central European Time", value: "UTC+01:00" },
  { label: "(UTC+02:00) Eastern European Time", value: "UTC+02:00" },
  { label: "(UTC+03:00) Moscow", value: "UTC+03:00" },
  { label: "(UTC+03:30) Tehran", value: "UTC+03:30" },
  { label: "(UTC+04:00) Abu Dhabi", value: "UTC+04:00" },
  { label: "(UTC+04:30) Kabul", value: "UTC+04:30" },
  { label: "(UTC+05:00) Islamabad", value: "UTC+05:00" },
  { label: "(UTC+05:30) India Standard Time", value: "UTC+05:30" },
  { label: "(UTC+05:45) Kathmandu", value: "UTC+05:45" },
  { label: "(UTC+06:00) Dhaka", value: "UTC+06:00" },
  { label: "(UTC+07:00) Bangkok", value: "UTC+07:00" },
  { label: "(UTC+08:00) Singapore", value: "UTC+08:00" },
  { label: "(UTC+09:00) Tokyo", value: "UTC+09:00" },
  { label: "(UTC+09:30) Adelaide", value: "UTC+09:30" },
  { label: "(UTC+10:00) Sydney", value: "UTC+10:00" },
  { label: "(UTC+11:00) Magadan", value: "UTC+11:00" },
  { label: "(UTC+12:00) Auckland", value: "UTC+12:00" },
  { label: "(UTC+13:00) Nuku'alofa", value: "UTC+13:00" },
];

export default function FreelancerOnboarding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: [],
    avail: "",
    hourlyRate: "",
    bio: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const navigate = useNavigate();

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
      await saveFreelancerProfile(formData);
      navigate('/dashboard/freelancer');
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">

      <div className="flex items-center gap-3">
        <a href="/" className="relative group flex items-center gap-2">
          <Layers className="text-emerald-500 h-6 w-6" />
          <span className="relative text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text">
            ChainSkills
          </span>
        </a>
      </div>

      <div className="container max-w-3xl w-full p-8 text-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-emerald-500">Complete Your Freelancer Profile</h1>
        <p className="text-gray-200 mb-6">
          Tell us about yourself and your skills to get started on ChainSkills
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
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
                  Hourly Rate (ETH)
                </label>
                <input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="0.00056"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="avail" className="block text-sm font-medium text-gray-200">
                  TimeZone
                </label>
                <select
                  value={formData.avail}
                  onChange={(e) => handleChange(e)}
                  name="avail"
                  className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-black transform transition-transform duration-200"
                >
                  <option value="" disabled>
                    Select your avail
                  </option>
                  {avail_OPTIONS.map((option) => (
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

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-white bg-emerald-700 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-700 transform transition-transform duration-300"
            >
              {isSubmitting ? "Saving..." : "Complete Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}