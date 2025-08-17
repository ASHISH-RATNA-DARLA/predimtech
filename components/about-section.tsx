"use client"

import { BarChart3, Users, Shield, Lightbulb } from "lucide-react"
import ScrollFloat from "./scroll-float"

export default function AboutSection() {
  return (
    <div id="about" className="section-container bg-gray-50 flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <ScrollFloat containerClassName="mb-4" textClassName="font-bold text-primary" scrollStart="top bottom">
              ABOUT US
            </ScrollFloat>
            <div className="h-[2px] w-32 bg-secondary mx-auto"></div>
          </div>

          <div className="flex flex-col gap-12">
            <div>
              <p className="mb-6">
                <span className="font-bold">
                  PRED<span className="text-secondary">i</span>M TECH
                </span>
                , we specialize in delivering top-tier IT services centered around Siemens Teamcenter PLM software.
              </p>

              <p className="mb-6">
                Our esteemed founders bring with them a wealth of expertise from their tenure as ex-Siemens employees,
                where they spearheaded PLM implementations across diverse industries.
              </p>

              <p className="mb-6">
                Our unwavering mission is to empower our clients to realize triumphant PLM implementation goals.
              </p>
            </div>

            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary">Our Cornerstones of Success</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {/* Box 1 */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary">Customer-Centric Approach</h3>
                  </div>
                  <p className="text-gray-700">
                    We hold our clients at the heart of all our endeavors. Every solution, every service, is
                    meticulously crafted to meet the unique needs of our customers.
                  </p>
                </div>

                {/* Box 2 */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <Lightbulb className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary">Employee-Centric Excellence</h3>
                  </div>
                  <p className="text-gray-700">
                    Our team's dedication is the bedrock of our accomplishments. We foster a work environment that
                    values innovation, collaboration, and continuous growth.
                  </p>
                </div>

                {/* Box 3 */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary">Transparency in Everything</h3>
                  </div>
                  <p className="text-gray-700">
                    Honesty and openness are the pillars of our relationships. From our interactions with clients to our
                    internal operations, transparency is nonnegotiable.
                  </p>
                </div>

                {/* Box 4 */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary">Responsibility and Reliability</h3>
                  </div>
                  <p className="text-gray-700">
                    We understand the significance of our role in your journey. This understanding drives us to be
                    responsible stewards of your trust, consistently delivering results you can count on.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 font-bold text-primary text-center">
              "Welcome to PRED<span className="text-secondary">i</span>M TECH—where PLM aspirations evolve into reality"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

