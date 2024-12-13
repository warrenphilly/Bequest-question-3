import express from "express";
import cors from "cors";
import crypto from "crypto";

const PORT = 8080;
const app = express();
const database = [{ data: "Hello World", hash: "" }];

app.use(cors());
app.use(express.json());

const generateHash = (data: string) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

database[0].hash = generateHash(database[0].data);


const logDatabaseState = () => {
  console.log("Current Database State:");
  database.forEach((entry, index) => {
    console.log(`Entry ${index}: Data = ${entry.data}, Hash = ${entry.hash}`);
  });
};



app.get("/", (req, res) => {
  logDatabaseState(); 
  const currentEntry = database[database.length - 1];
  const initialEntry = database[0];
  const currentHash = generateHash(currentEntry.data);

  if (currentHash !== initialEntry.hash) {
    return res.status(400).json({ error: "Data has been edited" });
  }
  res.json({ data: currentEntry.data });
});

app.post("/", (req, res) => {
  const { data } = req.body;
  const newEntry = { data, hash: generateHash(data) };
  database.push(newEntry);
  logDatabaseState(); 
  res.sendStatus(200);
});

app.post("/rollback", (req, res) => {
  if (database.length > 1) {
    database.splice(1);
    logDatabaseState();
    res.json({ data: database[0].data });
  } else {
    res.status(400).json({ error: "No changes to rollback" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
