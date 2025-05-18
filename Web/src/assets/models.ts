export type Model = {
  _id: string;
  name: string;
  gender: "male" | "female";
  languages: string[];
  series: string[];
  avatar: string;
};

export type Serie = { _id: string; label: string; langs: string[] };

export const SERIES: Serie[] = [
  { _id: "000", label: "香港校園", langs: ["zh-HK"] },
  { _id: "001", label: "特別角色", langs: ["zh-HK"] },
  { _id: "002", label: "香港打工仔", langs: ["zh-HK"] },
  { _id: "003", label: "香港領養兒童", langs: ["zh-HK"] },
];

export const MODELS: Model[] = [
  {
    _id: "000",
    name: "葉虎",
    gender: "male",
    languages: ["zh-HK"],
    series: ["000"],
    avatar: "/avatars/000.jpg",
  },
  {
    _id: "001",
    name: "梁志強老師",
    gender: "male",
    languages: ["zh-HK"],
    series: ["000"],
    avatar: "/avatars/001.jpg",
  },
  {
    _id: "002",
    name: "林詠詩老師",
    gender: "female",
    languages: ["zh-HK"],
    series: ["000"],
    avatar: "/avatars/002.jpg",
  },
  {
    _id: "003",
    name: "何美詩",
    gender: "female",
    languages: ["zh-HK"],
    series: ["000"],
    avatar: "/avatars/003.jpg",
  },
  {
    _id: "004",
    name: "司徒浩然",
    gender: "male",
    languages: ["zh-HK"],
    series: ["000"],
    avatar: "/avatars/004.jpg",
  },
  {
    _id: "005",
    name: "方力行老師",
    gender: "male",
    languages: ["zh-HK"],
    series: ["000"],
    avatar: "/avatars/005.jpg",
  },
  {
    _id: "006",
    name: "張志偉老闆",
    gender: "male",
    languages: ["zh-HK"],
    series: ["002"],
    avatar: "/avatars/006.jpg",
  },
  {
    _id: "007",
    name: "Larry",
    gender: "male",
    languages: ["zh-HK"],
    series: ["002"],
    avatar: "/avatars/007.jpg",
  },
  {
    _id: "008",
    name: "Suki",
    gender: "female",
    languages: ["zh-HK"],
    series: ["002"],
    avatar: "/avatars/008.jpg",
  },
  {
    _id: "009",
    name: "朗仔",
    gender: "male",
    languages: ["zh-HK"],
    series: ["003"],
    avatar: "/avatars/009.jpg",
  },
  {
    _id: "010",
    name: "瑤瑤",
    gender: "male",
    languages: ["zh-HK"],
    series: ["003"],
    avatar: "/avatars/010.jpg",
  },
  {
    _id: "014",
    name: "米亞 (Mya)",
    gender: "female",
    languages: ["zh-HK"],
    series: ["001"],
    avatar: "/avatars/014.jpg",
  },
];
