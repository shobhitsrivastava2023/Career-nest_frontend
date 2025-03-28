import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import JobCard from './JobCard';

interface Job {
  job_id: string;
  title: string;
  company: string;
  location: string;
  updated_at: string;
  description_tags?: string[];
  business_description_short?: string;
}

interface JobsState {
  python: Job[];
  java: Job[];
  'c++': Job[];
}

interface FormattedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  tags: string[];
  description: string;
}

const TaggedJobs: React.FC = () => {
  const [activeTag, setActiveTag] = useState<'python' | 'java' | 'c++'>("python");
  const [jobs, setJobs] = useState<JobsState>({
    python: [],
    java: [],
    'c++': []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const endpoints = {
          python: 'http://localhost:8000/api/python_jobs_fixed.json',
          java: 'http://localhost:8000/api/java_jobs_fixed.json',
          'c++': 'http://localhost:8000/api/cpp_jobs_fixed.json'
        };

        // Fetch all job data when component mounts
        const responses = await Promise.all(
          Object.values(endpoints).map(url => 
            fetch(url).then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
          )
        );

        // Extract the hits from each response
        setJobs({
          python: responses[0].results.hits || [],
          java: responses[1].results.hits || [],
          'c++': responses[2].results.hits || []
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err instanceof Error ? err.message : 'Failed to load job listings. Please try again later.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const formatJob = (job: Job): FormattedJob => ({
    id: job.job_id,
    title: job.title,
    company: job.company,
    location: job.location,
    postedDate: new Date(job.updated_at).toLocaleDateString(),
    tags: job.description_tags || [],
    description: job.business_description_short || ""
  });

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Job Listings Based On Skills</h1>
      
      <Tabs defaultValue="python" onValueChange={(value) => setActiveTag(value as 'python' | 'java' | 'c++')} className="mb-8">
        <TabsList className="bg-zinc-800 border border-zinc-700">
          <TabsTrigger value="python" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Python
          </TabsTrigger>
          <TabsTrigger value="java" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            Java
          </TabsTrigger>
          <TabsTrigger value="c++" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            C++
          </TabsTrigger>
        </TabsList>

        {loading ? (
          <div className="mt-8 text-center">
            <p className="text-zinc-300">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="mt-8 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            {Object.entries(jobs).map(([language, jobList]) => (
              <TabsContent key={language} value={language} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {jobList.map((job) => (
                    <JobCard key={job.job_id} job={formatJob(job)} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </>
        )}
      </Tabs>
    </div>
  );
};

export default TaggedJobs;