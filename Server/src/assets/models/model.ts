type Model = {
  _id: string;
  name: string;
  gender: string;
  dob: Date;
  temperature: number;
  frequencyPenalty: number;
  presencePenalty: number;
  avatar: string;
  greetingPrompt: ({ username }: { username: string }) => string;
  systemInstruction: ({
    username,
    userGender,
    userDescription,
    userDob,
    userLang,
    summaries,
  }: {
    username: string;
    userGender: string;
    userDescription: string;
    userDob: Date;
    userLang: string;
    summaries: string[];
  }) => string;
};

export default Model;
