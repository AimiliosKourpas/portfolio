import SectionWrapper from "./SectionWrapper";

const projects = [
  {
    title: "Sorting Visualiser",
    date: "March 2024",
    website: "#",
    github: "#",
    bullets: [
      "Created an interactive React/Redux app to visualize classic sorting algorithms.",
      "Implemented Merge Sort, Quick Sort, Heap Sort, and Bubble Sort with smooth animations.",
    ],
  },
  {
    title: "Pathfinding Visualiser",
    date: "April 2024",
    website: "#",
    github: "#",
    bullets: [
      "Developed a Vanilla JS tool to visualize pathfinding and maze generation.",
      "Implemented 9 algorithms including a novel hybrid based on A* and Dijkstra.",
    ],
  },
  {
    title: "Greek BERT – Thesis",
    date: "Sep 2023 – Jan 2024",
    website: "#",
    github: "#",
    bullets: [
      "Fine-tuned Greek BERT model with K-Fold Cross Validation for enhanced accuracy.",
      "Performed in-depth analysis of accuracy and loss metrics.",
      "Utilized a rich Greek tweet dataset for comprehensive training/testing.",
    ],
  },
  {
    title: "Birth-Diary",
    date: "Sep 2023 – Jan 2024",
    website: "#",
    github: "#",
    bullets: [
      "Built a React Native app for pregnancy tracking and daily journaling.",
      "Implemented secure cloud sync and intuitive UX flows using Firebase.",
      "Designed for non-technical users with accessibility in mind.",
    ],
  },
];

export default function ProjectsSection() {
  return (
    <SectionWrapper
      id="projects"
      className="max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-xl px-6 py-10 sm:p-10 text-gray-100"
    >
      <h2 className="text-3xl sm:text-3xl font-bold mb-8 text-center drop-shadow-md">Technical Projects</h2>

      <div className="w-full flex justify-center">
  <div className="grid gap-8 md:grid-cols-2 place-items-center">
    {projects.map((project, idx) => (
      <div
        key={idx}
        className="w-full max-w-md bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:shadow-cyan-500/50 transition-shadow duration-300"
      >
        <div>
          <h3 className="text-2xl font-semibold text-cyan-400 mb-1">
            {project.title}
          </h3>
          <p className="text-sm italic text-gray-400 mb-3">{project.date}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base leading-relaxed">
            {project.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-center shadow-md transition"
              aria-label={`${project.title} GitHub`}
            >
              GitHub
            </a>
          )}
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 rounded-md border border-cyan-600 hover:bg-cyan-600 hover:text-white text-cyan-300 font-medium text-center transition"
              aria-label={`${project.title} Website`}
            >
              Website
            </a>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </SectionWrapper>
  );
}
