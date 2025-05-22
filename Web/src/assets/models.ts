export type Model = {
  _id: string;
  name: string;
  gender: "male" | "female" | "other";
  languages: string[];
  series: string[];
};

export type Serie = { _id: string; label: string; langs: string[] };

export const SERIES: Serie[] = [
  { _id: "000", label: "香港校園", langs: ["zh-HK"] },
  // { _id: "001", label: "特別角色", langs: ["zh-HK"] },
  { _id: "002", label: "香港打工仔", langs: ["zh-HK"] },
  { _id: "003", label: "香港領養兒童", langs: ["zh-HK"] },
  {
    _id: "004",
    label: "Text Adventure（文字冒險）",
    langs: ["en", "zh-HK", "zh-TW"],
  },
];

export const MODELS: Model[] = [
  {
    _id: "000",
    name: "葉虎",
    gender: "male",
    languages: ["zh-HK"],
    series: ["000"],
  },
  {
    _id: "001",
    name: "梁志強老師",
    gender: "male",
    languages: ["zh-HK"],
    series: ["000"],
  },
  {
    _id: "002",
    name: "林詠詩老師",
    gender: "female",
    languages: ["zh-HK"],
    series: ["000"],
  },
  {
    _id: "003",
    name: "何美詩",
    gender: "female",
    languages: ["zh-HK"],
    series: ["000"],
  },
  {
    _id: "004",
    name: "司徒浩然",
    gender: "male",
    languages: ["zh-HK"],
    series: ["000"],
  },
  {
    _id: "005",
    name: "方文力老師",
    gender: "male",
    languages: ["zh-HK"],
    series: ["000"],
  },
  {
    _id: "006",
    name: "張總志老闆",
    gender: "male",
    languages: ["zh-HK"],
    series: ["002"],
  },
  {
    _id: "007",
    name: "Larry",
    gender: "male",
    languages: ["zh-HK"],
    series: ["002"],
  },
  {
    _id: "008",
    name: "Suki",
    gender: "female",
    languages: ["zh-HK"],
    series: ["002"],
  },
  {
    _id: "009",
    name: "朗仔",
    gender: "male",
    languages: ["zh-HK"],
    series: ["003"],
  },
  {
    _id: "010",
    name: "瑤瑤",
    gender: "male",
    languages: ["zh-HK"],
    series: ["003"],
  },
  {
    _id: "011",
    name: "文字冒險（廣東話）",
    gender: "other",
    languages: ["zh-HK"],
    series: ["004"],
  },
  {
    _id: "012",
    name: "文字冒險（普通話）",
    gender: "other",
    languages: ["zh-TW"],
    series: ["004"],
  },
  {
    _id: "013",
    name: "Text Adventure",
    gender: "other",
    languages: ["en"],
    series: ["004"],
  },
];
