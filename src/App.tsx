import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgress from '@/components/ScrollProgress';
import CustomCursor from '@/components/CustomCursor';
import BackToTop from '@/components/BackToTop';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import GithubGraphSection from '@/components/sections/GithubGraphSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

function App() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <main className="min-h-screen bg-bg text-ink">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ServicesSection />
        <ProjectsSection />
        <GithubGraphSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </main>
      <BackToTop />
    </>
  );
}

export default App;
