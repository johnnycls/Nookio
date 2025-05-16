export type Model = {
  _id: string;
  name: string;
  gender: "male" | "female";
  languages: string[];
  avatar: string;
};

export const MODELS: Model[] = [
  {
    _id: "000",
    name: "葉虎",
    gender: "male",
    languages: ["zh-HK"],
    avatar: "/avatars/000.jpg",
  },
  {
    _id: "001",
    name: "梁志強老師",
    gender: "male",
    languages: ["zh-HK"],
    avatar: "/avatars/001.jpg",
  },
  {
    _id: "002",
    name: "林詠詩老師",
    gender: "female",
    languages: ["zh-HK"],
    avatar: "/avatars/002.jpg",
  },
  {
    _id: "003",
    name: "何美詩",
    gender: "female",
    languages: ["zh-HK"],
    avatar: "/avatars/003.jpg",
  },
  {
    _id: "004",
    name: "司徒浩然",
    gender: "male",
    languages: ["zh-HK"],
    avatar: "/avatars/004.jpg",
  },
  {
    _id: "005",
    name: "方力行老師",
    gender: "male",
    languages: ["zh-HK"],
    avatar: "/avatars/005.jpg",
  },
  {
    _id: "014",
    name: "米亞 (Mya)",
    gender: "female",
    languages: ["zh-HK"],
    avatar: "/avatars/014.jpg",
  },
];
