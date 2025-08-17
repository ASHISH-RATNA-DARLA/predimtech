"use client"
import ScrollFloat from "./scroll-float"
import { ServiceCardGallery } from "./service-card-gallery"

export function ServicesSection() {
  return (
    <section className="py-16 bg-white flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-[1px] w-16 bg-secondary"></div>
            <ScrollFloat containerClassName="mx-4" textClassName="font-bold text-primary" scrollStart="top bottom">
              OUR SERVICES
            </ScrollFloat>
            <div className="h-[1px] w-16 bg-secondary"></div>
          </div>
        </div>

        <div className="max-w-full md:max-w-[900px] lg:max-w-[1000px] mx-auto px-4">
          <ServiceCardGallery />
        </div>
      </div>
    </section>
  )
}

