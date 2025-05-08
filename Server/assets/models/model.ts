type Model = {
  name: string;
  gender: string;
  dob: string;
  temperature: number;
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
    avatar: string;
    username: string;
    userGender: string;
    userDescription: string;
    userDob: string;
    userLang: string;
    summaries: string[];
  }) => string;
};

export default Model;
