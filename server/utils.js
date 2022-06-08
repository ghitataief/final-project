//Function that has 2 paramaters, user and signInName and return the user
// const findName = (users, signInName) => {
//   const user = users.find((user) => user.name === signInName) || null;
//   return user ? user : null;
// };

//module.exports = {findName };

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const affirmations = require("./data/affirmations.json");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImportAffirmations = async () => {
  const arrayOfAffirmations = affirmations.map((affirmation) => {
    return { affirmation };
  });
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("Growth-Haven");

    db.collection("affirmations").insertMany(arrayOfAffirmations);
  } catch (err) {
    console.log(err.stack);
  }
};

//batchImportAffirmations()