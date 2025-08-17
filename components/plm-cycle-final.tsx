"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export function PLMCycle() {
  const segmentsRef = useRef<SVGGElement>(null)
  const [logoSize, setLogoSize] = useState({ width: "120px", height: "70px" })

  useEffect(() => {
    // Handle window resize for logo size
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setLogoSize({ width: "90px", height: "50px" })
      } else {
        setLogoSize({ width: "120px", height: "70px" })
      }
    }

    // Set initial size
    handleResize()

    // Add resize listener
    window.addEventListener("resize", handleResize)

    // Animation for segments
    if (segmentsRef.current) {
      gsap.to(segmentsRef.current, {
        rotation: 360,
        transformOrigin: "center center",
        repeat: -1,
        duration: 30,
        ease: "linear",
      })
    }

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Define the segments with their angles and labels
  // Using PredimTech color palette - all segments are now orange
  const segments = [
    { startAngle: 0, endAngle: 72, label: "CONCEPT", color: "#FF9933" },
    { startAngle: 72, endAngle: 144, label: "DESIGN", color: "#FF9933" },
    { startAngle: 144, endAngle: 216, label: "TEST", color: "#FF9933" },
    { startAngle: 216, endAngle: 288, label: "RELEASE", color: "#FF9933" },
    { startAngle: 288, endAngle: 360, label: "SUSTAIN", color: "#FF9933" },
  ]

  return (
    <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-md mx-auto relative">
      <div className="relative">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          {/* Outer circle with segments - this will rotate */}
          <g ref={segmentsRef}>
            {segments.map((segment, index) => {
              // Calculate the midpoint angle for text placement
              const midAngle = (segment.startAngle + segment.endAngle) / 2
              const textRadius = 97.5
              const textX = 200 + textRadius * Math.cos(((midAngle - 90) * Math.PI) / 180)
              const textY = 200 + textRadius * Math.sin(((midAngle - 90) * Math.PI) / 180)

              // Create the arc path
              const startX = 200 + 75 * Math.cos(((segment.startAngle - 90) * Math.PI) / 180)
              const startY = 200 + 75 * Math.sin(((segment.startAngle - 90) * Math.PI) / 180)
              const endX = 200 + 75 * Math.cos(((segment.endAngle - 90) * Math.PI) / 180)
              const endY = 200 + 75 * Math.sin(((segment.endAngle - 90) * Math.PI) / 180)
              const outerStartX = 200 + 120 * Math.cos(((segment.startAngle - 90) * Math.PI) / 180)
              const outerStartY = 200 + 120 * Math.sin(((segment.startAngle - 90) * Math.PI) / 180)
              const outerEndX = 200 + 120 * Math.cos(((segment.endAngle - 90) * Math.PI) / 180)
              const outerEndY = 200 + 120 * Math.sin(((segment.endAngle - 90) * Math.PI) / 180)

              const largeArcFlag = segment.endAngle - segment.startAngle <= 180 ? "0" : "1"

              const path = [
                `M ${startX} ${startY}`,
                `A 75 75 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                `L ${outerEndX} ${outerEndY}`,
                `A 120 120 0 ${largeArcFlag} 0 ${outerStartX} ${outerStartY}`,
                "Z",
              ].join(" ")

              return (
                <g key={index}>
                  <path d={path} fill={segment.color} stroke="white" strokeWidth="1" />
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    fontWeight="bold"
                    fontSize="12"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                  >
                    {segment.label}
                  </text>
                </g>
              )
            })}
          </g>

          {/* Middle white ring - static */}
          <circle cx="200" cy="200" r="75" fill="white" stroke="none" />

          {/* Inner circle for logo background - static */}
          <circle cx="200" cy="200" r="65" fill="white" stroke="none" />
        </svg>

        {/* Logo positioned absolutely in the center */}
        <div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: logoSize.width,
            height: logoSize.height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/predim-logo-large.png"
            alt="PredimTech Logo"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  )
}

