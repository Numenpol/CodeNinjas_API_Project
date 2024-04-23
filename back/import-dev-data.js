const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Project = require("./models/projectModel");
const projectTaskListModel = require("./models/projectTaskListModel");

const dbURI = process.env.DATABASE_URL;

async function main() {
  await mongoose.connect(dbURI);
  console.log("Database connected");
}

main().catch((err) => console.log(err));

const tasks =
  fs.readFileSync("./dev-data/tasks.json", "utf-8");

const importData = async () => {
  try {
    await projectTaskListModel.create(JSON.parse(tasks));
    console.log("Data successfully loaded");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Project.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
