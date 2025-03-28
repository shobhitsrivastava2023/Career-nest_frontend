"use client";

import { useState, useEffect } from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaGlobe, 
  FaStackOverflow, 
  FaKaggle, 
  FaDribbble, 
  FaFigma, 
  FaBehance
} from 'react-icons/fa';
import { SiLeetcode, SiGooglescholar } from 'react-icons/si';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSonner } from 'sonner';

const positionOptions = [
  { value: "student", label: "Student" },
  { value: "sde", label: "Software Development Engineer (SDE)" },
  { value: "sre", label: "Site Reliability Engineer (SRE)" },
  { value: "sde-ii", label: "Software Development Engineer II (SDE-II)" },
  { value: "ml-engineer", label: "Machine Learning Engineer" },
  { value: "designer", label: "Designer" },
];

const socialLinks = {
  student: [
    { name: "LinkedIn", icon: <FaLinkedin className="text-primary" /> },
    { name: "GitHub", icon: <FaGithub /> },
    { name: "Personal Website", icon: <FaGlobe className="text-primary" /> },
  ],
  sde: [
    { name: "GitHub", icon: <FaGithub /> },
    { name: "LinkedIn", icon: <FaLinkedin className="text-primary" /> },
    { name: "Personal Website", icon: <FaGlobe className="text-primary" /> },
    { name: "LeetCode", icon: <SiLeetcode className="text-yellow-500" /> },
  ],
  "sde-ii": [
    { name: "GitHub", icon: <FaGithub /> },
    { name: "LinkedIn", icon: <FaLinkedin className="text-primary" /> },
    { name: "Personal Website", icon: <FaGlobe className="text-primary" /> },
    { name: "LeetCode", icon: <SiLeetcode className="text-yellow-500" /> },
    { name: "Stack Overflow", icon: <FaStackOverflow className="text-orange-500" /> },
  ],
  sre: [
    { name: "GitHub", icon: <FaGithub /> },
    { name: "LinkedIn", icon: <FaLinkedin className="text-primary" /> },
    { name: "Personal Website", icon: <FaGlobe className="text-primary" /> },
    { name: "Stack Overflow", icon: <FaStackOverflow className="text-orange-500" /> },
  ],
  "ml-engineer": [
    { name: "GitHub", icon: <FaGithub /> },
    { name: "LinkedIn", icon: <FaLinkedin className="text-primary" /> },
    { name: "Kaggle", icon: <FaKaggle className="text-blue-400" /> },
    { name: "Google Scholar", icon: <SiGooglescholar className="text-blue-600" /> },
    { name: "Personal Website", icon: <FaGlobe className="text-primary" /> },
  ],
  designer: [
    { name: "Dribbble", icon: <FaDribbble className="text-pink-500" /> },
    { name: "Figma", icon: <FaFigma className="text-purple-500" /> },
    { name: "LinkedIn", icon: <FaLinkedin className="text-primary" /> },
    { name: "Behance", icon: <FaBehance className="text-blue-600" /> },
  ],
};

interface FormData {
  name: string;
  position: string;
  links: string[];
  skills: string[];
}

interface ProfessionalFormProps {
  onSubmit?: (data: FormData) => void;
}

