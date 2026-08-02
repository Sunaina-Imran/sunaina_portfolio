export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
  phone: string;
  website: string;
}

export interface Profile {
  name: string;
  shortName: string;
  tagline: string;
  role: string;
  roles: string[];
  specialization: string;
  location: string;
  yearsOfExperience: string;
  bio: string;
  resumeUrl: string;
  avatarImage: string;
  social: SocialLinks;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Skills {
  categories: SkillCategory[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
}

export type ProjectRepo =
  | { type: 'single'; url: string }
  | { type: 'multi'; repos: { label: string; url: string }[] }
  | { type: 'colab'; note: string }
  | { type: 'academic'; note: string; linkedinUrl?: string }
  | { type: 'none' };

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  role: string;
  year: string;
  repo: ProjectRepo;
  liveUrl: string;
  image: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  status: string;
  issueDate: string;
  instructor: string;
  image: string;
  fileType: 'image' | 'pdf' | 'none';
  credentialId: string;
  credentialUrl: string;
  available: boolean;
  skills: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  grade: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarColor: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skills;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  education: EducationItem[];
  testimonials: TestimonialItem[];
}
