'use client'

import { Card, CardContent } from '@/components/ui/card'
import React, { useState, useEffect, useRef } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import General_job_Posting from '../components/general_job_Posting'
import TaggedJobs from '../components/TaggedJobs'
import TrendingCompaniesByLocation from '../components/TrendingCompaniesByLocation'
import Tech_unicorn_valuation from '../components/Tech_unicorn_valuation'
import DashboardHamburgerMenu from '../components/DashboardHamburger'
import { Skeleton } from '@/components/ui/skeleton'
import { Demo } from '../components/footer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const router = useRouter()
  // --- Existing state, data, refs ---
  const companies = [
    { name: "Meta", jobs: 287, logo: "M" }, { name: "Apple", jobs: 342, logo: "A" },
    { name: "Amazon", jobs: 516, logo: "A" }, { name: "Netflix", jobs: 124, logo: "N" },
    { name: "Google", jobs: 478, logo: "G" }, { name: "Microsoft", jobs: 389, logo: "M" },
    { name: "Tesla", jobs: 213, logo: "T" }, { name: "Adobe", jobs: 167, logo: "A" },
  ];

  const generateJobData = (companyName) => {
    // ... (generateJobData function remains the same)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [];
    for (let year = 2023; year <= 2024; year++) {
      months.forEach((month, index) => {
        let baseValue;
        switch(companyName) {
          case 'Meta': baseValue = 230; break; case 'Apple': baseValue = 280; break;
          case 'Amazon': baseValue = 450; break; case 'Netflix': baseValue = 100; break;
          case 'Google': baseValue = 400; break; case 'Microsoft': baseValue = 320; break;
          case 'Tesla': baseValue = 180; break; case 'Adobe': baseValue = 140; break;
          default: baseValue = 200;
        }
        const trend = Math.sin((index + (year - 2023) * 12) / 4) * 50;
        const random = Math.random() * 50 - 25;
        const value = Math.max(20, Math.round(baseValue + trend + random));
        data.push({ date: `${month} ${year}`, jobs: value });
      });
    }
    return data;
  };

  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [jobData, setJobData] = useState(generateJobData(companies[0].name));
  const [loading, setLoading] = useState(true);
  const [, setForceUpdate] = useState(0);

  const mainContainerRef = useRef(null);
  const enhanceCardRef = useRef(null);
  const generalJobsRef = useRef(null);
  const taggedJobsRef = useRef(null);
  const trendingLocationRef = useRef(null); // Ref for TrendingCompaniesByLocation
  const unicornRef = useRef(null);         // Ref for Tech_unicorn_valuation
  const footerRef = useRef(null);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setJobData(generateJobData(company.name));
  };

  const handleResumeRedirection = () => { 
    router.push('/ResumeEnhance')
  }

  useEffect(() => {
    // ... (storage listener effect remains the same)
    const handleStorageChange = (e) => { if (e.key === 'professionalProfile') { setForceUpdate(prev => prev + 1); } };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    // ... (loading simulation effect remains the same)
    const timer = setTimeout(() => { setLoading(false); }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // --- GSAP Animation Effect (MODIFIED) ---
  useEffect(() => {
    if (loading || !mainContainerRef.current) return;

    const ctx = gsap.context(() => {
      const elementsToAnimate = [
        enhanceCardRef.current,
        generalJobsRef.current,
        taggedJobsRef.current,
        trendingLocationRef.current, // Include ref
        unicornRef.current,         // Include ref
        footerRef.current
      ].filter(Boolean);

      elementsToAnimate.forEach((el) => {
        // Determine duration based on the element
        let animationDuration = 0.8; // Default duration
        if (el === trendingLocationRef.current || el === unicornRef.current) {
          animationDuration = 1.5; // Slower duration for specific components
        }

        gsap.from(el, {
          y: 100,
          opacity: 0,
          duration: animationDuration, // Use the determined duration
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
            // markers: true, // Keep commented unless debugging
          }
        });
      });

    }, mainContainerRef);

    return () => ctx.revert();

  }, [loading]); // Dependency array remains the same


  // --- Loading State ---
  if (loading) {
     // --- Skeleton remains the same ---
    return (
      <div className='bg-black text-white min-h-screen'>
        {/* ... Skeleton structure ... */}
         <div className='p-8 mb-8 flex justify-between items-center'><Skeleton className="h-12 w-48 bg-zinc-800" /><Skeleton className="h-10 w-10 bg-zinc-800" /></div>
        <div className='grid grid-flow-row grid-cols-3 gap-4 p-4'><Skeleton className="col-span-1 h-96 bg-zinc-800" /><Skeleton className="col-span-2 h-96 bg-zinc-800" /></div>
        <div className='p-4'><Skeleton className="h-48 w-full bg-zinc-800" /></div>
        <div className='p-4'><Skeleton className="h-[600px] w-full bg-zinc-800" /></div>
        <div className='p-4'><Skeleton className="h-[400px] w-full bg-zinc-800" /></div>
         <div className='p-4'><Skeleton className="h-[500px] w-full bg-zinc-800" /></div>
        <div className='p-4'><Skeleton className="h-[400px] w-full bg-zinc-800" /></div>
         <div className='p-4'><Skeleton className="h-24 w-full bg-zinc-800" /></div>
      </div>
    )
  }

  // --- Component Return (when not loading) ---
  return (
    <div className='bg-black text-white overflow-x-hidden' ref={mainContainerRef}>
      {/* Header */}
      <div className='p-8 mb-8 flex justify-between items-center'>
        <h1 className='text-4xl font-bold'>Dashboard</h1>
        <DashboardHamburgerMenu />
      </div>

      {/* Top Row */}
      <div className='grid grid-flow-row grid-cols-3 gap-4 p-4'>
        {/* Trending Card */}
        <Card className='col-span-1 bg-zinc-950 border-black h-96 text-white'>
            {/* ... Card content ... */}
             <CardContent className="p-6"><div><h1 className='font-bold text-white text-xl mb-4'>Trending Hiring Companies</h1><div className="h-72 overflow-y-auto pr-2"><table className="w-full"><thead className="sticky top-0 bg-zinc-950"><tr className="border-b border-zinc-800"><th className="text-left py-2 px-2">Logo</th><th className="text-left py-2 px-2">Company</th><th className="text-right py-2 px-2">Jobs</th></tr></thead><tbody>{companies.map((company, index) => (<tr key={index} className={`border-b border-zinc-800 cursor-pointer hover:bg-zinc-900 ${selectedCompany.name === company.name ? 'bg-zinc-800' : ''}`} onClick={() => handleCompanySelect(company)}><td className="py-3 px-2"><div className="bg-zinc-800 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold">{company.logo}</div></td><td className="py-3 px-2">{company.name}</td><td className="text-right py-3 px-2">{company.jobs}</td></tr>))}</tbody></table></div></div></CardContent>
        </Card>
        {/* Chart Card */}
        <Card className='col-span-2 bg-zinc-950 border-black h-96 text-white'>
            {/* ... Card content ... */}
            <CardContent className="p-6 h-full flex flex-col"><div><h1 className='font-bold text-white text-xl mb-4'>{selectedCompany.name} Job Postings (2023-2024)</h1></div><div className="flex-grow w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={jobData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" stroke="#444" /><XAxis dataKey="date" stroke="#999" tick={{ fill: '#999', fontSize: 12 }} tickFormatter={(value) => value.split(' ')[0]} interval="preserveStartEnd" /><YAxis stroke="#999" tick={{ fill: '#999', fontSize: 12 }} width={40} /><Tooltip contentStyle={{ backgroundColor: '#222', borderColor: '#555', borderRadius: '4px' }} itemStyle={{ color: '#eee' }} labelStyle={{ color: '#fff', fontWeight: 'bold' }}/><Line type="monotone" dataKey="jobs" name="Job Postings" stroke="#8884d8" strokeWidth={2} dot={false} activeDot={{ r: 6, strokeWidth: 1, fill: '#8884d8' }} /></LineChart></ResponsiveContainer></div></CardContent>
        </Card>
      </div>

      {/* Enhance Resume Score Card */}
      <div className='p-4' ref={enhanceCardRef}>
        <Card className='col-span-1 bg-zinc-950 border-black h-48 text-white'>
          {/* Add h-full to CardContent to make inner div's h-full work */}
          <CardContent className="p-6 h-full">
            {/* Flex container setup */}
            <div className='flex flex-col justify-between h-full text-white'>
              {/* Text remains at the top */}
              <div className='text-2xl font-bold'>
                Enhance Your Resume Score
              </div>
              {/* Button is pushed to bottom by justify-between
                  and aligned to the right by self-end */}
              <Button className="self-end" onClick={handleResumeRedirection}>
                Improve Your Resume ->
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Other Components */}
      <div ref={generalJobsRef}> <General_job_Posting /> </div>
      <div ref={taggedJobsRef}> <TaggedJobs /> </div>

      {/* Apply ref here */}
      <div ref={trendingLocationRef}>
        <TrendingCompaniesByLocation />
      </div>

      {/* Apply ref here */}
      <div className='p-4' ref={unicornRef}>
         <Tech_unicorn_valuation />
      </div>

      {/* Footer */}
      <div ref={footerRef}> <Demo /> </div>

    </div>
  )
}

export default Page