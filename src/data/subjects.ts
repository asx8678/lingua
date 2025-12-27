import { teachers } from "./teachers";

const allSubjects = Array.from(
  new Set(teachers.flatMap((teacher) => teacher.languages))
);

export const taughtLanguages = allSubjects
  .filter((subject) => subject !== "Matematyka")
  .sort((a, b) => a.localeCompare(b, "pl"));

export const subjects = taughtLanguages;
