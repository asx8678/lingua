import { teachers } from "./teachers";

export const taughtLanguages = Array.from(
  new Set(teachers.flatMap((teacher) => teacher.languages))
)
  .filter((subject) => subject !== "Matematyka")
  .sort((a, b) => a.localeCompare(b, "pl"));

export const subjects = [...taughtLanguages, "Matematyka"];
