import React from 'react';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { SkillsPreview } from '../components/SkillsPreview';
import { ProjectsPreview } from '../components/ProjectsPreview';
import { ReviewsSection } from '../components/ReviewsSection';
import { ContactInfoSection } from '../components/ContactInfoSection';
import { ContactCTA } from '../components/ContactCTA';

interface HomePageProps {
  onOpenContactModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenContactModal }) => {
  const handleExploreProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Cinematic Hero Section */}
      <Hero
        onExploreProjects={handleExploreProjects}
        onWorkTogether={onOpenContactModal}
      />

      {/* Achievement Statistics Panel */}
      <Stats />

      {/* Featured Skills Preview */}
      <SkillsPreview />

      {/* Featured Projects Preview Showcase */}
      <ProjectsPreview />

      {/* Client Reviews & Testimonials Section */}
      <ReviewsSection />

      {/* Direct Contact Information & Real Email Section */}
      <ContactInfoSection onOpenContactModal={onOpenContactModal} />

      {/* Contact Call to Action */}
      <ContactCTA
        onOpenContactModal={onOpenContactModal}
      />
    </>
  );
};
