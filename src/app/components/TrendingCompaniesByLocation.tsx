'use client'
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface Company {
  company_id: string;
  company: string;
  trajectory_score: number;
  url_clean: string;
}

interface Location {
  id: string;
  name: string;
  company_grid_top5: Company[];
}

function TrendingCompaniesByLocation() {
  const [locations, setLocations] = useState<Location[]>([]);
  const apiUrl = 'http://localhost:8000/api/locations.json';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        setLocations(jsonData.pageProps.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='p-8 ml-4'>
      <div className='text-white text-2xl font-bold'>
        Trending Companies By Location
      </div>

      <div className='grid grid-flow-row grid-cols-3 gap-4 p-4'>
        {locations.map((location) => (
          <div key={location.id}>
            <Accordion type="single" collapsible className="w-full max-w-[400px]">
              <AccordionItem value={location.id}>
                <AccordionTrigger>{location.name}</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    {location.company_grid_top5.map((company) => (
                      <li key={company.company_id} className="py-2">
                        <div className="font-semibold">{company.company}</div>
                        <div>Score: {company.trajectory_score}</div>
                        <div>URL: <a href={`https://${company.url_clean}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{company.url_clean}</a></div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendingCompaniesByLocation