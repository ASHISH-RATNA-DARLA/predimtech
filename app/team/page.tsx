export default function TeamPage() {
  return (
    <div className="pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-primary mb-4">Our Team</h1>
            <div className="h-[2px] w-32 bg-secondary mx-auto"></div>
            <p className="mt-6 text-lg text-gray-700">
              Meet the experienced professionals behind PREDiM TECH's success.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Pradeep Dakua */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <img src="/team/pradeep-dakua.jpeg" alt="Pradeep Dakua" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Pradeep Dakua</h3>
              <p className="text-secondary font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-600">
                Pradeep Dakua has 22+ years of experience in PLM & MES implementations across various industries.
              </p>
            </div>

            {/* Srinivas Rao Maddukuri */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <img src="/team/srinivas.jpeg" alt="Srinivas Rao Maddukuri" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Srinivas Rao Maddukuri</h3>
              <p className="text-secondary font-medium mb-3">Co-Founder & CTO</p>
              <p className="text-gray-600">
                Srinivas Rao Maddukuri has 23+ years of experience in PLM & MES implementations across various
                industries.
              </p>
            </div>

            {/* Sushma Mannam */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <img src="/team/sushma.jpeg" alt="Sushma Mannam" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Sushma Mannam</h3>
              <p className="text-secondary font-medium mb-3">HR Manager</p>
              <p className="text-gray-600">Sushma Mannam has 7+ years of experience in HR & OPERATION</p>
            </div>

            {/* Tapan Dakua */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <img src="/team/tapan-dakua.jpeg" alt="Tapan Dakua" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Tapan Dakua</h3>
              <p className="text-secondary font-medium mb-3">Sales & Marketing Manager</p>
              <p className="text-gray-600">
                Tapan Dakua has 9+ years of experience in Sales and Marketing, including 5 years in IT Sales and
                Marketing.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-primary mb-6">Join Our Team</h2>
            <p className="text-gray-700 mb-8">
              We're always looking for talented individuals to join our team. Check out our current openings or send us
              your resume.
            </p>
            <a
              href="/career"
              className="px-6 py-3 bg-secondary text-white font-medium rounded-md hover:bg-secondary/90 transition-colors"
            >
              View Career Opportunities
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

