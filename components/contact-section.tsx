"use client"

import ScrollFloat from "./scroll-float"
import Link from "next/link"
import { submitContactForm } from "@/actions/contact-actions"
import { useState } from "react"

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState({ message: "", success: false, visible: false })
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      const result = await submitContactForm(formData)
      setFormStatus({
        message: result.message,
        success: result.success,
        visible: true,
      })

      // Reset form if successful
      if (result.success) {
        const form = document.getElementById("contactForm") as HTMLFormElement
        form.reset()

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

  return (
    <div className="pt-16 pb-16 bg-white flex flex-col justify-center">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-full mx-auto">
          <div className="text-center mb-8">
            <ScrollFloat containerClassName="mb-3" textClassName="font-bold text-primary" scrollStart="top bottom">
              Contact Us
            </ScrollFloat>
            <div className="h-[2px] w-24 bg-secondary mx-auto"></div>
          </div>

          {/* Contact form section */}

          <div className="bg-white p-5 rounded-lg shadow-md">
            <ScrollFloat
              containerClassName="mb-4"
              textClassName="font-bold text-primary text-xl"
              scrollStart="top bottom+=30%"
            >
              Send Us a Message
            </ScrollFloat>
            <form id="contactForm" action={handleSubmit} className="space-y-4">
              {formStatus.visible && (
                <div
                  className={`p-3 rounded-md ${formStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {formStatus.message}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-secondary text-white font-medium rounded-md hover:bg-secondary/90 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Send Message"}
                </button>
                <div className="text-center mt-4">
                  <Link href="/find-us" className="text-primary hover:text-secondary inline-flex items-center">
                    <span>Find Us</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 0111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

