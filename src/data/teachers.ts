export type Teacher = {
  name: string;
  role: string;
  languages: string[];
  image?: string;
  specialties?: string[];
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
    name: "Marcin K.",
    role: "Lektor",
    languages: ["Angielski", "Francuski"],
    image: "/images/teachers/placeholder.svg",
  },
  {
    name: "Artur",
    role: "Nauczyciel",
    languages: ["Matematyka"],
    image: "/images/teachers/artur-v2.png",
  },
  {
    name: "Ania",
    role: "Lektorka",
    languages: ["Polski dla obcokrajowców"],
    image: "/images/teachers/placeholder.svg",
  },
];
