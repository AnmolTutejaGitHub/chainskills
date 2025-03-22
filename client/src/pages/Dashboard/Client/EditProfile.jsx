import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
// import { getClientProfile, updateClientProfile } from "@/lib/profile";
import { Loader2 } from "lucide-react";
import Header from "../../../components/dashboard/Header";

export default function EditClientProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    website: "",
    industry: "",
    description: "",
    companyLogo: "/placeholder.svg?height=128&width=128",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getClientProfile();
        if (profile) {
          setFormData({
            ...profile,
            companyLogo: profile.companyLogo || "/placeholder.svg?height=128&width=128",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateClientProfile(formData);
    //   router.push("/dashboard/client");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <Header />
    <div className="container max-w-3xl py-10 bg-black">
      <Card className="border border-emerald-300 bg-black">
        <CardHeader>
          <CardTitle className="text-emerald-500">Edit Company Profile</CardTitle>
          <CardDescription className="text-emerald-400">
            Update your company information to attract the best talent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <Avatar className="h-24 w-24 border-2 border-emerald-400">
                <AvatarImage src={formData.companyLogo} alt={formData.companyName} />
                <AvatarFallback className="bg-emerald-100 text-emerald-500">
                  {formData.companyName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Label htmlFor="companyLogo">Company Logo</Label>
                <Input
                  id="companyLogo"
                  name="companyLogo"
                  type="text"
                  placeholder="URL to your company logo"
                  value={formData.companyLogo}
                  onChange={handleChange}
                  className="border-emerald-300 focus:ring-emerald-500"
                />
                <p className="text-xs text-emerald-400">
                  Enter a URL to your company logo or leave as is to use the default
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Acme Inc."
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="border-emerald-300 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">Company Email</Label>
                  <Input
                    id="companyEmail"
                    name="companyEmail"
                    type="email"
                    placeholder="contact@acme.com"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    required
                    className="border-emerald-300 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://acme.com"
                    value={formData.website}
                    onChange={handleChange}
                    className="border-emerald-300 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    placeholder="Technology"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="border-emerald-300 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell freelancers about your company, mission, and the type of work you're looking for..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="border-emerald-300 focus:ring-emerald-500"
                />
              </div>
            </div>

            <CardFooter className="flex justify-end px-0 pt-4">
              <div className="flex gap-2">
                <Button type="button" variant="outline"
                // onClick={() => router.push("/dashboard/client")}
                className="text-emerald-500 border-emerald-400 hover:bg-emerald-50">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-emerald-500 text-white hover:bg-emerald-600">
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}