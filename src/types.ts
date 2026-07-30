export type ActiveView = 
  | 'dashboard'
  | 'criteria'
  | 'companies'
  | 'vacancies'
  | 'vacancy_analysis'
  | 'swot_miro'
  | 'newsletters'
  | 'agile_track'
  | 'notion_docs'
  | 'skills'
  | 'swot'
  | 'roadmap_kanban'
  | 'ai_coach'
  | 'settings';

export interface Company {
  id: string;
  name: string;
  tier?: 'Tier 1' | 'Tier 2' | 'Startup' | 'BigTech' | string;
  country?: string;
  description?: string;
  techStack: string[];
  size?: string;
  sponsorship?: boolean;
  careerLink?: string;
  notes: string;
  rating?: number;
  status?: string;
}

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  salaryRange: string;
  location: string;
  keySkills: string[];
  status?: 'Saved' | 'Applied' | 'Interview' | 'Offer';
  atsScore?: number;
  link?: string;
  notes?: string;
  parsedRequirements?: string[];
}

export interface CareerNewsletter {
  id: string;
  companyName: string;
  title: string;
  frequency: string;
  subscribed: boolean;
  link: string;
  lastIssueDate?: string;
  notes?: string;
}

export interface VacancyRequirementAnalysis {
  id: string;
  vacancyTitle: string;
  company: string;
  item: string; // Требование или обязанность
  type: 'Требование' | 'Обязанность';
  status: 'Владею' | 'Частично' | 'Не владею';
  achievementMethod: 'Обучение' | 'Наставник' | 'Опыт на текущем месте' | 'Стажировка' | 'Фриланс-проект' | 'Уже владею';
  notes?: string;
}

export interface SwotQuestionAnswer {
  questionId: string;
  questionText: string;
  answerText: string;
}

export interface SwotDetailedAnswers {
  strengths: SwotQuestionAnswer[];
  weaknesses: SwotQuestionAnswer[];
  opportunities: SwotQuestionAnswer[];
  threats: SwotQuestionAnswer[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'Hard Skill' | 'Soft Skill' | 'Architecture' | 'Process/Agile' | 'Domain';
  level: 'Intern' | 'Junior' | 'Middle' | 'Senior' | 'Lead' | 'Pro' | 'Expert' | string;
  evidence: string;
}

export interface MissingSkill {
  id: string;
  skillName: string;
  priority: 'High' | 'Medium' | 'Low';
  effort: 'Low' | 'Medium' | 'High';
  targetDate: string;
  actionPlan: string;
  freeCourse?: string;
  paidCourse?: string;
}

export interface RoadmapItem {
  id: string;
  sprint: string;
  task: string;
  category: 'Skill Gap' | 'CV/Portfolio' | 'Networking' | 'Interview Prep';
  status: 'Backlog' | 'In Progress' | 'Done';
  metric: string;
  quarter?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
}

export interface SWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface NotionCriterion {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  category: 'Compensation' | 'Work Environment' | 'Tech Stack' | 'Growth & Team';
  priority?: 'Обязательно' | 'Желательно' | 'Must Have' | 'Nice to Have';
}

export interface CareerState {
  appName?: string;
  current_step: number;
  completed_steps: number[];
  goals: {
    primaryGoal: string;
    currentGrade: string;
    targetGrade: string;
    targetLocation: string;
    expectedSalary: string;
    timeline: string;
  };
  selected_market: string | null;
  selected_position: string | null;
  alternate_position?: string | null;
  selected_companies: Company[];
  selected_vacancies: Vacancy[];
  newsletters: CareerNewsletter[];
  vacancy_analyses: VacancyRequirementAnalysis[];
  swot_answers: SwotDetailedAnswers;
  skills: Skill[];
  missing_skills: MissingSkill[];
  swot: SWOT;
  roadmap: RoadmapItem[];
  notion_criteria: NotionCriterion[];
  stepOutputs: Record<number, string>;
}

export interface WorkflowStepDef {
  id: number;
  title: string;
  titleRu: string;
  objective: string;
  keyOutputs: string[];
  promptTemplate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  stepIndex?: number;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}
