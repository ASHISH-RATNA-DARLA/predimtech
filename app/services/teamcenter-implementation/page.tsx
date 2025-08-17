import Link from "next/link"

export default function TeamcenterImplementationPage() {
  return (
    <div className="pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-primary mb-4">Teamcenter Implementation</h1>
            <div className="h-[2px] w-32 bg-secondary mx-auto"></div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4">Services for Successful Implementation</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-primary mb-3">Solution Alignment</h3>
                <p className="text-gray-700">Aligning the solution with the client's business needs and processes.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-primary mb-3">Solution Architecture</h3>
                <p className="text-gray-700">
                  Developing a robust architecture to ensure that the Teamcenter implementation supports the client's
                  operational structure and future scalability.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-primary mb-3">Customization</h3>
                <p className="text-gray-700">
                  Tailoring the Teamcenter environment to fit specific business requirements, including custom workflows
                  and user interfaces.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary mb-4">Domains/Modules Expertise</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Product Data Management (PDM)</h3>
                <p className="text-gray-700">Managing and maintaining product information throughout its lifecycle.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Change Management</h3>
                <p className="text-gray-700">Systems to manage changes to a product from inception to deployment.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Document Management</h3>
                <p className="text-gray-700">
                  Organizing and controlling documents associated with product design and manufacturing.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Requirements Management</h3>
                <p className="text-gray-700">
                  Managing and tracking the evolution of requirements throughout the lifecycle of the product.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Quality Management</h3>
                <p className="text-gray-700">Ensuring product quality by managing testing processes and outcomes.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Resource Library Management</h3>
                <p className="text-gray-700">Organizing digital resources such as CAD templates and design parts.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Manufacturing Process Management</h3>
                <p className="text-gray-700">Overseeing production processes to enhance efficiency and quality.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Supplier/Source Compliance</h3>
                <p className="text-gray-700">
                  Managing supplier information and ensuring compliance with industry standards.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary mb-4">Supported Products</h2>
            <p className="text-gray-700 mb-8">
              Teamcenter portfolio of products that may include various specialized modules tailored to different
              industry needs.
            </p>

            <div className="flex justify-center mt-8">
              <Link
                href="/contact"
                className="px-6 py-3 bg-secondary text-white font-medium rounded-md hover:bg-secondary/90 transition-colors"
              >
                Contact Us for Implementation Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

