"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion"
import Link from "next/link"

export function ServiceCardGallery() {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(false)
  const [radius, setRadius] = useState(100)
  const [faceWidth, setFaceWidth] = useState(200)
  const [cardHeight, setCardHeight] = useState(170)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsScreenSizeSm(width <= 640)

      // Additional responsive adjustments based on screen width
      if (width <= 480) {
        // Extra small screens
        setRadius(80)
        setFaceWidth(160)
        setCardHeight(140)
      } else if (width <= 640) {
        // Small screens
        setRadius(90)
        setFaceWidth(180)
        setCardHeight(150)
      } else if (width <= 768) {
        // Medium screens
        setRadius(95)
        setFaceWidth(190)
        setCardHeight(160)
      } else {
        // Large screens
        setRadius(100)
        setFaceWidth(200)
        setCardHeight(170)
      }
    }

    handleResize() // Set initial value
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Service card data
  const services = [
    {
      title: "Teamcenter Implementation",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3366CC"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      ),
      link: "/services/teamcenter-implementation",
    },
    {
      title: "Teamcenter Migration & Upgrade",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3366CC"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      link: "/services/teamcenter-migration-upgrade",
    },
    {
      title: "Teamcenter Integration",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3366CC"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
          <line x1="2" y1="12" x2="22" y2="12"></line>
        </svg>
      ),
      link: "/services/teamcenter-integration",
    },
  ]

  // Create a larger array for continuous rotation
  const extendedServices = [...services, ...services, ...services]

  // 3D geometry
  const cylinderWidth = isScreenSizeSm ? 500 : 600
  const faceCount = services.length

  // Framer Motion
  const dragFactor = 0.05
  const rotation = useMotionValue(0)
  const controls = useAnimation()

  // Convert rotation -> 3D transform
  const transform = useTransform(rotation, (val) => `rotate3d(0,1,0,${val}deg)`)

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 12, // Increased rotation speed (was 20 seconds)
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
    })
  }

  useEffect(() => {
    const currentAngle = rotation.get()
    startInfiniteSpin(currentAngle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY)
    }
  }

  const handleDrag = (_, info) => {
    controls.stop()
    rotation.set(rotation.get() + info.offset.x * dragFactor)
  }

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor
    rotation.set(finalAngle)
    startInfiniteSpin(finalAngle)
  }

  const handleMouseEnter = () => {
    controls.stop()
  }

  const handleMouseLeave = () => {
    const currentAngle = rotation.get()
    startInfiniteSpin(currentAngle)
  }

  return (
    <div className="relative h-[250px] w-full overflow-hidden">
      <div className="flex h-full items-center justify-center [perspective:1200px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {extendedServices.map((service, i) => {
            // Calculate angle for this card
            const angle = i % faceCount === 0 ? 0 : i % faceCount === 1 ? 120 : i % faceCount === 2 ? 240 : 0

            return (
              <div
                key={i}
                className="absolute flex h-fit items-center justify-center [backface-visibility:hidden]"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
              >
                <div
                  className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all flex flex-col items-center justify-center"
                  style={{
                    width: `${faceWidth}px`,
                    height: `${cardHeight}px`,
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-primary mb-2 text-center">{service.title}</h3>
                  <div className="flex justify-center mt-auto">
                    <Link
                      href={service.link}
                      key={`link-${i}`}
                      className="px-3 sm:px-4 py-1.5 bg-secondary text-white font-medium rounded-full hover:bg-secondary/90 transition-colors text-sm"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

