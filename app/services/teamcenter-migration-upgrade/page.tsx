import Link from "next/link"

export default function TeamcenterMigrationUpgradePage() {
  return (
    <div className="pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-primary mb-4">Teamcenter Migration & Upgrade</h1>
            <div className="h-[2px] w-32 bg-secondary mx-auto"></div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4">Seamless Non-CAD Data Migration</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Migration Planning</h3>
                <p className="text-gray-700">
                  Structuring the roadmap for migrating data to Teamcenter, identifying phases and key milestones.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Data Source Assessment</h3>
                <p className="text-gray-700">
                  Evaluating the current data sources for compatibility and integration challenges.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Precise Data Mapping</h3>
                <p className="text-gray-700">
                  Carefully mapping existing data into the Teamcenter structure to ensure accuracy and utility.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Migration Rules Formulation</h3>
                <p className="text-gray-700">
                  Establishing rules for data transformation and transfer to maintain integrity and compliance.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Migrations Tool Development</h3>
                <p className="text-gray-700">Developing or configuring tools to facilitate efficient data migration.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-primary mb-4">Teamcenter Upgrade Planning</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Functionality Mapping</h3>
                <p className="text-gray-700">
                  Determining which new features and functionalities should be implemented.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Infrastructure Assessment</h3>
                <p className="text-gray-700">
                  Evaluating the current infrastructure's ability to support new solutions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Code and Configuration Evaluation</h3>
                <p className="text-gray-700">Reviewing existing customizations for compatibility with new versions.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Data Model Upgrade</h3>
                <p className="text-gray-700">
                  Upgrading the underlying data schema and models to support enhanced functionalities.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Code and Configuration Enhancement</h3>
                <p className="text-gray-700">
                  Improving existing scripts and configurations to optimize performance and capabilities.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-2">Environments Upgrade</h3>
                <p className="text-gray-700">
                  Updating development, test, and production environments to align with new standards.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Link
                href="/contact"
                className="px-6 py-3 bg-secondary text-white font-medium rounded-md hover:bg-secondary/90 transition-colors"
              >
                Contact Us for Migration & Upgrade Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

