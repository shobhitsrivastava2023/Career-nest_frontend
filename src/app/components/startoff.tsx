// components/DialogueSelector.jsx
"use client";

import { useState } from 'react';
import ProfessionalForm from './professionalform';
import { useRouter } from 'next/navigation';

interface UserData {
  name?: string;
  position?: string;
  skills?: string[];
}

interface ResearchFormProps {
  onSubmit: () => void;
}

const ResearchForm: React.FC<ResearchFormProps> = ({ onSubmit }) => (

  


  <div className="bg-zinc-800 text-zinc-100 p-8 rounded-lg max-w-md w-full mx-auto border border-zinc-700">
    <h2 className="text-xl font-bold mb-6 text-center">Research</h2>
    {/* Research form fields would go here */}
    <button
      onClick={onSubmit}
      className="w-full py-2 px-4 bg-zinc-100 text-zinc-900 rounded-full font-medium hover:bg-zinc-200 transition-colors"
    >
      Submit
    </button>
  </div>
);

const DialogueSelector: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<'professional' | 'research' | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router  = useRouter()

  const handleOptionSelect = (option: 'professional' | 'research') => {
    setSelectedOption(option);
  };

  const handleFormSubmit = (data: UserData) => {
    setUserData(data);
    setFormSubmitted(true);
    console.log("Form submitted with data:", data);
  };

  const handleResearchFormSubmit = () => { 
    console.log("you have been redirected to research signIn  page")
    router.push('/ResearchSignIn')
  

  }

  const resetForm = () => {
    setSelectedOption(null);
    setFormSubmitted(false);
    setUserData(null);
  };

  // Initial dialogue selection
  if (!selectedOption) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-zinc-900 text-zinc-100 p-8 rounded-lg max-w-md w-full ">
          <div className="space-y-4">
            <button
              onClick={() => handleOptionSelect('professional')}
              className="w-full p-3 bg-zinc-950 hover:bg-zinc-600 rounded text-center transition-colors"
            >
              Professionals
            </button>
            <button
              onClick={handleResearchFormSubmit}
              className="w-full p-3 bg-zinc-700 hover:bg-zinc-600 rounded text-center transition-colors"
            >
              Research
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Form submission success screen
  if (formSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        <div className="bg-zinc-800 text-zinc-100 p-8 rounded-lg max-w-md w-full border border-zinc-700">
          <h2 className="text-xl font-bold mb-6 text-center">Submission Successful!</h2>
          <div className="mb-6">
            <p className="text-green-400 mb-4">Thank you for your submission.</p>
            {userData && (
              <div className="bg-zinc-700 p-4 rounded">
                <h3 className="font-bold mb-2">Your Information:</h3>
                <p><span className="text-zinc-400">Name:</span> {userData.name}</p>
                <p><span className="text-zinc-400">Position:</span> {userData.position}</p>
                {userData.skills && userData.skills.length > 0 && (
                  <div className="mt-2">
                    <p className="text-zinc-400">Skills:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {userData.skills.map((skill) => (
                        <span key={skill} className="bg-blue-600 px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <button
            onClick={resetForm}
            className="w-full py-2 px-4 bg-zinc-100 text-zinc-900 rounded-full font-medium hover:bg-zinc-200 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  // Render the selected form
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {selectedOption === 'professional' ? (
        <ProfessionalForm onSubmit={handleFormSubmit} />
      ) : (
        <ResearchForm onSubmit={() => handleFormSubmit({})} />
      )}
    </div>
  );
};

export default DialogueSelector;