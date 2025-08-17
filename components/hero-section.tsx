"use client"
import { PLMCycle } from "./plm-cycle-final"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative w-full bg-gradient-to-b from-primary to-primary/90 flex items-center justify-center min-h-100vh pt-16 pb-16">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Siemens Teamcenter PLM Solutions
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">
              Delivering top-tier IT services centered around Siemens Teamcenter PLM software with expertise from
              ex-Siemens professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#services"
                className="px-6 py-3 bg-secondary text-white font-medium rounded-md hover:bg-secondary/90 transition-colors"
              >
                Explore Our Services
              </a>
              <a
                href="#contact"
                className="px-6 py-3 bg-transparent text-white font-medium rounded-md border border-white hover:bg-white/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"}`}
          >
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-full shadow-xl">
              <PLMCycle />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

