"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";

export default function ClientOnboarding() {
//   const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    website: "",
    industry: "",
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
      // await saveClientProfile(formData);
    //   router.push("/dashboard/client");
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="container max-w-3xl w-full p-8 text-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-[#22c55e]">Complete Your Client Profile</h1>
        <p className="text-gray-200 mb-6">
          Tell us about your company to start hiring talent on ChainSkills
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-200">
                  Company Name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  placeholder="Acme Inc."
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-200">
                  Company Email
                </label>
                <input
                  id="companyEmail"
                  name="companyEmail"
                  type="email"
                  placeholder="contact@acme.com"
                  value={formData.companyEmail}
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
                  placeholder="https://acme.com"
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