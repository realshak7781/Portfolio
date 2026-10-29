export type CategoryKey = 'Me' | 'Projects' | 'Skills' | 'Fun' | 'Contact';

export interface Project {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  src: string;
  description: string;
  highlights: string[];
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  stats?: string;
}

export interface SkillItemDetail {
  area: string;
  details: string;
  chips: string[];
}

export interface SkillGroup {
  category: string;
  iconName: string;
  skills: string[];
  color: string;
  badgeBg: string;
  items?: SkillItemDetail[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  description: string[];
}

export interface AchievementItem {
  title: string;
  detail: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  viewType?: CategoryKey | 'Resume' | 'ProjectDetail';
  projectPayload?: Project;
}
