import Link from "next/link"

export default function TeamcenterIntegrationPage() {
  return (
    <div className="pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-primary mb-4">Teamcenter Integration</h1>
            <div className="h-[2px] w-32 bg-secondary mx-auto"></div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4">Integration Services</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Integration Architecture and Alignment</h3>
                <p className="text-gray-700">
                  Designing the overall architecture to ensure seamless integration between Teamcenter and other
                  enterprise systems.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Integration Configuration and Customization</h3>
                <p className="text-gray-700">
                  Customizing the integration solutions to meet specific business processes and requirements.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary mb-4">Expertise in Following Integrations to Teamcenter</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">MCAD Integrations</h3>
                <p className="text-gray-700">Such as NX, Creo for managing CAD data within Teamcenter.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">ECAD Integrations</h3>
                <p className="text-gray-700">
                  Such as Cadence Orcad, Altium, integrating electronic CAD tools with Teamcenter.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">ERP Integrations</h3>
                <p className="text-gray-700">
                  SAP, M3, Oracle, ensuring data consistency and flow between ERP systems and Teamcenter.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Seamless Enterprise Software Integrations</h3>
                <p className="text-gray-700">
                  Enabling comprehensive integration that supports the enterprise's digital thread.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Link
                href="/contact"
                className="px-6 py-3 bg-secondary text-white font-medium rounded-md hover:bg-secondary/90 transition-colors"
              >
                Contact Us for Integration Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

