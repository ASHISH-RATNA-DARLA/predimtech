import ScrollFloat from "./scroll-float"

export default function TeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Pradeep Dakua",
      role: "Founder & CEO",
      experience: "Pradeep Dakua has 22+ years of experience in PLM & MES implementations across various industries.",
      image: "/team/pradeep-dakua.jpeg",
    },
    {
      id: 2,
      name: "Srinivas Rao Maddukuri",
      role: "Co-Founder & CTO",
      experience:
        "Srinivas Rao Maddukuri has 23+ years of experience in PLM & MES implementations across various industries.",
      image: "/team/srinivas.jpeg",
    },
    {
      id: 3,
      name: "Sushma Mannam",
      role: "HR Manager",
      experience: "Sushma Mannam has 7+ years of experience in HR & OPERATION",
      image: "/team/sushma.jpeg",
    },
    {
      id: 4,
      name: "Tapan Dakua",
      role: "Sales & Marketing Manager",
      experience:
        "Tapan Dakua has 9+ years of experience in Sales and Marketing, including 5 years in IT Sales and Marketing.",
      image: "/team/tapan-dakua.jpeg",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-[1px] w-16 bg-secondary"></div>
            <ScrollFloat
              containerClassName="mx-4"
              textClassName="font-bold text-primary text-2xl"
              scrollStart="top bottom"
            >
              OUR TEAM
            </ScrollFloat>
            <div className="h-[1px] w-16 bg-secondary"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our experienced team of professionals dedicated to delivering exceptional PLM solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`bg-white p-4 rounded-lg shadow-md text-center ${index === 3 ? "lg:col-start-2 lg:col-end-3 xl:col-start-auto xl:col-end-auto" : ""}`}
            >
              <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-primary mb-1">{member.name}</h3>
              <p className="text-secondary font-medium mb-2 text-sm">{member.role}</p>
              <p className="text-gray-600 text-xs leading-tight">{member.experience}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

