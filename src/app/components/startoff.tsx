/**
 * Career Nest Homepage
 * A professional profile management platform
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
          <NestIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Career Nest</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32 flex items-center justify-center border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl">
                Your Professional Profile, Simplified
              </h1>
              <p className="mt-6 text-lg text-gray-500 max-w-2xl md:text-xl dark:text-gray-400">
                Career Nest helps you create, manage, and share your professional profile. 
                Build your portfolio in minutes and apply for jobs with ease.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link
                  href="/professional"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  prefetch={false}
                >
                  Professional
                </Link>
                <Link
                  href="/academia"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-primary bg-transparent px-8 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  prefetch={false}
                >
                  Academia
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Why Career Nest?
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Build. Share. Apply.</h2>
                <p className="mt-4 max-w-[800px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Career Nest streamlines your job search by creating professional summaries that highlight your
                  skills and experience. One profile, countless opportunities.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-stretch gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-16">
              <div className="grid gap-1 p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800 h-full">
                <h3 className="text-xl font-bold">Smart Profile Builder</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Create tailored professional profiles with our intuitive builder. Add your skills, experience, and links to your portfolio.
                </p>
              </div>
              <div className="grid gap-1 p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800 h-full">
                <h3 className="text-xl font-bold">One-Click Applications</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Apply to multiple job postings with a single click. Your profile is automatically formatted for each application.
                </p>
              </div>
              <div className="grid gap-1 p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800 h-full">
                <h3 className="text-xl font-bold">Profile Analytics</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Track who's viewing your profile and which skills are getting the most attention from recruiters.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2025 Career Nest. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function NestIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
      <path d="m8 8 8 8" />
      <path d="m16 8-8 8" />
    </svg>
  );
}