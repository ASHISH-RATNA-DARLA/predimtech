export default function BlogPage() {
  return (
    <div className="pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-primary mb-4">Blog</h1>
            <div className="h-[2px] w-32 bg-secondary mx-auto"></div>
          </div>

          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Work in Progress</h2>
            <p className="text-gray-700 mb-6">
              Our blog section is currently under development. Check back soon for articles, insights, and updates about
              PLM and Teamcenter.
            </p>
            <div className="w-24 h-24 mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3366CC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v4"></path>
                <path d="M12 18v4"></path>
                <path d="M4.93 4.93l2.83 2.83"></path>
                <path d="M16.24 16.24l2.83 2.83"></path>
                <path d="M2 12h4"></path>
                <path d="M18 12h4"></path>
                <path d="M4.93 19.07l2.83-2.83"></path>
                <path d="M16.24 7.76l2.83-2.83"></path>
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 12 12"
                  to="360 12 12"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </svg>
            </div>
            <p className="text-gray-600">
              In the meantime, feel free to{" "}
              <a href="/contact" className="text-secondary hover:underline">
                contact us
              </a>{" "}
              for any questions about our services.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

