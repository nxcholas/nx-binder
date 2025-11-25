import dotenv from "dotenv";
import { connectDB } from "../config/db.mjs";
import Set from "../models/setModel.mjs";
import setData from '../data/setData.mjs';


dotenv.config();
await connectDB();

const raw = setData; // whatever this returns

const importData = async () => {
  try {
    // clear current sets to update to latest
    await Set.deleteMany();
    console.log("Clearing data...");

    // check if data is found
    if (!raw) {
      throw new Error ("no set data found");
    }

    // convert raw data to array
    // {{},{},{}...} -> [{},{},{}]
    const setData = Object.values(raw)

    // insert data
    const created = await Set.insertMany(setData);
    console.log(`Inserted ${created.length} sets.`)

    console.log("successfully seeded")
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
