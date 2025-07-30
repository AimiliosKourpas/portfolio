import SectionWrapper from "./SectionWrapper";

const certifications = [
    {
      title: "Frontend Expert",
      date: "February 2024 - August 2024",
      bullets: [
        "Gained proficiency in HTML, CSS, React.js, and JavaScript for building dynamic web applications.",
        "Acquired foundational knowledge in responsive design and user experience best practices.",
        "Engaged in hands-on projects to reinforce understanding of frontend technologies."
      ],
      issuer: "",
      link: ""
    },
    {
      title: "Programming Expert",
      date: "January 2023 – May 2023",
      bullets: [
        "Developed expertise in Python, focusing on object-oriented programming (OOP) and fundamentals.",
        "Gained hands-on experience with essential development tools.",
        "Completed four programming projects to reinforce problem-solving skills."
      ],
      issuer: "",
      link: ""
    },
    {
      title: "AZ-104 Microsoft",
      date: "July 2023",
      bullets: [
        "Gained proficiency in core Azure concepts, including resource management and security."
      ],
      issuer: "Microsoft",
      link: ""
    },
    {
      title: "DP-100 Microsoft",
      date: "November 2022",
      bullets: [
        "Developed skills in data exploration, feature engineering, and model deployment.",
        "Gained hands-on experience with Azure Machine Learning to build scalable data solutions."
      ],
      issuer: "Microsoft",
      link: ""
    }
  ];
  
  
  export default function CertificationSection() {
    return (
      <SectionWrapper
        id="certifications"
        className="max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-xl px-6 py-10 sm:p-10 text-gray-100"
      >
        <h2 className="text-3xl sm:text-3xl font-bold mb-8 text-center drop-shadow-md">
          Certifications
        </h2>
  
        <div className="grid gap-8 md:grid-cols-2">
          {certifications.map(({ title, issuer,bullets, date, link }, idx) => (
            <div
              key={idx}
              className="bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:shadow-cyan-500/50 transition-shadow duration-300"
            >
              <div>
                <h3 className="text-2xl font-semibold text-cyan-400 mb-1">{title}</h3>
                <p className="text-gray-400 italic mb-2">{issuer}</p>
                <p className="text-sm text-gray-500 mb-4">{date}</p>
              </div>
  
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-center rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-semibold shadow-md transition"
                aria-label={`View certificate for ${title}`}
              >
                View Certificate
              </a>
            </div>
          ))}
        </div>
      </SectionWrapper>
    );
  }
  