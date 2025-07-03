import SectionWrapper from "./SectionWrapper";

export default function EducationSection() {
  return (
    <SectionWrapper
      id="education"
      className="max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-xl px-6 py-10 sm:p-10 text-gray-100"
    >
      <h2 className="text-3xl sm:text-3xl font-bold mb-8 text-center drop-shadow-md">
        Education
      </h2>

      <div className="mb-12">
        <h3 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-1">
          University of Piraeus
        </h3>
        <p className="text-cyan-300 italic mb-2 text-sm sm:text-base">
          BSc in Computer Science &middot; <span className="font-semibold">June 2024</span> &middot; GPA:{" "}
          <span className="font-bold text-white">7.96 / 10</span>
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base">
          <li><span className="font-semibold text-white">Proficient</span> in Software Development</li>
          <li><span className="font-semibold text-white">Strong understanding</span> of Algorithms</li>
          <li><span className="font-semibold text-white">Knowledge</span> of Data Structures</li>
          <li><span className="font-semibold text-white">Experienced</span> with MySQL</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-1">
          High School
        </h3>
        <p className="text-cyan-300 italic text-sm sm:text-base">
          Markopoulo, Greece &middot; <span className="font-semibold">June 2020</span> &middot; GPA:{" "}
          <span className="font-bold text-white">17.8 / 20</span>
        </p>
      </div>
    </SectionWrapper>
  );
}
