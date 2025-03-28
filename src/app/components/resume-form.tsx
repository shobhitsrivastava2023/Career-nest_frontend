"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import ChatInterface from "./chat-interface";
import { Upload, FileText } from 'lucide-react';
import { UploadButton } from "@uploadthing/react";

export default function ResumeForm() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFileUrl && jobDescription.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="space-y-8">
      {!isSubmitted ? (
        <Card className="p-6 bg-zinc-950 border-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resume" className="text-zinc-300">Upload Resume (PDF)</Label>
              <div className="border-2 border-dashed border-zinc-800 rounded-lg p-8 text-center">
                <UploadButton
                  endpoint="pdfUploader"
                  onClientUploadComplete={(res) => {
                    if (res?.[0]) {
                      setUploadedFileUrl(res[0].url);
                      setResumeFile(new File([], res[0].name));
                      console.log("Upload completed:", res[0].url);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    console.error("Upload error:", error);
                    alert(`Upload failed: ${error.message}`);
                  }}
                  config={{
                    mode: "auto",
                  }}
                  appearance={{
                    button: "bg-zinc-800 hover:bg-zinc-700 text-white",
                    allowedContent: "text-zinc-400 text-sm",
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription" className="text-zinc-300">Job Description</Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px] bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white"
              disabled={!uploadedFileUrl || !jobDescription.trim()}
            >
              Optimize Resume
            </Button>
          </form>
        </Card>
      ) : (
        <ChatInterface resumeFile={resumeFile} jobDescription={jobDescription} />
      )}
    </div>
  );
}
