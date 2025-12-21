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
    image: "/images/teachers/kasia.png",
  },
  {
    name: "Ola",
    role: "Lektorka",
    languages: ["Angielski", "Hiszpański"],
    image: "/images/teachers/ola.png",
  },
  {
    name: "Natalia",
    role: "Lektorka",
    languages: ["Hiszpański"],
    image: "/images/teachers/natalia.png",
  },
  {
    name: "Janina",
    role: "Lektorka",
    languages: ["Rosyjski"],
    image: "/images/teachers/janina.png",
  },
  {
    name: "Małgorzata",
    role: "Lektorka",
    languages: ["Niemiecki", "Szwedzki"],
    image: "/images/teachers/malgorzata.png",
  },
  {
    name: "Marcin",
    role: "Lektor",
    languages: ["Angielski", "Francuski"],
    image: "/images/teachers/placeholder.svg",
  },
];
