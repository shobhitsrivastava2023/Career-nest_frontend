'use client'

import React, { useState, useEffect } from 'react'
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge"
import { Menu } from "lucide-react"
import { 
  FaGithub, 
  FaLinkedin, 
  FaGlobe, 
  FaStackOverflow, 
  FaKaggle, 
  FaDribbble, 
  FaFigma, 
  FaBehance 
} from 'react-icons/fa'
import { SiLeetcode, SiGooglescholar } from 'react-icons/si'

// Helper function to get icon component by name
const getIconComponent = (name) => {
  switch (name) {
    case "GitHub": return <FaGithub className="h-5 w-5" />;
    case "LinkedIn": return <FaLinkedin className="h-5 w-5 text-blue-500" />;
    case "Personal Website": return <FaGlobe className="h-5 w-5 text-green-500" />;
    case "LeetCode": return <SiLeetcode className="h-5 w-5 text-yellow-500" />;
    case "Stack Overflow": return <FaStackOverflow className="h-5 w-5 text-orange-500" />;
    case "Kaggle": return <FaKaggle className="h-5 w-5 text-blue-400" />;
    case "Google Scholar": return <SiGooglescholar className="h-5 w-5 text-blue-600" />;
    case "Dribbble": return <FaDribbble className="h-5 w-5 text-pink-500" />;
    case "Figma": return <FaFigma className="h-5 w-5 text-purple-500" />;
    case "Behance": return <FaBehance className="h-5 w-5 text-blue-600" />;
    default: return <FaGlobe className="h-5 w-5" />;
  }
}

// Map position values to readable titles
const positionTitles = {
  "student": "Student",
  "sde": "Software Development Engineer (SDE)",
  "sre": "Site Reliability Engineer (SRE)",
  "sde-ii": "Software Development Engineer II (SDE-II)",
  "ml-engineer": "Machine Learning Engineer",
  "designer": "Designer"
}

// Social link names to match with the form data
const socialLinkNames = {
  "student": ["LinkedIn", "GitHub", "Personal Website"],
  "sde": ["GitHub", "LinkedIn", "Personal Website", "LeetCode"],
  "sde-ii": ["GitHub", "LinkedIn", "Personal Website", "LeetCode", "Stack Overflow"],
  "sre": ["GitHub", "LinkedIn", "Personal Website", "Stack Overflow"],
  "ml-engineer": ["GitHub", "LinkedIn", "Kaggle", "Google Scholar", "Personal Website"],
  "designer": ["Dribbble", "Figma", "LinkedIn", "Behance"]
}

const DashboardHamburgerMenu = () => {
  const [userData, setUserData] = useState(null);
  
  // Simulate fetching user data
  useEffect(() => {
    // In a real app, you'd fetch this from an API or state management
    // For now, we'll use local storage to persist form data
    const savedData = localStorage.getItem('professionalProfile');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-zinc-950 text-white border-zinc-800">
        <SheetHeader>
          <SheetTitle className="text-white">User Profile</SheetTitle>
        </SheetHeader>
        
        {userData ? (
          <div className="mt-6 space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 bg-zinc-800">
                <AvatarImage src="" alt={userData.name} />
                <AvatarFallback className="bg-zinc-700 text-white">
                  {getInitials(userData.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-sm text-zinc-400">{positionTitles[userData.position] || userData.position}</p>
              </div>
            </div>
            
            {/* Skills section */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-zinc-400">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="bg-zinc-800 text-zinc-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Social links section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-400">Social Links</h3>
              {userData.links.map((link, index) => {
                if (!link) return null;
                const linkName = socialLinkNames[userData.position]?.[index] || "Link";
                return (
                  <a 
                    key={index} 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-zinc-800 transition-colors"
                  >
                    <span className="text-zinc-400">
                      {getIconComponent(linkName)}
                    </span>
                    <span className="text-zinc-300 text-sm truncate">{link}</span>
                  </a>
                );
              })}
            </div>
            
            {/* Account options */}
            <div className="pt-4 border-t border-zinc-800">
              <Button variant="outline" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800 border-zinc-700">
                Edit Profile
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-zinc-400 mb-4">No profile data available</p>
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Create Profile
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default DashboardHamburgerMenu