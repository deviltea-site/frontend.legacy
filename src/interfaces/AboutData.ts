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

export default interface AboutData {
  profile: ProfileData;
  intro: string;
  experience: ExperienceData[];
  skill: never[];
  project: never[];
}
