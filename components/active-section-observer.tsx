"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export type ActiveSection = "home" | "about" | "services" | "contact" | null

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home")
  const pathname = usePathname()
  const [isHomePage, setIsHomePage] = useState(pathname === "/")

  useEffect(() => {
    setIsHomePage(pathname === "/")
  }, [pathname])

  useEffect(() => {
    if (!isHomePage) {
      return
    }

    const observers: IntersectionObserver[] = []
    const sections = ["home", "about", "services", "contact"]

    // Create an intersection observer for each section
    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section as ActiveSection)
            }
          })
        },
        { threshold: 0.5 }, // Trigger when 50% of the section is visible
      )

      observer.observe(element)
      observers.push(observer)
    })

    // Cleanup
    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [isHomePage])

  return isHomePage ? activeSection : null
}

