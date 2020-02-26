export interface ContactData {
  name: string;
  href: string;
  icon: string;
  ariaLabel: string;
}

export interface ProfileData {
  realname: string;
  nickname: string;
  avatarUrl: string;
  contacts: ContactData[];
}

export interface ExperienceData {
  title: string;
  subtitle: string;
  duration: string;
}

export interface SkillData {
  name: string;
  category: string;
  type: string;
  proficiency: string;
  [key: string]: string;
}

export interface SkillSortSequence {
  category: string[];
  type: string[];
  proficiency: string[];
  [key: string]: string[];
}

export default interface AboutData {
  profile: ProfileData;
  intro: string;
  experience: ExperienceData[];
  skill: SkillData[];
  skillSortSequence: SkillSortSequence;
  project: never[];
}
