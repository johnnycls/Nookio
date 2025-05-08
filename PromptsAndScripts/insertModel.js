const DATABASE_NAME = "myAppDB";
const COLLECTION_NAME = "Models";

const templatesToInsert = [
  {
    name: "",
    gender: "",
    dob: "",
    temperature: 0,
    greetingPrompt: "",
    systemInstruction: "",
  },
];

const db = db.getSiblingDB(DATABASE_NAME);

try {
  const result = db
    .getCollection(COLLECTION_NAME)
    .insertMany(templatesToInsert);
} catch (e) {}

// mongosh "connectionString"
// load insertModel.js
