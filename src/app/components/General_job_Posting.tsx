'use client'

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Skeleton } from './skeleton';
interface Job {
  job_id: string;
  company: string;
  company_id: string;
  title: string;
  location: string;
  url: string;
  salary_range_min: number | null;
  salary_range_max: number | null;
  company_url_clean: string;
  business_description_short: string;
  description_tags: string[];
  updated_at: string;
}

interface ApiResponse {
  jobs: Job[];
}

const General_job_Posting: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/general_jobs_fixed.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        setJobs(data.jobs); // Updated to match new JSON structure
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch job listings:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch job listings');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === jobs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? jobs.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto py-12 px-4">
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">No job listings available.</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Featured Job Opportunities</h2>
      
      <div className="relative">
        {/* Navigation buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-black rounded-full p-2 shadow-md hover:bg-gray-50"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 20}%)` }}
          >
            {jobs.map((job, index) => (
              <div key={job.job_id} className="w-1/4 flex-shrink-0 px-2">
                <div className="bg-zinc-900 rounded-lg shadow-md p-6 h-64 border border-black hover:shadow-lg transition-shadow duration-200">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <p className="text-lg font-bold text-white mb-1 line-clamp-2">{job.title}</p>
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-red-500 rounded-full mr-2 flex items-center justify-center">
                          {job.company.charAt(0)}
                        </div>
                        <p className="text-md text-white">{job.company}</p>
                      </div>
                      <p className="text-sm text-white mb-2 line-clamp-1">{job.location}</p>
                      {job.description_tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {job.description_tags.map((tag, i) => (
                            <span key={i} className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <a 
                        href={job.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Job
                        <ExternalLink size={16} className="ml-1" />
                      </a>
                      <span className="text-xs text-gray-400">
                        {new Date(job.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-black rounded-full p-2 shadow-md hover:bg-gray-50"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Indicator dots */}
      <div className="flex justify-center mt-6">
        {jobs.slice(0, Math.min(5, jobs.length)).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 mx-1 rounded-full ${
              currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default General_job_Posting;