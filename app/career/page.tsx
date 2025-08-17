"use client"

import type React from "react"

import { useState, useRef } from "react"
import { submitCareerForm } from "@/actions/career-actions"

// Define job data structure
interface Job {
  id: string
  title: string
  location: string
  remoteOption: boolean
  requirements: string[]
  responsibilities: string[]
}

export default function CareerPage() {
  // Define available jobs
  const jobs: Job[] = [
    {
      id: "teamcenter-developer",
      title: "Teamcenter Developer",
      location: "Bangalore, India",
      remoteOption: true,
      requirements: [
        "3+ years of experience with Teamcenter development",
        "Strong knowledge of Java, C++, and SOA framework",
        "Experience with Teamcenter customization and extension",
        "Understanding of PLM concepts and workflows",
        "Excellent problem-solving and communication skills",
      ],
      responsibilities: [
        "Develop and customize Teamcenter applications",
        "Create and maintain technical documentation",
        "Collaborate with cross-functional teams",
        "Troubleshoot and resolve technical issues",
        "Participate in client meetings and requirement gathering",
      ],
    },
    {
      id: "active-workspace-developer",
      title: "Active Workspace Developer",
      location: "Stockholm, Sweden",
      remoteOption: true,
      requirements: [
        "2+ years of experience with Active Workspace development",
        "Strong knowledge of JavaScript, HTML5, CSS3, and React",
        "Experience with RESTful APIs and web services",
        "Understanding of Teamcenter architecture",
        "Excellent problem-solving and communication skills",
      ],
      responsibilities: [
        "Develop and customize Active Workspace applications",
        "Create responsive and user-friendly interfaces",
        "Collaborate with UX designers and backend developers",
        "Troubleshoot and resolve technical issues",
        "Participate in client meetings and requirement gathering",
      ],
    },
    {
      id: "teamcenter-admin",
      title: "Teamcenter Application Administration & Maintenance",
      location: "Bangalore, India",
      remoteOption: true,
      requirements: [
        "3+ years of experience with Teamcenter administration",
        "Strong knowledge of Teamcenter architecture and deployment",
        "Experience with database management and system monitoring",
        "Understanding of PLM concepts and workflows",
        "Excellent problem-solving and communication skills",
      ],
      responsibilities: [
        "Administer and maintain Teamcenter environments",
        "Perform system upgrades and patches",
        "Monitor system performance and troubleshoot issues",
        "Manage user access and security",
        "Provide technical support to end users",
      ],
    },
  ]

  // State to track which job is selected
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0].id)

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    position: "",
    experience: "",
    agreeToTerms: false,
  })

  // Form status state
  const [formStatus, setFormStatus] = useState({ message: "", success: false, visible: false })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // File upload state
  const [fileName, setFileName] = useState("No file chosen")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name)
    } else {
      setFileName("No file chosen")
    }
  }

  // Handle form submission
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      const result = await submitCareerForm(formData)

      setFormStatus({
        message: result.message,
        success: result.success,
        visible: true,
      })

      // Reset form if successful
      if (result.success) {
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          phone: "",
          position: "",
          experience: "",
          agreeToTerms: false,
        })
        setFileName("No file chosen")
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }

        // Hide message after 5 seconds
        setTimeout(() => {
          setFormStatus((prev) => ({ ...prev, visible: false }))
        }, 5000)
      }
    } catch (error) {
      setFormStatus({
        message: "An unexpected error occurred. Please try again later.",
        success: false,
        visible: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get the currently selected job
  const selectedJob = jobs.find((job) => job.id === selectedJobId) || jobs[0]

  return (
    <div className="pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4">Career Opportunities</h1>
          <div className="h-[2px] w-32 bg-secondary mx-auto"></div>
          <p className="mt-6 text-lg text-gray-700">
            Join our team of PLM experts and help shape the future of product lifecycle management.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          {/* Job list sidebar */}
          <div className="w-full md:w-1/3">
            <div className="space-y-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedJobId === job.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-white text-gray-800 border border-gray-200 hover:border-primary"
                  }`}
                  onClick={() => setSelectedJobId(job.id)}
                >
                  <h3 className={`font-bold ${selectedJobId === job.id ? "text-white" : "text-primary"}`}>
                    {job.title}
                  </h3>
                  <p className="text-sm mt-1">
                    {job.location} {job.remoteOption && "• Remote Option Available"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Job details */}
          <div className="w-full md:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-primary mb-2">{selectedJob.title}</h2>
              <p className="text-gray-600 mb-4">
                Full-time | {selectedJob.location} | {selectedJob.remoteOption ? "Remote Option Available" : "On-site"}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirements:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Responsibilities:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {selectedJob.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end">
                <a
                  href="#upload-cv"
                  className="px-6 py-2 bg-secondary text-white font-medium rounded-md hover:bg-secondary/90 transition-colors"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CV Upload Form */}
        <div id="upload-cv" className="max-w-2xl mx-auto mb-12 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary py-3 px-6">
            <h2 className="text-xl font-bold text-white">Upload Your CV</h2>
          </div>

          {formStatus.visible && (
            <div className={`p-4 ${formStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {formStatus.message}
            </div>
          )}

          <form action={handleSubmit} className="p-6 space-y-4">
            <div className="w-full">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full outline-none"
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="text"
                  name="position"
                  placeholder="Position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full outline-none"
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <input
                  type="text"
                  name="experience"
                  placeholder="Enter work experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <p className="font-medium text-gray-700 mb-2">Upload Your CV</p>
              <div className="flex items-center">
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-l-md border border-gray-300">
                  Choose File
                  <input
                    type="file"
                    name="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    aria-label="Upload your CV"
                    required
                  />
                </label>
                <span className="px-4 py-2 bg-gray-50 border border-gray-300 border-l-0 rounded-r-md flex-grow">
                  {fileName}
                </span>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="terms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree with terms and conditions
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50"
              disabled={isSubmitting || !formData.agreeToTerms}
            >
              {isSubmitting ? "Submitting..." : "Send"}
            </button>
          </form>

          <div className="px-6 pb-6 text-center">
            <p className="text-gray-700">
              You can also send your CV to{" "}
              <a href="mailto:careers@predimtech.com" className="text-primary hover:underline">
                careers@predimtech.com
              </a>
            </p>
          </div>
        </div>

        <div className="bg-primary/5 p-8 rounded-lg border border-primary/20">
          <h2 className="text-xl font-bold text-primary mb-4">Don't see a position that matches your skills?</h2>
          <p className="text-gray-700 mb-6">
            We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on
            file for future opportunities.
          </p>
          <div className="flex justify-center">
            <a
              href="#upload-cv"
              className="px-6 py-3 bg-secondary text-white font-medium rounded-md hover:bg-secondary/90 transition-colors"
            >
              Submit Your Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

