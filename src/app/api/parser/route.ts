"use server"
import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert the file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Parse the PDF
    const data = await pdfParse(buffer);
    
    // Extract text content
    const text = data.text;
    
    // Here you could add more sophisticated parsing logic
    // to extract specific resume sections like education, experience, etc.
    
    // Simple extraction example
    const resumeData = {
      fullText: text,
      // Basic extraction - these are simplistic examples
      // In a real app, you'd want more sophisticated regex patterns
      name: extractName(text),
      email: extractEmail(text),
      phone: extractPhone(text),
      skills: extractSkills(text),
      education: extractEducation(text),
      experience: extractExperience(text),
    };
    
    return NextResponse.json({ success: true, resumeData });
  } catch (error) {
    console.error('Error parsing PDF:', error);
    return NextResponse.json({ error: 'Failed to parse PDF' }, { status: 500 });
  }
}

// Helper functions for extraction
function extractName(text: string): string {
  // Simple regex to get the first line which often contains the name
  // You might want to improve this with NLP or better patterns
  const firstLine = text.split('\n')[0].trim();
  return firstLine;
}

function extractEmail(text: string): string {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const match = text.match(emailRegex);
  return match ? match[0] : '';
}

function extractPhone(text: string): string {
  const phoneRegex = /(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/;
  const match = text.match(phoneRegex);
  return match ? match[0] : '';
}

function extractSkills(text: string): string[] {
  // This is a simple approach - you might want to use NLP or 
  // look for sections labeled "Skills" or "Technical Skills"
  const skillsSection = text.match(/Skills:?([\s\S]*?)(?:\n\n|\n[A-Z]|$)/i);
  if (!skillsSection) return [];
  
  // Extract words that might be skills
  const skillText = skillsSection[1];
  return skillText
    .split(/[,\n•]/)
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);
}

function extractEducation(text: string): string {
  const educationSection = text.match(/Education:?([\s\S]*?)(?:\n\n|\n[A-Z]|$)/i);
  return educationSection ? educationSection[1].trim() : '';
}

function extractExperience(text: string): string {
  const experienceSection = text.match(/Experience:?([\s\S]*?)(?:\n\n|\n[A-Z]|$)/i);
  return experienceSection ? experienceSection[1].trim() : '';
}