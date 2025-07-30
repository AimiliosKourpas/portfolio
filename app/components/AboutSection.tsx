import SectionWrapper from './SectionWrapper';

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="px-4 sm:px-6 lg:px-8">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl max-w-3xl mx-auto px-6 py-10 sm:p-12 text-white text-opacity-90">
        <h2 className="text-3xl sm:text-3xl font-bold mb-8 text-center drop-shadow-md">
          About Me
        </h2>

        <div className="space-y-6 text-base sm:text-lg leading-relaxed text-gray-200">
          <p>
            I’m a <span className="text-cyan-400 font-semibold">23-year-old graduate</span> from the
            <span className="text-cyan-400 font-semibold"> Department of Informatics</span> at the
            <span className="text-cyan-400 font-semibold"> University of Piraeus</span>. My passion for
            <span className="text-cyan-400 font-semibold"> technology</span> and
            <span className="text-cyan-400 font-semibold"> problem-solving</span> has driven me to explore diverse areas of informatics.
          </p>

          <p>
            I’ve developed a deep interest in <span className="text-cyan-400 font-semibold">programming</span> and the fast-moving
            world of <span className="text-cyan-400 font-semibold">technology</span>. My curiosity and drive keep me pushing forward.
          </p>

          <p>
            I’m eager to bring the <span className="text-cyan-400 font-semibold">skills and insights</span> I’ve gained to new and
            challenging projects in the real world.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
