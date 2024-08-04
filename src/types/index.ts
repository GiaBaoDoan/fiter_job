export interface JobType {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

export enum Contract {
  Contract = "Contract",
  FullTime = "Full Time",
  PartTime = "Part Time",
}

export enum Level {
  Junior = "Junior",
  Midweight = "Midweight",
  Senior = "Senior",
}

export enum Role {
  Backend = "Backend",
  Frontend = "Frontend",
  Fullstack = "Fullstack",
}
export type handelFilter = (typeFilter: string, item: string) => void;
