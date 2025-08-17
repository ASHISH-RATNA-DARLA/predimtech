"use client"

import { useEffect, useState } from "react"
import { getContacts, clearDatabase } from "@/actions/contact-actions"
import { getCareers, clearCareersDatabase, deleteCareer } from "@/actions/career-actions"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/protected-route"

interface Contact {
  _id: string
  firstName: string
  lastName: string
  email: string
  company?: string
  message: string
  createdAt: string
}

interface Career {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  experience: string
  fileId: string
  fileName: string
  fileSize: number
  createdAt: string
}

export default function Dashboard() {
  // State for contacts tab
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoadingContacts, setIsLoadingContacts] = useState(true)
  const [contactsError, setContactsError] = useState("")
  const [clearContactsStatus, setClearContactsStatus] = useState({ message: "", visible: false })
  const [isClearingContacts, setIsClearingContacts] = useState(false)

  // State for careers tab
  const [careers, setCareers] = useState<Career[]>([])
  const [isLoadingCareers, setIsLoadingCareers] = useState(true)
  const [careersError, setCareersError] = useState("")
  const [clearCareersStatus, setClearCareersStatus] = useState({ message: "", visible: false })
  const [isClearingCareers, setIsClearingCareers] = useState(false)

  // Tab state
  const [activeTab, setActiveTab] = useState("contacts")

  const { logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (activeTab === "contacts") {
      fetchContacts()
    } else if (activeTab === "careers") {
      fetchCareers()
    }
  }, [activeTab])

  async function fetchContacts() {
    setIsLoadingContacts(true)
    try {
      const result = await getContacts()
      if (result.success) {
        setContacts(result.data)
      } else {
        setContactsError(result.message || "Failed to fetch contacts")
      }
    } catch (err) {
      setContactsError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoadingContacts(false)
    }
  }

  async function fetchCareers() {
    setIsLoadingCareers(true)
    try {
      const result = await getCareers()
      if (result.success) {
        setCareers(result.data)
      } else {
        setCareersError(result.message || "Failed to fetch careers")
      }
    } catch (err) {
      setCareersError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoadingCareers(false)
    }
  }

  function handleLogout() {
    logout()
    router.push("/login")
  }

  async function handleClearContactsDatabase() {
    if (!confirm("Are you sure you want to clear all contact submissions? This action cannot be undone.")) {
      return
    }

    setIsClearingContacts(true)
    try {
      const result = await clearDatabase()

      setClearContactsStatus({
        message: result.success ? "Contacts database cleared successfully" : "Failed to clear contacts database",
        visible: true,
      })

      if (result.success) {
        setContacts([])
        // Hide message after 3 seconds
        setTimeout(() => {
          setClearContactsStatus((prev) => ({ ...prev, visible: false }))
        }, 3000)
      }
    } catch (error) {
      setClearContactsStatus({
        message: "An error occurred while clearing the contacts database",
        visible: true,
      })
    } finally {
      setIsClearingContacts(false)
    }
  }

  async function handleClearCareersDatabase() {
    if (!confirm("Are you sure you want to clear all CV submissions? This action cannot be undone.")) {
      return
    }

    setIsClearingCareers(true)
    try {
      const result = await clearCareersDatabase()

      setClearCareersStatus({
        message: result.success ? "Careers database cleared successfully" : "Failed to clear careers database",
        visible: true,
      })

      if (result.success) {
        setCareers([])
        // Hide message after 3 seconds
        setTimeout(() => {
          setClearCareersStatus((prev) => ({ ...prev, visible: false }))
        }, 3000)
      }
    } catch (error) {
      setClearCareersStatus({
        message: "An error occurred while clearing the careers database",
        visible: true,
      })
    } finally {
      setIsClearingCareers(false)
    }
  }

  async function handleDeleteCareer(careerId: string, fileId: string) {
    if (!confirm("Are you sure you want to delete this CV submission? This action cannot be undone.")) {
      return
    }

    try {
      const result = await deleteCareer(careerId, fileId)

      if (result.success) {
        // Remove the deleted career from the state
        setCareers(careers.filter((career) => career._id !== careerId))
      } else {
        alert(result.message || "Failed to delete CV submission")
      }
    } catch (error) {
      alert("An error occurred while deleting the CV submission")
      console.error(error)
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <img className="h-8 w-auto" src="/predim-logo-large.png" alt="PredimTech Logo" />
                </div>
                <div className="ml-6 flex items-center">
                  <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-4 md:mb-0">Admin Dashboard</h1>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab("contacts")}
                    className={`px-4 py-2 rounded-md ${
                      activeTab === "contacts" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Contact Submissions
                  </button>
                  <button
                    onClick={() => setActiveTab("careers")}
                    className={`px-4 py-2 rounded-md ${
                      activeTab === "careers" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    CV Submissions
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              {/* Contacts Tab */}
              {activeTab === "contacts" && (
                <div className="px-4 py-8 sm:px-0">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Contact Form Submissions</h2>
                    <button
                      onClick={handleClearContactsDatabase}
                      disabled={isClearingContacts || contacts.length === 0}
                      className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isClearingContacts ? "Clearing..." : "Clear Contacts Database"}
                    </button>
                  </div>

                  {clearContactsStatus.visible && (
                    <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700">{clearContactsStatus.message}</div>
                  )}

                  {isLoadingContacts ? (
                    <div className="flex justify-center">
                      <div className="w-12 h-12 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
                    </div>
                  ) : contactsError ? (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                      role="alert"
                    >
                      <span className="block sm:inline">{contactsError}</span>
                    </div>
                  ) : contacts.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-500">No contact form submissions yet.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Company
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Message
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {contacts.map((contact) => (
                            <tr key={contact._id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {contact.firstName} {contact.lastName}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{contact.email}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{contact.company || "-"}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-500 max-w-xs truncate">{contact.message}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {new Date(contact.createdAt).toLocaleDateString()}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Careers Tab */}
              {activeTab === "careers" && (
                <div className="px-4 py-8 sm:px-0">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">CV Submissions</h2>
                    <button
                      onClick={handleClearCareersDatabase}
                      disabled={isClearingCareers || careers.length === 0}
                      className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isClearingCareers ? "Clearing..." : "Clear CV Database"}
                    </button>
                  </div>

                  {clearCareersStatus.visible && (
                    <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700">{clearCareersStatus.message}</div>
                  )}

                  {isLoadingCareers ? (
                    <div className="flex justify-center">
                      <div className="w-12 h-12 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
                    </div>
                  ) : careersError ? (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                      role="alert"
                    >
                      <span className="block sm:inline">{careersError}</span>
                    </div>
                  ) : careers.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-500">No CV submissions yet.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Phone
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Position
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Experience
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              CV
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {careers.map((career) => (
                            <tr key={career._id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {career.firstName} {career.lastName}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{career.email}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{career.phone}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{career.position}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-500">{career.experience}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <a
                                  href={`/api/careers/download/${career.fileId}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:text-primary/80 text-sm font-medium"
                                >
                                  {career.fileName} ({formatFileSize(career.fileSize)})
                                </a>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {new Date(career.createdAt).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={() => handleDeleteCareer(career._id, career.fileId)}
                                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

