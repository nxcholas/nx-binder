import dotenv from "dotenv";
import { connectDB } from "../config/db.mjs";
import Set from "../models/setModel.mjs";
import getSets from "../data/setData.mjs";


dotenv.config();
await connectDB();
const setData = getSets();

const importData = async () => {
  try {
    await Set.deleteMany();
    console.log("clearing data")

    console.log('inserting data');
    const created = await Set.insertMany(setData);
    console.log(`Seeded ${created.length} sets.`)

    process.exit(1);
  } catch (error) {
    console.log(error);
  }
}

importData();