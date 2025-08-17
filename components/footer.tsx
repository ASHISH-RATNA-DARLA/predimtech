"use client"

import type React from "react"

import { Linkedin } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export function Footer() {
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"

  // Function to scroll to section with header offset
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      // Get the header height to offset the scroll position
      const headerHeight = document.querySelector("header")?.offsetHeight || 0

      // Calculate the element's position relative to the top of the page
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset

      // Scroll to the element position minus the header height
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth",
      })
    }
  }

  // Handle click on section links
  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault()

    if (isHomePage) {
      // If already on home page, just scroll to the section
      scrollToSection(sectionId)
    } else {
      // If on another page, navigate to home page with the section hash
      router.push(`/#${sectionId}`)
    }
  }

  // Handle hash in URL when navigating from another page
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const id = window.location.hash.substring(1) // Remove the # character

      // Use a small timeout to ensure the page has fully loaded
      setTimeout(() => {
        scrollToSection(id)
      }, 100)
    }
  }, [isHomePage])

  return (
    <footer className="footer-container bg-gray-100 py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div>
            <h3 className="text-lg font-bold text-primary mb-2">
              PRED<span className="text-secondary">i</span>M TECH
            </h3>
            <p className="text-gray-600 mb-2 text-sm">Innovative technology solutions for businesses of all sizes.</p>
            <a
              href="https://www.linkedin.com/company/predimtech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0A66C2] hover:text-[#0A66C2]/80 flex items-center text-sm"
            >
              <Linkedin size={16} className="mr-1" />
              <span>Follow us on LinkedIn</span>
            </a>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2">Services</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/services/teamcenter-implementation" className="text-gray-600 hover:text-secondary">
                  Teamcenter Implementation
                </Link>
              </li>
              <li>
                <Link href="/services/teamcenter-migration-upgrade" className="text-gray-600 hover:text-secondary">
                  Teamcenter Migration & Upgrade
                </Link>
              </li>
              <li>
                <Link href="/services/teamcenter-integration" className="text-gray-600 hover:text-secondary">
                  Teamcenter Integration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2">Company</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a
                  href="#about"
                  className="text-gray-600 hover:text-secondary"
                  onClick={(e) => handleSectionClick(e, "about")}
                >
                  About Us
                </a>
              </li>
              <li>
                <Link href="/team" className="text-gray-600 hover:text-secondary">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-gray-600 hover:text-secondary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-secondary">
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-secondary"
                  onClick={(e) => handleSectionClick(e, "contact")}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2">Contact</h4>
            <ul className="space-y-1 text-sm">
              <li className="text-gray-600">
                <strong>India:</strong> +91 12345 67890
              </li>
              <li className="text-gray-600">
                <strong>Sweden:</strong> +46 123 456 789
              </li>
              <li className="text-gray-600">
                <strong>Email:</strong> info@predimtech.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-4 pt-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} PredimTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

