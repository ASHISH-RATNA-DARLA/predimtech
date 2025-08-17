"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Add scroll event listener to detect when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Set up intersection observers to track which section is in view
  useEffect(() => {
    if (!isHomePage) return

    const observers = []
    const sections = ["home", "about", "services", "contact"]

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section)
            }
          })
        },
        {
          threshold: 0.3, // Lower threshold to be more sensitive
          rootMargin: "-100px 0px", // Adjust the detection area to account for header
        },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [isHomePage])

  // Scroll to top when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Update the scrollToSection function to properly handle navigation from other pages
  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      // If not on home page, navigate to home page with the section hash
      router.push(`/#${id}`)
      return
    }

    // If already on home page, scroll to the section
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
    setIsMenuOpen(false)
  }

  // Function to determine if a nav item is active
  const isActive = (section: string) => {
    if (isHomePage) {
      return activeSection === section
    } else {
      // For non-home pages, check if the current path matches
      if (section === "home") return pathname === "/"
      return pathname.includes(section)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="h-[40px] sm:h-[50px] flex items-center">
              <img
                src="/predim-logo-large.png"
                alt="PredimTech Logo"
                className="h-full w-auto object-contain"
                style={{ maxHeight: "100%" }}
              />
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`font-medium transition-colors ${
                isActive("home") ? "text-primary" : "text-secondary hover:text-primary"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`font-medium transition-colors ${
                isActive("about") ? "text-primary" : "text-secondary hover:text-primary"
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className={`font-medium transition-colors ${
                isActive("services") ? "text-primary" : "text-secondary hover:text-primary"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`font-medium transition-colors ${
                isActive("contact") ? "text-primary" : "text-secondary hover:text-primary"
              }`}
            >
              Contact Us
            </button>
            <Link
              href="/career"
              className={`font-medium transition-colors ${
                pathname?.includes("career") ? "text-primary" : "text-secondary hover:text-primary"
              }`}
            >
              Career
            </Link>
            <Link
              href="/blog"
              className={`font-medium transition-colors ${
                pathname?.includes("blog") ? "text-primary" : "text-secondary hover:text-primary"
              }`}
            >
              Blog
            </Link>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-2 bg-white rounded-lg shadow-md">
            <nav className="flex flex-col space-y-3 p-3">
              <button
                onClick={() => scrollToSection("home")}
                className={`font-medium text-left ${
                  isActive("home") ? "text-primary" : "text-secondary hover:text-primary"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={`font-medium text-left ${
                  isActive("about") ? "text-primary" : "text-secondary hover:text-primary"
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className={`font-medium text-left ${
                  isActive("services") ? "text-primary" : "text-secondary hover:text-primary"
                }`}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`font-medium text-left ${
                  isActive("contact") ? "text-primary" : "text-secondary hover:text-primary"
                }`}
              >
                Contact Us
              </button>
              <Link
                href="/career"
                className={`font-medium ${
                  pathname?.includes("career") ? "text-primary" : "text-secondary hover:text-primary"
                }`}
              >
                Career
              </Link>
              <Link
                href="/blog"
                className={`font-medium ${
                  pathname?.includes("blog") ? "text-primary" : "text-secondary hover:text-primary"
                }`}
              >
                Blog
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

