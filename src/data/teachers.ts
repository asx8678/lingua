export type Teacher = {
  name: string;
  role: string;
  languages: string[];
  image?: string;
};

export const teachers: Teacher[] = [
  {
    name: "Kasia",
    role: "Metodyk i Lektorka",
    languages: ["Angielski"],
  },
  {
    name: "Ola",
    role: "Lektorka",
    languages: ["Angielski", "Hiszpański"],
  },
  {
    name: "Natalia",
    role: "Lektorka",
    languages: ["Hiszpański"],
  },
  {
    name: "Janina",
    role: "Lektorka",
    languages: ["Rosyjski"],
  },
  {
    name: "Małgorzata",
    role: "Lektorka",
    languages: ["Niemiecki", "Szwedzki"],
  },
  {
    name: "Marcin",
    role: "Lektor",
    languages: ["Angielski", "Francuski"],
  },
];
