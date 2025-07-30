import ProfilePhoto from './ProfilePhoto';
import SectionWrapper from './SectionWrapper';

export default function HomeSection() {
  return (
    <SectionWrapper
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6"
    >
      <div className="bg-gray-900/60 rounded-2xl shadow-2xl max-w-5xl w-full flex flex-col md:flex-row items-center gap-12 p-6 md:p-12">
        
        {/* Profile photo - hidden on md+ */}
        <div className="md:hidden w-36 h-36 mx-auto">
          <ProfilePhoto />
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left max-w-xl px-2">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg tracking-tight">
            Aimilianos Kourpas-Danas
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-300 max-w-lg mx-auto md:mx-0 tracking-wide leading-relaxed">
            Frontend Developer passionate about crafting clean, scalable, and beautiful user interfaces.  
            <br />
            Welcome to my portfolio — scroll down to explore my projects and experience.
          </p>

          <div className="mt-8 flex justify-center md:justify-start space-x-8">
            <a
              href="https://github.com/AimiliosKourpas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-600 transition-colors duration-300 font-semibold text-base md:text-lg border-b-2 border-transparent hover:border-cyan-600 pb-1"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aimilianos-kourpas/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-600 transition-colors duration-300 font-semibold text-base md:text-lg border-b-2 border-transparent hover:border-cyan-600 pb-1"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="mailto:aimiliosk2002@gmail.com"
              className="text-cyan-400 hover:text-cyan-600 transition-colors duration-300 font-semibold text-base md:text-lg border-b-2 border-transparent hover:border-cyan-600 pb-1"
              aria-label="Email"
            >
              Email
            </a>
          </div>
        </div>

        {/* Profile photo shown on md+ */}
        <div className="hidden md:block w-40 h-40 flex-shrink-0">
          <ProfilePhoto />
        </div>
      </div>
    </SectionWrapper>
  );
}
