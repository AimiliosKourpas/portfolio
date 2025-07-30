import StarCanvas from './components/StarCanvas';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import QuestionsSection from './components/QuestionsSection';
import ContentWrapper from './components/ContentWrapper';
import CertificationSection from './components/CertificationSectio';

export default function HomePage() {
  return (
    <>
      <StarCanvas />
      <Navbar />

      <div className="scroll-content relative z-10">
  <ContentWrapper>
    <HomeSection />
    <AboutSection />
    <EducationSection />
    <ProjectsSection />
    <CertificationSection/>
    <QuestionsSection />
  </ContentWrapper>
</div>

    </>
  );
}
