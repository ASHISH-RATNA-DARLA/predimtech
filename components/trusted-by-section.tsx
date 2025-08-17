"use client"

import { useEffect, useRef } from "react"
import ScrollFloat from "./scroll-float"

export function TrustedBySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    // Set initial scroll position
    let scrollPosition = 0
    const scrollSpeed = 1 // pixels per frame
    const imageWidth = 800 // Width of the TRUSTED.png image

    const scroll = () => {
      scrollPosition += scrollSpeed

      // Reset position when we've scrolled through one full image
      if (scrollPosition >= imageWidth) {
        scrollPosition = 0
      }

      if (scrollContainer) {
        scrollContainer.style.transform = `translateX(-${scrollPosition}px)`
      }

      requestAnimationFrame(scroll)
    }

    const animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <ScrollFloat containerClassName="mb-4" textClassName="font-bold text-primary" scrollStart="top bottom">
            TRUSTED BY
          </ScrollFloat>
          <div className="h-[2px] w-32 bg-secondary mx-auto"></div>
        </div>

        <div className="relative overflow-hidden w-full">
          {/* Create a container that's twice the width of the image to allow for seamless scrolling */}
          <div className="relative w-full overflow-hidden">
            <div
              className="inline-flex whitespace-nowrap"
              style={{ width: "200%" }} // Make container twice as wide as needed
            >
              <div
                ref={scrollContainerRef}
                className="inline-flex"
                style={{ width: "200%" }} // Make inner container twice as wide
              >
                {/* Duplicate the image to create seamless scrolling */}
                <img
                  src="/trusted/TRUSTED.png"
                  alt="Trusted by Microsoft, Adobe, Accenture, Providence"
                  className="h-[100px] w-[800px] object-contain"
                />
                <img
                  src="/trusted/TRUSTED.png"
                  alt="Trusted by Microsoft, Adobe, Accenture, Providence"
                  className="h-[100px] w-[800px] object-contain"
                />
                <img
                  src="/trusted/TRUSTED.png"
                  alt="Trusted by Microsoft, Adobe, Accenture, Providence"
                  className="h-[100px] w-[800px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