const ProfessionalForm = ({ onSubmit }: ProfessionalFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    position: "",
    links: ["", "", ""],
    skills: [],
  });

  const [availableSkills, setAvailableSkills] = useState([
    "Problem Solving",
    "Communication",
    "Teamwork",
  ]);

  const [customSkill, setCustomSkill] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const { toast } = useSonner();

  // Load existing data if available
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('professionalProfile');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        setSelectedPosition(parsedData.position);
        handlePositionChange(parsedData.position, true);
      }
    } catch (error) {
      console.error("Error loading saved profile:", error);
    }
  }, []);

  const handlePositionChange = (position: string, isInitialLoad = false) => {
    setSelectedPosition(position);
    
    if (!isInitialLoad) {
      setFormData(prev => ({
        ...prev,
        position,
        links: Array(socialLinks[position]?.length || 0).fill(""), // Reset links when position changes
      }));
    } else {
      // Just update the position without resetting links (for initial load)
      setFormData(prev => ({
        ...prev,
        position,
      }));
    }

    // Update available skills based on position
    let positionSkills = ["Problem Solving", "Communication", "Teamwork"];
    
    switch (position) {
      case "sde":
      case "sde-ii":
        positionSkills = [...positionSkills, "JavaScript", "React", "Node.js", "SQL", "Compiler Design", "System Design"];
        break;
      case "sre":
        positionSkills = [...positionSkills, "AWS", "Docker", "Kubernetes", "CI/CD", "Monitoring", "Shell Scripting"];
        break;
      case "ml-engineer":
        positionSkills = [...positionSkills, "Python", "TensorFlow", "PyTorch", "Data Analysis", "Statistics", "Computer Vision", "NLP"];
        break;
      case "designer":
        positionSkills = [...positionSkills, "UI/UX", "Wireframing", "Prototyping", "User Research", "Visual Design", "Interaction Design"];
        break;
      case "student":
        positionSkills = [...positionSkills, "Learning", "Research", "Mobile Development", "Web Development", "Data Structures"];
        break;
    }
    
    setAvailableSkills(positionSkills);
    
    if (!isInitialLoad) {
      setFormData(prev => ({
        ...prev,
        skills: [], // Reset skills when position changes
      }));
    }
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...formData.links];
    newLinks[index] = value;
    setFormData(prev => ({
      ...prev,
      links: newLinks,
    }));
  };

  const toggleSkill = (skill: string) => {
    if (formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s !== skill),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const addCustomSkill = () => {
    if (customSkill && !availableSkills.includes(customSkill)) {
      setAvailableSkills(prev => [...prev, customSkill]);
      toggleSkill(customSkill);
      setCustomSkill("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    localStorage.setItem('professionalProfile', JSON.stringify(formData));
    
    // Dispatch a storage event to notify other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'professionalProfile',
      newValue: JSON.stringify(formData)
    }));
    
    // Call the onSubmit prop if provided
    router.push('/Dashboard');
    
    // Show success message
    toast({
      title: "Profile Updated",
      description: "Your professional profile has been saved successfully.",
      duration: 3000,
    });
    
    // Navigate to dashboard
    
  };

  const handleDelete = () => {
      // Remove from localStorage
      localStorage.removeItem('professionalProfile');

      // Dispatch storage event
      window.dispatchEvent(new StorageEvent('storage', {
          key: 'professionalProfile',
          newValue: null,
      }));

      // Reset state
      setFormData({
          name: "",
          position: "",
          links: ["", "", ""],
          skills: [],
      });
      setSelectedPosition("");
      setAvailableSkills(["Problem Solving", "Communication", "Teamwork"]);
      setCustomSkill("");

      // Show success message
      toast({
          title: "Profile Deleted",
          description: "Your professional profile has been deleted.",
          duration: 3000,
      });

      // Optionally, redirect to a different page
      router.push('/'); // Or wherever appropriate
  };


  return (
    <div className="flex justify-center items-center min-h-screen p-4 text-zinc-100">
      <Card className="w-full max-w-md shadow-lg bg-zinc-900 border border-zinc-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-white font-bold text-center">Professional Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 text-white">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Select value={selectedPosition} onValueChange={(value) => handlePositionChange(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent  className='bg-white'>
                  {positionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Social Links</Label>
              {socialLinks[formData.position]?.map((link, index) => (
                <div key={link.name} className="mb-2 flex items-center space-x-2">
                  {link.icon}
                  <Input
                    type="url"
                    placeholder={`Your ${link.name} URL`}
                    value={formData.links[index] || ""}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <div>
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {availableSkills.map(skill => (
                  <Badge
                    key={skill}
                    variant={formData.skills.includes(skill) ? "secondary" : "outline"}
                    onClick={() => toggleSkill(skill)}
                    className="cursor-pointer text-white"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Add Custom Skill"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                />
                <Button type="button" variant="secondary" size="sm" onClick={addCustomSkill}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>

            <Button  onClick={handleSubmit} className="w-full">Save Profile</Button>
             <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={handleDelete}
            >
                Delete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalForm;