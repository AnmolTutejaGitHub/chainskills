import { useState } from "react";
import { Layers } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { saveCompanyProfile } from "../../lib/company"

export default function ClientOnboarding() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    website: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await saveCompanyProfile(formData);
        navigate("/dashboard/client");
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
        <h1 className="text-2xl font-bold mb-2 text-emerald-400">Complete Your Client Profile</h1>
        <p className="text-gray-200 mb-6">
          Tell us about your company to start hiring talent on ChainSkills
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                  Company Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Google Inc."
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                  Company Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contact@google.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="website" className="block text-sm font-medium text-gray-200">
                  Website (Optional)
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://google.com"
                  value={formData.website}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="industry" className="block text-sm font-medium text-gray-200">
                  Industry
                </label>
                <input
                  id="industry"
                  name="industry"
                  placeholder="Technology"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-200">
                Company Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Tell freelancers about your company, mission, and the type of work you're looking for..."
                value={formData.description}
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