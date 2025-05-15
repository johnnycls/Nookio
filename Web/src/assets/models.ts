export type Model = {
  _id: string;
  name: string;
  gender: "male" | "female";
  languages: string[];
  avatar: string;
};

export const MODELS: Model[] = [
  {
    _id: "014",
    name: "米亞 (Mya)",
    gender: "female",
    languages: ["zh-HK"],
    avatar: "/avatars/014.jpg",
  },
];
